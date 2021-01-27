import {expect} from './chai-setup'
import {ethers, deployments, getUnnamedAccounts, artifacts} from 'hardhat'
import { BigNumber } from '@ethersproject/bignumber'
import {accounts} from "../utils/network";
import {JsonRpcProvider} from "@ethersproject/providers";


const mineBlocks = async (n: number) => {
	console.log("MINING BLOCKS...", n);
	return await Promise.all(
		Array(n).map(i =>
			ethers.provider.send('evm_mine', [])
		)
	).catch(e => {
		console.log("ERROR WHILE MINING BLOCKS!", e);
	})
}

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

	function amount(n: string) {
		return ethers.utils.parseEther(n) //TODO: take decimals into account
	}

	const mine_blocks = async (n: number, provider: JsonRpcProvider)  => {
		for (let i = 0; i < n; i++) {
			await provider.send('evm_mine', [])
		}
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
		beforeEach(async function () {
			const oneEth = amount("1")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})
		it("should mint new tokens", async function () {
			const fromAcc = parent.accounts[0].address;
			const depositAmount = amount("1");
			const expectedAmount = amount("2");
			await parent.contract.deposit({value: depositAmount, from: fromAcc});
			expect(await parent.contract.balanceOf(fromAcc)).to.eq(expectedAmount);
		});

		it("should emit Transfer event", async function () {
			const depositAmount = amount("1");
			const fromAcc = parent.accounts[0].address;

			await expect(parent.contract.deposit({value: depositAmount, from: fromAcc}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs("0x0000000000000000000000000000000000000000", fromAcc, depositAmount);
		});

	})

	describe('withdrawing', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("1")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})


		it("should burn Tokens", async function () {
			const depositedAmount = amount("1");
			const fromAcc = parent.accounts[0].address;

			expect(await parent.contract.balanceOf(fromAcc)).to.equal(depositedAmount);

			await parent.contract.withdraw(depositedAmount, {from: fromAcc});

			expect(await parent.contract.balanceOf(fromAcc)).to.equal(0);
		});


		it('should emit Transfer event', async function () {
			const fromAcc = parent.accounts[0].address;
			const depositedAmount = amount("1");
			expect(await parent.contract.balanceOf(fromAcc)).to.equal(depositedAmount);

			await expect(parent.contract.withdraw(depositedAmount, {from: fromAcc}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs(fromAcc, "0x0000000000000000000000000000000000000000", depositedAmount);
		});


	})

	describe('subscribing with balance when the subscriber is the address owner (single subscription)', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})

		async function subscribe(this: any) {
			// subscribe from [0] to [1] with 1 ETH / block, maximum of 10 ETH
			// await deployments.fixture('strETH');
			await parent.contract.updateSubscription(parent.accounts[0].address, parent.accounts[1].address, amount('1'), amount('10'), {from: parent.accounts[0].address})
		}
		//
		// async function expectSubscription(this: any, from: string, to: string, rate: BigNumber, maxAmount: BigNumber) {
		// 	const [_rate, _maxAmount] = this.contract.getSubscription(from, this.accounts[1].address)
		// 	expect(_rate).to.eq(rate)
		// 	expect(_maxAmount).to.eq(amount('10'))
		// }
		// //

		it('should emit SubscriptionStarted event when creating new subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');
			await expect(parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from})).to.emit(parent.contract, "SubscriptionStarted").withArgs(from, to, rate, maxAmount);
		});

		it('should change user balances by subscription rate successfully after 1 block', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			await mine_blocks(1, parent.provider);

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(maxAmount.sub(rate));
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(rate);

		});

		it('should change user balances by subscription rate successfully after 5 block', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');
			const fiveEth = amount('5');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			await mine_blocks(5, parent.provider);

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(maxAmount.sub(fiveEth));
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(fiveEth);

		});

		it('should return the correct balances after the subscription ends regularly (without state changing interaction) after one block', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			// Mine more blocks than the subscription lasts
			await mine_blocks(11, parent.provider);

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(0);
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(maxAmount);

		});

		it('should return the correct balances after the subscription ends regularly (without state changing interaction) after five blocks', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			// Mine more blocks than the subscription lasts
			await mine_blocks(15, parent.provider);


			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(0);
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(maxAmount);

		});


		it('should emit SubscriptionCanceled event when canceling active subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			await expect(parent.contract.cancelSubscription(from, to, {from: from})).to.emit(parent.contract, "SubscriptionCanceled").withArgs(from, to);
		});

		it('should be reverted when canceling non-active subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;

			await expect(parent.contract.cancelSubscription(from, to, {from: from})).to.be.revertedWith("Only active subscriptions can be canceled.");
		});


		//
		//
		it('should return the correct balances after the subscription is canceled', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});
			await parent.contract.cancelSubscription(from, to, {from: from});

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(maxAmount.sub(rate));
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(rate);
		});
		//

		it('should return the correct balances 20 blocks after the subscription is canceled', async function () {

			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});
			await parent.contract.cancelSubscription(from, to, {from: from});

			await mine_blocks(20, parent.provider);

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(maxAmount.sub(rate));
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(rate);

		});



	})

	describe('subscribing without enough balance', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})
		it('should be reverted when user has less balance than maxAmount without active subscriptions', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('11');

			await expect(parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from})).to.be.revertedWith("Insufficient balance.");
		});


		it('should be reverted when user has less balance than maxAmount with active subscriptions', async function () {

			const from = parent.accounts[0].address;
			const to_first_sub = parent.accounts[1].address;
			const to_second_sub = parent.accounts[2].address;
			const rate = amount('1');
			const maxAmountSub1 = amount('5');
			const maxAmountSub2 = amount('6');

			await parent.contract.updateSubscription(from, to_first_sub, rate, maxAmountSub1, {from: from});
			await expect(parent.contract.updateSubscription(from, to_second_sub, rate, maxAmountSub2, {from: from})).to.be.revertedWith("Insufficient balance.");

		});

	})

	describe('subscribing with balance and incorrect parameters', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})

		it('should be reverted when the rate is 0', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('0');
			const maxAmount = amount('10');

			await expect(parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from})).to.be.revertedWith("The subscription rate must be greater than 0.");
		});


		it('should be reverted when maxAmount is 0', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('0');

			await expect(parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from})).to.be.revertedWith("The max amount must be greater than 0.");
		});


		it('should be reverted when maxAmount is smaller than rate', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('2');
			const maxAmount = amount('1');

			await expect(parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from})).to.be.revertedWith("The max amount must be greater than or equal to the rate.");
		});
	})


	describe('subscribing with balance when the subscriber is not the address owner', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})

		it('should be reverted when creating a subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			const contract = parent.contract.connect(parent.accounts[1])
			await expect(contract.updateSubscription(from, to, rate, maxAmount, {from: to})).to.be.revertedWith("Only the address owner can start a subscription.");
		});


		it('should be reverted when canceling created subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			// connect to the contract as other signer, in order to be able to change the transaction `from` part
			const contract = parent.contract.connect(parent.accounts[1])
			await expect(contract.cancelSubscription(from, to, {from: to})).to.be.revertedWith("Only the subscriber can cancel the subscription.");
		});

	})


	describe("subscriber withdrawal", function (this: any) {

		const parent = this.parent.ctx;

		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})


		it('should emit Transfer event when it is successful', async function () {

			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(10, parent.provider);

			await expect(parent.contract.withdraw(ethAmount, {from: from}))
				.to.emit(parent.contract, 'Transfer')
				.withArgs(from, "0x0000000000000000000000000000000000000000", ethAmount);

			// connect to the contract as other signer, in order to be able to change the transaction `from` part

		});

		it('should be successful when withdrawing less than the available amount', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(10, parent.provider);

			await parent.contract.withdraw(rate, {from: from});

			const expectedAmount = amount('4');

			const balance = await this.contract.balanceOf(from);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(from);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be successful when withdrawing equal to the available amount', async function () {

			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(10, parent.provider);

			await parent.contract.withdraw(ethAmount, {from: from});

			const expectedAmount = amount('0');
			const balance = await this.contract.balanceOf(from);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(from);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be reverted when trying to withdraw more than the available amount', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(10, parent.provider);

			await expect(parent.contract.withdraw(amount('10'), {from: from})).to.be.revertedWith("Requested amount larger than available balance.");

		});

		it('should be successful when trying to withdraw within the available amount after canceled subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(5, parent.provider);

			await parent.contract.cancelSubscription(from, to, {from: from});

			// The amount should be 4 because of the 5 mined blocks + 1 block for the cancelSubscription tx
			await parent.contract.withdraw(amount('4'), {from: from});

			const expectedAmount = amount('0');
			const balance = await this.contract.balanceOf(from);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(from);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be successful when trying to withdraw within the available amount when active subscription exists', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(3, parent.provider);

			await parent.contract.withdraw(amount('5'), {from: from});

			const expectedAmount = amount('1');

			const balance = await this.contract.balanceOf(from);

			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(from);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be reverted when trying to withdraw more than the available amount when active subscription exists', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(3, parent.provider);

			await expect(parent.contract.withdraw(amount('10'), {from: from})).to.be.revertedWith("Requested amount larger than available balance.");

		});

		it('should be reverted when trying to withdraw less than the total balance but more than the reserved amount when active subscription exists', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('10');
			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});
			await expect(parent.contract.withdraw(amount('5'), {from: from})).to.be.revertedWith("Requested amount larger than available balance.");
		});




	});


	describe('receiver withdrawal', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})


		it('should be successful when withdrawing less than the available amount', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			await mine_blocks(10, parent.provider);

			const contract = await parent.contract.connect(parent.accounts[1]);

			await contract.withdraw(rate, {from: to});

			const expectedAmount = amount('4');
			const balance = await this.contract.balanceOf(to);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be successful when withdrawing equal to the available amount', async function () {

			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			await mine_blocks(10, parent.provider);

			const contract = await parent.contract.connect(parent.accounts[1]);

			await contract.withdraw(maxAmount, {from: to});

			const expectedAmount = amount('0');
			const balance = await this.contract.balanceOf(to);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be reverted when trying to withdraw more than the available amount', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(10, parent.provider);

			const contract = await parent.contract.connect(parent.accounts[1]);

			await expect(contract.withdraw(amount('10'), {from: to})).to.be.revertedWith("Requested amount larger than available balance.");

		});

		it('should be successful when trying to withdraw within the available amount after canceled subscription', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(5, parent.provider);

			await parent.contract.cancelSubscription(from, to, {from: from});

			const contract = await parent.contract.connect(parent.accounts[1]);


			const withdrawAmount = amount('5');
			await contract.withdraw(withdrawAmount, {from: to});


			const expectedAmount = amount('1');
			const balance = await this.contract.balanceOf(to);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be successful when trying to withdraw within the available amount when active subscription exists', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('5');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(3, parent.provider);

			const contract = await parent.contract.connect(parent.accounts[1]);

			const withdrawAmount = amount('3');
			await contract.withdraw(withdrawAmount, {from: to});

			const expectedAmount = amount('1');
			const balance = await contract.balanceOf(to);
			expect(balance).to.equal(expectedAmount);

			const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
			expect(lastUpdatedBalance).to.equal(expectedAmount);

		});

		it('should be reverted when trying to withdraw more than the available amount when active subscription exists', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const ethAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});

			await mine_blocks(3, parent.provider);

			const contract = await parent.contract.connect(parent.accounts[1]);

			await expect(contract.withdraw(amount('10'), {from: to})).to.be.revertedWith("Requested amount larger than available balance.");

		});


	})


	describe('having multiple subscriptions', function (this: any) {
		const parent = this.parent.ctx;
		beforeEach(async function () {
			const oneEth = amount("10")
			const fromAcc = parent.accounts[0].address;
			await parent.contract.deposit({value: oneEth, from: fromAcc});
		})


		// it('should be allowed for the subscriber if the total amount is less than the available balance', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const toFirst = parent.accounts[1].address;
		// 	const toSecond = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const maxAmountFirstSub = amount('3');
		// 	const maxAmountSecondSub = amount('6');
		//
		// 	await parent.contract.updateSubscription(from, toFirst, rate, maxAmountFirstSub, {from: from});
		// 	await parent.contract.updateSubscription(from, toSecond, rate, maxAmountSecondSub, {from: from});
		//
		// 	await mine_blocks(10, parent.provider);
		//
		//
		// 	const expectedBalanceFrom = amount('9');
		// 	const balanceFrom = await parent.contract.balanceOf(from);
		// 	expect(balanceFrom).to.equal(expectedBalanceFrom);
		//
		// 	const expectedLastUpdatedBalanceFrom = amount('1');
		// 	const lastUpdatedBalanceFrom = await this.contract.lastUpdatedBalanceOf(from);
		// 	expect(lastUpdatedBalanceFrom).to.equal(expectedLastUpdatedBalanceFrom);
		//
		// 	const expectedBalanceToFirst = amount('1');
		// 	const balanceToFirst = await parent.contract.balanceOf(toFirst);
		// 	expect(balanceToFirst).to.equal(expectedBalanceToFirst);
		//
		//
		// 	const lastUpdatedBalanceToFirst = await this.contract.lastUpdatedBalanceOf(toFirst);
		// 	expect(lastUpdatedBalanceToFirst).to.equal(maxAmountFirstSub);
		//
		//
		// 	const expectedBalanceToSecond = amount('0');
		//
		// 	const balanceToSecond = await parent.contract.balanceOf(toSecond);
		// 	expect(balanceToSecond).to.equal(expectedBalanceToSecond);
		//
		// 	const lastUpdatedBalanceToSecond = await this.contract.lastUpdatedBalanceOf(toSecond);
		// 	expect(lastUpdatedBalanceToSecond).to.equal(maxAmountSecondSub);
		//
		//
		// });
		//
		// it('should not be allowed for the subscriber if he does not have enough balance', async function () {
		//
		// 	const from = parent.accounts[0].address;
		// 	const toFirst = parent.accounts[1].address;
		// 	const toSecond = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const maxAmountFirstSub = amount('5');
		// 	const maxAmountSecondSub = amount('6');
		//
		// 	await parent.contract.updateSubscription(from, toFirst, rate, maxAmountFirstSub, {from: from});
		// 	await expect(parent.contract.updateSubscription(from, toSecond, rate, maxAmountSecondSub, {from: from})).to.be.revertedWith('Insufficient balance.');
		//
		// 	await mine_blocks(10, parent.provider);
		//
		//
		// 	const expectedBalanceFrom = amount('9');
		// 	const balanceFrom = await parent.contract.balanceOf(from);
		// 	expect(balanceFrom).to.equal(expectedBalanceFrom);
		//
		// 	const expectedLastUpdatedBalanceFrom = amount('5');
		// 	const lastUpdatedBalanceFrom = await this.contract.lastUpdatedBalanceOf(from);
		// 	expect(lastUpdatedBalanceFrom).to.equal(expectedLastUpdatedBalanceFrom);
		//
		// 	const expectedBalanceToFirst = amount('1');
		// 	const balanceToFirst = await parent.contract.balanceOf(toFirst);
		// 	expect(balanceToFirst).to.equal(expectedBalanceToFirst);
		//
		// 	const lastUpdatedBalanceToFirst = await this.contract.lastUpdatedBalanceOf(toFirst);
		// 	expect(lastUpdatedBalanceToFirst).to.equal(maxAmountFirstSub);
		//
		// 	const balanceToSecond = await parent.contract.balanceOf(toSecond);
		// 	expect(balanceToSecond).to.equal(0);
		//
		// 	const lastUpdatedBalanceToSecond = await this.contract.lastUpdatedBalanceOf(toSecond);
		// 	expect(lastUpdatedBalanceToSecond).to.equal(0);
		//
		// });
		//
		// it('should result in balances updated successfully when the subscriber cancels a subscription', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const toFirst = parent.accounts[1].address;
		// 	const toSecond = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const maxAmountFirstSub = amount('5');
		// 	const maxAmountSecondSub = amount('5');
		//
		// 	await parent.contract.updateSubscription(from, toFirst, rate, maxAmountFirstSub, {from: from});
		// 	await parent.contract.updateSubscription(from, toSecond, rate, maxAmountSecondSub, {from: from});
		//
		//
		// 	await mine_blocks(3, parent.provider);
		// 	await parent.contract.cancelSubscription(from, toSecond);
		//
		// 	await mine_blocks(5, parent.provider);
		//
		//
		// 	const expectedAmountFrom = amount('1');
		// 	const balanceFrom = await parent.contract.balanceOf(from);
		// 	expect(balanceFrom).to.equal(expectedAmountFrom);
		//
		// 	const balanceToFirst = await parent.contract.balanceOf(toFirst);
		// 	expect(balanceToFirst).to.equal(maxAmountFirstSub);
		//
		// 	const lastUpdatedBalanceToFirst = await this.contract.lastUpdatedBalanceOf(toFirst);
		// 	expect(lastUpdatedBalanceToFirst).to.equal(maxAmountFirstSub);
		//
		//
		// 	const expectedAmount = amount('4');
		// 	const balanceToSecond = await parent.contract.balanceOf(toSecond);
		// 	expect(balanceToSecond).to.equal(expectedAmount);
		//
		// 	const lastUpdatedBalanceToSecond = await this.contract.lastUpdatedBalanceOf(toSecond);
		// 	expect(lastUpdatedBalanceToSecond).to.equal(expectedAmount);
		//
		// });
		//
		// it('should result in balances updated successfully when the subscriber withdraws certain amount', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const toFirst = parent.accounts[1].address;
		// 	const toSecond = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const maxAmountFirstSub = amount('2');
		// 	const maxAmountSecondSub = amount('5');
		//
		// 	await parent.contract.updateSubscription(from, toFirst, rate, maxAmountFirstSub, {from: from});
		// 	await parent.contract.updateSubscription(from, toSecond, rate, maxAmountSecondSub, {from: from});
		//
		// 	await mine_blocks(5, parent.provider);
		//
		// 	await parent.contract.withdraw(from, amount('3'), {from: from});
		//
		// 	const expectedAmountFrom = amount('0');
		// 	const balanceFrom = await parent.contract.balanceOf(from);
		// 	expect(balanceFrom).to.equal(expectedAmountFrom);
		//
		// 	const balanceToFirst = await parent.contract.balanceOf(toFirst);
		// 	expect(balanceToFirst).to.equal(maxAmountFirstSub);
		//
		// 	const lastUpdatedBalanceToFirst = await this.contract.lastUpdatedBalanceOf(toFirst);
		// 	expect(lastUpdatedBalanceToFirst).to.equal(maxAmountFirstSub);
		//
		//
		// 	const balanceToSecond = await parent.contract.balanceOf(toSecond);
		// 	expect(balanceToSecond).to.equal(maxAmountSecondSub);
		//
		// 	const lastUpdatedBalanceToSecond = await this.contract.lastUpdatedBalanceOf(toSecond);
		// 	expect(lastUpdatedBalanceToSecond).to.equal(maxAmountSecondSub);
		// });

		// it('should allow the receiver to withdraw available balances while the subscriptions are running successfully', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const to = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const ethAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});
		//
		// 	await mine_blocks(5, parent.provider);
		//
		// 	await parent.contract.cancelSubscription(from, to, {from: from});
		//
		// 	const contract = await parent.contract.connect(parent.accounts[1]);
		//
		//
		// 	const withdrawAmount = amount('5');
		// 	await contract.withdraw(withdrawAmount, {from: to});
		//
		//
		// 	const expectedAmount = amount('1');
		// 	const balance = await this.contract.balanceOf(to);
		// 	expect(balance).to.equal(expectedAmount);
		//
		// 	const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
		// 	expect(lastUpdatedBalance).to.equal(expectedAmount);
		//
		// });
		//
		// it('should not be allowed for the receiver to withdraw more than the available balance', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const to = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const ethAmount = amount('5');
		//
		// 	await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});
		//
		// 	await mine_blocks(3, parent.provider);
		//
		// 	const contract = await parent.contract.connect(parent.accounts[1]);
		//
		// 	const withdrawAmount = amount('3');
		// 	await contract.withdraw(withdrawAmount, {from: to});
		//
		// 	const expectedAmount = amount('1');
		// 	const balance = await contract.balanceOf(to);
		// 	expect(balance).to.equal(expectedAmount);
		//
		// 	const lastUpdatedBalance = await this.contract.lastUpdatedBalanceOf(to);
		// 	expect(lastUpdatedBalance).to.equal(expectedAmount);
		//
		// });
		//
		// it('should be reverted when trying to withdraw more than the available amount when active subscription exists', async function () {
		// 	const from = parent.accounts[0].address;
		// 	const to = parent.accounts[1].address;
		// 	const rate = amount('1');
		// 	const ethAmount = amount('10');
		//
		// 	await parent.contract.updateSubscription(from, to, rate, ethAmount, {from: from});
		//
		// 	await mine_blocks(3, parent.provider);
		//
		// 	const contract = await parent.contract.connect(parent.accounts[1]);
		//
		// 	await expect(contract.withdraw(amount('10'), {from: to})).to.be.revertedWith("Requested amount larger than available balance.");
		//
		// });


	})

})
