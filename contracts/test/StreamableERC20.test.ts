import {expect} from './chai-setup'
import {ethers, deployments, getUnnamedAccounts, artifacts} from 'hardhat'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import {accounts} from "../utils/network";
import {JsonRpcProvider} from "@ethersproject/providers";
import {start} from "repl";



describe('strETH', function () {

	before(async function () {
		// const strETH = await ethers.getContractFactory('strETH')
		// this.contract = await strETH.deploy()
		this.accounts = await ethers.getSigners()
	})

	beforeEach(async function () {
		const strETH = await ethers.getContractFactory('strETH')
		this.contract = await strETH.deploy()
		this.provider = this.contract.provider;
		await this.contract.deployed();
		// await deployments.fixture('strETH');
		// this.contract = await ethers.getContract('strETH')

	})

	const amount = (n: string) => {
		return ethers.utils.parseEther(n) //TODO: take decimals into account
	}

	const mineBlocks = async (n: number, provider: JsonRpcProvider)  => {
		for (let i = 0; i < n; i++) {
			await provider.send('evm_mine', [])
		}
	}

	const getStartingBlock = async (provider: any) => {
		return await provider.getBlockNumber() + 1;
	}

	const expectBalance = async (expectedBalance: BigNumber, address: string, contract: Contract) => {
		const balance = await contract.balanceOf(address);
		expect(expectedBalance).to.equal(balance);
	}

	const expectLastUpdatedBalance = async (expectedBalance: BigNumber, address: string, contract: Contract) => {
		const balance = await contract.lastUpdatedBalanceOf(address);
		expect(expectedBalance).to.equal(balance);
	}


	const expectSubscription = async (from: string, to: string, rate: BigNumber, maxAmount: BigNumber, startBlock: BigNumber, endBlock: BigNumber, amountPaid: BigNumber, status: any, contract: Contract) => {
		const [_rate, _maxAmount, _startBlock, _endBlock, _amountPaid, _status] = await contract.getSubscription(from, to);
		console.log("Subscription params", _rate, _maxAmount, _startBlock, _endBlock, _amountPaid, _status);
		expect(_rate).to.eq(rate)
		expect(_maxAmount).to.eq(maxAmount);
		expect(_startBlock).to.eq(startBlock);
		expect(_endBlock).to.eq(endBlock);
		expect(_amountPaid).to.eq(amountPaid);
		expect(_status).to.eq(status);
	}

	it('should be deployed correctly', async function () {
		expect(this.contract.address).to.be.a('string')
	})

	it('should have 0 balance by default', async function () {
		const balance = await this.contract.balanceOf(this.accounts[0].address)
		expect(balance).to.eq(0)
	})


	describe('depositing', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.depositAmount = amount('1');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})
		it("should mint new tokens", async function () {
			const expectedAmount = amount("2");
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
			expect(await parent.contract.balanceOf(this.from)).to.eq(expectedAmount);
		});

		it("should emit Transfer event", async function () {

			await expect(parent.contract.deposit({value: this.depositAmount, from: this.from}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs("0x0000000000000000000000000000000000000000", this.from, this.depositAmount);
		});

	})

	//
	describe('withdrawing with enough balance', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.depositAmount = amount('1');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})


		it("should burn Tokens", async function () {
			expect(await parent.contract.balanceOf(this.from)).to.equal(this.depositAmount);
			await parent.contract.withdraw(this.depositAmount, {from: this.from});
			expect(await parent.contract.balanceOf(this.from)).to.equal(0);
		});


		it('should emit Transfer event', async function () {

			expect(await parent.contract.balanceOf(this.from)).to.equal(this.depositAmount);

			await expect(parent.contract.withdraw(this.depositAmount, {from: this.from}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs(this.from, "0x0000000000000000000000000000000000000000", this.depositAmount);
		});


	})

	describe('withdrawing without enough balance', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.depositAmount = amount('1');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})


		it("should be reverted when the balance is too low", async function () {

			expect(await parent.contract.balanceOf(this.from)).to.equal(this.depositAmount);
			await expect(parent.contract.withdraw(amount('2'), {from: this.from})).to.be.revertedWith('Requested amount larger than available balance.');

		});


	})

	//
	describe('subscribing without enough balance', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.toFirst = parent.accounts[1].address;
			this.toSecond = parent.accounts[2].address;
			this.depositAmount = amount('10');
		})


		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})

		it('should be reverted when user has less balance than maxAmount without active subscriptions', async function () {
			const rate = amount('1');
			const maxAmount = amount('11');

			await expect(parent.contract.updateSubscription(this.from, this.toFirst, rate, maxAmount, {from: this.from})).to.be.revertedWith("Insufficient balance.");
		});

		it('should be reverted when user has less balance than maxAmount with active subscriptions', async function () {
			const rate = amount('1');
			const maxAmountSub1 = amount('5');
			const maxAmountSub2 = amount('6');

			await parent.contract.updateSubscription(this.from, this.toFirst, rate, maxAmountSub1, {from: this.from});
			await expect(parent.contract.updateSubscription(this.from, this.toSecond, rate, maxAmountSub2, {from: this.from})).to.be.revertedWith("Insufficient balance.");

		});

	})

	describe('subscribing with incorrect parameters', function (this: any) {
		const parent = this.parent.ctx;


		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})
		it('should be reverted when the rate is 0', async function () {
			const rate = amount('0');
			const maxAmount = amount('10');

			await expect(parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from})).to.be.revertedWith("The subscription rate must be greater than 0.");
		});
		it('should be reverted when maxAmount is 0', async function () {
			const rate = amount('1');
			const maxAmount = amount('0');

			await expect(parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from})).to.be.revertedWith("The max amount must be greater than 0.");
		});
		it('should be reverted when maxAmount is smaller than rate', async function () {
			const rate = amount('2');
			const maxAmount = amount('1');

			await expect(parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from})).to.be.revertedWith("The max amount must be greater than or equal to the rate.");
		});
	})

	describe('subscribing when the subscriber is not the address owner', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;
			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.toContract = await parent.contract.connect(parent.accounts[1]);
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})

		it('should be reverted when creating a subscription', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');

			await expect(this.toContract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.to})).to.be.revertedWith("Only the address owner can start a subscription.");
		});
		it('should be reverted when canceling created subscription', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});

			await expect(this.toContract.cancelSubscription(this.from, this.to, {from: this.to})).to.be.revertedWith("Only the subscriber can cancel the subscription.");
		});

	})

	describe('subscribing to a single subscription', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;
			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})

		async function subscribe(this: any) {
			// subscribe from [0] to [1] with 1 ETH / block, maximum of 10 ETH
			// await deployments.fixture('strETH');
			await parent.contract.updateSubscription(parent.accounts[0].address, parent.accounts[1].address, amount('1'), amount('10'), {from: parent.accounts[0].address})
		}


		it('should emit SubscriptionStarted event when creating new subscription', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await parent.contract.provider.getBlockNumber() + 1;
			const endBlock = startBlock + 10;
			await expect(parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from})).to.emit(parent.contract, "SubscriptionStarted").withArgs(this.from, this.to, rate, maxAmount, startBlock, endBlock, startBlock, 0);
		});

		it('should change user balances by subscription rate successfully after 1 block', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});

			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);

			await mineBlocks(1, parent.provider);

			await expectLastUpdatedBalance(maxAmount.sub(rate), this.from, parent.contract);
			await expectLastUpdatedBalance(rate, this.to, parent.contract);


		});
	//
		it('should change user balances by subscription rate successfully after 5 block', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const fiveEth = amount('5');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});

			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);

			await mineBlocks(5, parent.provider);

			await expectLastUpdatedBalance(maxAmount.sub(fiveEth), this.from, parent.contract);
			await expectLastUpdatedBalance(fiveEth, this.to, parent.contract);


		});

		it('should return the correct balances after the subscription ends regularly (without state changing interaction) after one block', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);

			// Mine more blocks than the subscription lasts
			await mineBlocks(11, parent.provider);

			await expectLastUpdatedBalance(amount('0'), this.from, parent.contract);
			await expectLastUpdatedBalance(maxAmount, this.to, parent.contract);

		});

		it('should return the correct balances after the subscription ends regularly (without state changing interaction) after five blocks', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);

			// Mine more blocks than the subscription lasts
			await mineBlocks(15, parent.provider);

			await expectLastUpdatedBalance(amount('0'), this.from, parent.contract);
			await expectLastUpdatedBalance(maxAmount, this.to, parent.contract);

		});


		it('should emit SubscriptionCanceled event when canceling active subscription', async function () {
			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);
			const endBlock = startBlock + 10;
			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, endBlock, amount('0'), 1, parent.contract);

			await expect(parent.contract.cancelSubscription(this.from, this.to, {from: this.from})).to.emit(parent.contract, "SubscriptionCanceled").withArgs(this.from, this.to, rate, maxAmount, startBlock, endBlock, startBlock + 1, rate );
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, endBlock, amount('1'), 3, parent.contract);

		});

		it('should be reverted when canceling non-active subscription', async function () {
			await expect(parent.contract.cancelSubscription(this.from, this.to, {from: this.from})).to.be.revertedWith("Only active subscriptions can be canceled.");
		});

		it('should return the correct balances after the subscription is canceled', async function () {

			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);
			await parent.contract.cancelSubscription(this.from, this.to, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('1'), 3, parent.contract);

			await expectLastUpdatedBalance(maxAmount.sub(rate), this.from, parent.contract);
			await expectLastUpdatedBalance(rate, this.to, parent.contract);
		});

		it('should return the correct balances 20 blocks after the subscription is canceled', async function () {

			const rate = amount('1');
			const maxAmount = amount('10');
			const startBlock = await getStartingBlock(parent.contract.provider);

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('0'), 1, parent.contract);

			await parent.contract.cancelSubscription(this.from, this.to, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 10, amount('1'), 3, parent.contract);

			await mineBlocks(20, parent.provider);

			await expectLastUpdatedBalance(maxAmount.sub(rate), this.from, parent.contract);
			await expectLastUpdatedBalance(rate, this.to, parent.contract);

		});

	})


	describe('updating a subscription', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;
			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})

		async function subscribe(this: any) {
			// subscribe from [0] to [1] with 1 ETH / block, maximum of 10 ETH
			// await deployments.fixture('strETH');
			await parent.contract.updateSubscription(parent.accounts[0].address, parent.accounts[1].address, amount('1'), amount('10'), {from: parent.accounts[0].address})
		}

		//

		it('should emit SubscriptionUpdated event when the subscription is valid', async function () {
			const rate = amount('1');
			const maxAmount = amount('5');
			const startBlock = await parent.provider.getBlockNumber() + 1;
			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 5, amount('0'), 1, parent.contract);

			await mineBlocks(2, parent.provider);

			const newMaxAmount = amount('5');
			const nextBlock = await parent.provider.getBlockNumber() + 1;
			const endBlock = nextBlock + 5;
			await expect(parent.contract.updateSubscription(this.from, this.to, rate, newMaxAmount, {from: this.from})).to.emit(parent.contract, "SubscriptionUpdated").withArgs(this.from, this.to, rate, newMaxAmount, startBlock, endBlock, nextBlock, amount('3'));

		});
		//
		it('should be successful when the maxAmount is increased and the subscriber has enough balance', async function () {
			const rate = amount('1');
			const maxAmount = amount('5');
			const startBlock = await parent.provider.getBlockNumber() + 1;
			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 5, amount('0'), 1, parent.contract);

			await mineBlocks(2, parent.provider);

			const newMaxAmount = amount('5');
			const nextBlock = await parent.provider.getBlockNumber() + 1;
			const endBlock = nextBlock + 5;

			await parent.contract.updateSubscription(this.from, this.to, rate, newMaxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, newMaxAmount, startBlock, endBlock, amount('3'), 1, parent.contract);

		});
		//
		it('should be successful when the rate is increased and the subscriber has enough balance', async function () {
			const rate = amount('1');
			const maxAmount = amount('5');
			const startBlock = await parent.provider.getBlockNumber() + 1;
			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, rate, maxAmount, startBlock, startBlock + 5, amount('0'), 1, parent.contract);

			await mineBlocks(2, parent.provider);

			const newRate = amount('2');
			const endBlock = await parent.provider.getBlockNumber() + 1;

			await parent.contract.updateSubscription(this.from, this.to, newRate, maxAmount, {from: this.from});
			await expectSubscription(this.from, this.to, newRate, maxAmount, startBlock, endBlock, amount('3'), 1, parent.contract);


		});
		// //
		// it('should be successful when the maxAmount and the rate are increased and the subscriber has enough balance', async function () {
		// 	const rate = amount('1');
		// 	const maxAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
		//
		// 	await mineBlocks(1, parent.provider);
		//
		// 	await expectLastUpdatedBalance(maxAmount.sub(rate), this.from, parent.contract);
		// 	await expectLastUpdatedBalance(rate, this.to, parent.contract);
		//
		//
		// });
		//
		// it('should be successful when the maxAmount is decreased and the subscription is active', async function () {
		// 	const rate = amount('1');
		// 	const maxAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
		//
		// 	// Mine more blocks than the subscription lasts
		// 	await mineBlocks(11, parent.provider);
		//
		// 	await expectLastUpdatedBalance(amount('0'), this.from, parent.contract);
		// 	await expectLastUpdatedBalance(maxAmount, this.to, parent.contract);
		//
		// });
		//
		// it('should be successful when the rate is decreased and the subscription is active', async function () {
		// 	const rate = amount('1');
		// 	const maxAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
		//
		// 	// Mine more blocks than the subscription lasts
		// 	await mineBlocks(11, parent.provider);
		//
		// 	await expectLastUpdatedBalance(amount('0'), this.from, parent.contract);
		// 	await expectLastUpdatedBalance(maxAmount, this.to, parent.contract);
		//
		// });
		//
		//
		// it('should be successful when the maxAmount and the rate are decreased and the subscription is active', async function () {
		// 	const rate = amount('1');
		// 	const maxAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});
		//
		// 	// Mine more blocks than the subscription lasts
		// 	await mineBlocks(11, parent.provider);
		//
		// 	await expectLastUpdatedBalance(amount('0'), this.from, parent.contract);
		// 	await expectLastUpdatedBalance(maxAmount, this.to, parent.contract);
		//
		// });


	})



	describe("withdrawing as a subscriber", function (this: any) {

		const parent = this.parent.ctx;

		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;
			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
		})


		it('should emit Transfer event when it is successful', async function () {

			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await expect(parent.contract.withdraw(ethAmount, {from: this.from}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs(this.from, "0x0000000000000000000000000000000000000000", ethAmount);

			// connect to the contract as other signer, in order to be able to change the transaction `from` part

		});

		it('should be successful when withdrawing less than the available amount', async function () {
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await parent.contract.withdraw(rate, {from: this.from});

			const expectedBalance = amount('4');
			await expectBalance(expectedBalance, this.from, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.from, parent.contract);

		});

		it('should be successful when withdrawing equal to the available amount', async function () {
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await parent.contract.withdraw(ethAmount, {from: this.from});

			const expectedBalance = amount('0');
			await expectBalance(expectedBalance, this.from, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.from, parent.contract);


		});

		it('should be reverted when trying to withdraw more than the available amount', async function () {
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await expect(parent.contract.withdraw(amount('10'), {from: this.from})).to.be.revertedWith("Requested amount larger than available balance.");

		});

		it('should be successful when withdrawing within the available amount after canceled subscription', async function () {
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(5, parent.provider);

			await parent.contract.cancelSubscription(this.from, this.to, {from: this.from});

			// The amount should be 4 because of the 5 mined blocks + 1 block for the cancelSubscription tx
			await parent.contract.withdraw(amount('4'), {from: this.from});

			const expectedBalance = amount('0');
			await expectBalance(expectedBalance, this.from, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.from, parent.contract);
		});

		it('should be successful when withdrawing within the available amount when active subscription exists', async function () {
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});
			await mineBlocks(3, parent.provider);
			await parent.contract.withdraw(amount('5'), {from: this.from});

			const expectedBalance = amount('1');
			await expectBalance(expectedBalance, this.from, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.from, parent.contract);

		});

		it('should be reverted when trying to withdraw more than the available amount when active subscription exists', async function () {
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(3, parent.provider);

			await expect(parent.contract.withdraw(amount('10'), {from: this.from})).to.be.revertedWith("Requested amount larger than available balance.");

		});

		it('should be reverted when trying to withdraw less than the total balance but more than the reserved amount when active subscription exists', async function () {

			const rate = amount('1');
			const ethAmount = amount('10');
			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});
			await expect(parent.contract.withdraw(amount('5'), {from: this.from})).to.be.revertedWith("Requested amount larger than available balance.");
		});




	});

	describe('withdrawing as a receiver', function (this: any) {
		const parent = this.parent.ctx;
		before(async function () {
			this.from = parent.accounts[0].address;
			this.to = parent.accounts[1].address;

			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {
			await parent.contract.deposit({value: this.depositAmount, from: this.from});
			this.toContract = await parent.contract.connect(parent.accounts[1]);

		})

		it('should be successful when withdrawing less than the available amount', async function () {
			const rate = amount('1');
			const maxAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await this.toContract.withdraw(rate, {from: this.to});

			const expectedBalance = amount('4');
			await expectBalance(expectedBalance, this.to, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.to, parent.contract);

		});
		it('should be successful when withdrawing equal to the available amount', async function () {

			const rate = amount('1');
			const maxAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, maxAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await this.toContract.withdraw(maxAmount, {from: this.to});

			const expectedBalance = amount('0');
			await expectBalance(expectedBalance, this.to, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.to, parent.contract);

		});
		it('should be reverted when trying to withdraw more than the available amount', async function () {
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(10, parent.provider);

			await expect(this.toContract.withdraw(amount('10'), {from: this.to})).to.be.revertedWith("Requested amount larger than available balance.");

		});
		it('should be successful when trying to withdraw within the available amount after canceled subscription', async function () {
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(5, parent.provider);

			await parent.contract.cancelSubscription(this.from, this.to, {from: this.from});


			const withdrawAmount = amount('5');
			await this.toContract.withdraw(withdrawAmount, {from: this.to});

			const expectedBalance = amount('1');
			await expectBalance(expectedBalance, this.to, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.to, parent.contract);


		});
		it('should be successful when trying to withdraw within the available amount when active subscription exists', async function () {

			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(3, parent.provider);

			const withdrawAmount = amount('3');
			await this.toContract.withdraw(withdrawAmount, {from: this.to});

			const expectedBalance = amount('1');
			await expectBalance(expectedBalance, this.to, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.to, parent.contract);

		});
		it('should be reverted when trying to withdraw more than the available amount when active subscription exists', async function () {
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(this.from, this.to, rate, ethAmount, {from: this.from});

			await mineBlocks(3, parent.provider);

			await expect(this.toContract.withdraw(amount('10'), {from: this.to})).to.be.revertedWith("Requested amount larger than available balance.");

		});


	})

	describe('subscribing to multiple subscriptions', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.fromFirst = parent.accounts[0].address;
			this.fromSecond = parent.accounts[5].address;
			this.fromSecondSigner = parent.accounts[5];


			this.toFirst = parent.accounts[1].address;
			this.toSecond = parent.accounts[2].address;

			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {

			await parent.contract.deposit({value: this.depositAmount, from: this.fromFirst});

			// change signer to be able to deposit to other address
            this.contractSecondSigner = parent.contract.connect(this.fromSecondSigner);
			await this.contractSecondSigner.deposit({value: this.depositAmount, from: this.fromSecond});

		})

		it('should be allowed if the total amount is less than the available balance', async function () {
			const rate = amount('1');
			const maxAmountFirstSub = amount('3');
			const maxAmountSecondSub = amount('6');

			await parent.contract.updateSubscription(this.fromFirst, this.toFirst, rate, maxAmountFirstSub, {from: this.fromFirst});
			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountSecondSub, {from: this.fromFirst});

			await mineBlocks(10, parent.provider);

			await expectBalance(amount('9'), this.fromFirst, parent.contract);
			await expectLastUpdatedBalance(amount('1'), this.fromFirst, parent.contract);

			await expectBalance(amount('1'), this.toFirst, parent.contract);
			await expectLastUpdatedBalance(maxAmountFirstSub, this.toFirst, parent.contract);

			await expectBalance(amount('0'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(maxAmountSecondSub, this.toSecond, parent.contract);


		});
		it('should not be allowed if the available balances are insufficient', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('6');

			await parent.contract.updateSubscription(this.fromFirst, this.toFirst, rate, maxAmountFirstSub, {from: this.fromFirst});
			await expect(parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountSecondSub, {from: this.fromFirst})).to.be.revertedWith('Insufficient balance.');

			await mineBlocks(10, parent.provider);


			await expectBalance(amount('10'), this.fromFirst, parent.contract);
			await expectLastUpdatedBalance(amount('5'), this.fromFirst, parent.contract);

			await expectBalance(amount('0'), this.toFirst, parent.contract);
			await expectLastUpdatedBalance(maxAmountFirstSub, this.toFirst, parent.contract);

			await expectBalance(amount('0'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('0'), this.toSecond, parent.contract);

		});
		it('should result in balances updated successfully when a subscription is canceled', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('5');

			await parent.contract.updateSubscription(this.fromFirst, this.toFirst, rate, maxAmountFirstSub, {from: this.fromFirst});
			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountSecondSub, {from: this.fromFirst});


			await mineBlocks(3, parent.provider);
			await parent.contract.cancelSubscription(this.fromFirst, this.toSecond);

			await mineBlocks(5, parent.provider);

			const expectedBalance = amount('1');
			await expectBalance(expectedBalance, this.fromFirst, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.fromFirst, parent.contract);


			await expectBalance(maxAmountFirstSub, this.toFirst, parent.contract);
			await expectLastUpdatedBalance(maxAmountFirstSub, this.toFirst, parent.contract);


			const expectedBalanceSecond = amount('4');
			await expectBalance(expectedBalanceSecond, this.toSecond, parent.contract);
			await expectLastUpdatedBalance(expectedBalanceSecond, this.toSecond, parent.contract);

		});
		it('should result in balances updated successfully when certain amount is withdrawn', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('2');
			const maxAmountSecondSub = amount('5');

			await parent.contract.updateSubscription(this.fromFirst, this.toFirst, rate, maxAmountFirstSub, {from: this.fromFirst});
			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountSecondSub, {from: this.fromFirst});

			await mineBlocks(5, parent.provider);

			await parent.contract.withdraw(amount('3'), {from: this.fromFirst});

			const expectedBalance = amount('0');
			await expectBalance(expectedBalance, this.fromFirst, parent.contract);
			await expectLastUpdatedBalance(expectedBalance, this.fromFirst, parent.contract);

			await expectBalance(maxAmountFirstSub, this.toFirst, parent.contract);
			await expectLastUpdatedBalance(maxAmountFirstSub, this.toFirst, parent.contract);

			await expectBalance(maxAmountSecondSub, this.toSecond, parent.contract);
			await expectLastUpdatedBalance(maxAmountSecondSub, this.toSecond, parent.contract);

		});

	})

	describe('withdrawing when having multiple subscriptions as a receiver', function (this: any) {
		const parent = this.parent.ctx;

		before(async function () {
			this.fromFirst = parent.accounts[0].address;
			this.fromSecond = parent.accounts[5].address;
			this.fromSecondSigner = parent.accounts[5];


			this.toFirst = parent.accounts[1].address;
			this.toSecond = parent.accounts[2].address;

			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			this.depositAmount = amount('10');
		})

		beforeEach(async function () {

			await parent.contract.deposit({value: this.depositAmount, from: this.fromFirst});

			this.contractSecondSigner = parent.contract.connect(this.fromSecondSigner);
			await this.contractSecondSigner.deposit({value: this.depositAmount, from: this.fromSecond});

		})


		it('should be successful when withdrawing within the available balances after the subscriptions are finished', async function () {


			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('5');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(10, parent.provider);

			await expectBalance(amount('1'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('10'), this.toSecond, parent.contract);

			const receiverContract = await parent.contract.connect(parent.accounts[2]);
			await receiverContract.withdraw(amount('10'), {from: this.toSecond});

			await expectBalance(amount('0'), this.toSecond, parent.contract);



		});
		it('should be successful when withdrawing within the available balances while the subscriptions are running', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('5');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(3, parent.provider);

			await expectBalance(amount('1'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('7'), this.toSecond, parent.contract);

			const receiverContract = await parent.contract.connect(parent.accounts[2]);
			await receiverContract.withdraw(amount('5'), {from: this.toSecond});

			await expectBalance(amount('4'), this.toSecond, parent.contract);

		});
		it('should be reverted when withdrawing more than the available balances after the subscriptions are finished', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('5');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(10, parent.provider);

			await expectBalance(amount('1'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('10'), this.toSecond, parent.contract);

			const receiverContract = await parent.contract.connect(parent.accounts[2]);
			await expect(receiverContract.withdraw(amount('11'), {from: this.toSecond})).to.be.revertedWith("Requested amount larger than available balance.");

		});
		it('should be reverted when withdrawing more than the available balances while the subscriptions are running', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('5');
			const maxAmountSecondSub = amount('4');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(3, parent.provider);

			await expectBalance(amount('1'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('7'), this.toSecond, parent.contract);

			const receiverContract = await parent.contract.connect(parent.accounts[2]);

			await expect(receiverContract.withdraw(amount('10'), {from:  this.toSecond})).to.be.revertedWith("Requested amount larger than available balance.");
		});
		it('should be successful when withdrawing within the available balances when a subscription is canceled', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('10');
			const maxAmountSecondSub = amount('10');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(3, parent.provider);
			await this.contractSecondSigner.cancelSubscription(this.fromSecond, this.toSecond, {from: this.fromSecond});


			await expectBalance(amount('9'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('9'), this.toSecond, parent.contract);


			const receiverContract = await parent.contract.connect(parent.accounts[2]);
			await receiverContract.withdraw(amount('5'), {from: this.toSecond});

			await expectBalance(amount('5'), this.toSecond, parent.contract);

		});

		it('should be reverted when withdrawing more than the available balances when a subscription is canceled', async function () {

			const rate = amount('1');
			const maxAmountFirstSub = amount('10');
			const maxAmountSecondSub = amount('10');

			await parent.contract.updateSubscription(this.fromFirst, this.toSecond, rate, maxAmountFirstSub, {from: this.fromFirst});
			await this.contractSecondSigner.updateSubscription(this.fromSecond, this.toSecond, rate, maxAmountSecondSub, {from: this.fromSecond});

			await mineBlocks(3, parent.provider);
			await this.contractSecondSigner.cancelSubscription(this.fromSecond, this.toSecond, {from: this.fromSecond});

			await expectBalance(amount('9'), this.toSecond, parent.contract);
			await expectLastUpdatedBalance(amount('9'), this.toSecond, parent.contract);


			const receiverContract = await parent.contract.connect(parent.accounts[2]);
			await expect(receiverContract.withdraw(amount('12'), {from: this.toSecond})).to.be.revertedWith('Requested amount larger than available balance.');
		});


	})

})
