import {expect} from './chai-setup'
import {ethers, deployments, getUnnamedAccounts, artifacts} from 'hardhat'
import { BigNumber } from '@ethersproject/bignumber'
import {accounts} from "../utils/network";


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
		await this.contract.deployed();
		// await deployments.fixture('strETH');
		// this.contract = await ethers.getContract('strETH')
	})

	function amount(n: string) {
		return ethers.utils.parseEther(n) //TODO: take decimals into account
	}

	it('should be deployed correctly', async function () {
		expect(this.contract.address).to.be.a('string')
	})

	it('should have 0 balance by default', async function () {
		const balance = await this.contract.balanceOf(this.accounts[0].address)
		expect(balance).to.eq(0)
	})


	// describe('depositing', function (this: any) {
	// 	const parent = this.parent.ctx;
	// 	beforeEach(async function () {
	// 		const oneEth = amount("1")
	// 		const fromAcc = parent.accounts[0].address;
	// 		await parent.contract.deposit({value: oneEth, from: fromAcc});
	// 	})
	// 	it("should mint new tokens", async function () {
	// 		const fromAcc = parent.accounts[0].address;
	// 		const depositAmount = amount("1");
	// 		const expectedAmount = amount("2");
	// 		await parent.contract.deposit({value: depositAmount, from: fromAcc});
	// 		expect(await parent.contract.balanceOf(fromAcc)).to.eq(expectedAmount);
	// 	});
	//
	// 	it("should emit Transfer event", async function () {
	// 		const depositAmount = amount("1");
	// 		const fromAcc = parent.accounts[0].address;
	//
	// 		await expect(parent.contract.deposit({value: depositAmount, from: fromAcc}))
	// 			.to.emit(parent.contract, 'Transfer')
	// 			.withArgs("0x0000000000000000000000000000000000000000", fromAcc, depositAmount);
	// 	});
	//
	// })
	//
	// describe('withdrawing', function (this: any) {
	// 	const parent = this.parent.ctx;
	// 	beforeEach(async function () {
	// 		const oneEth = amount("1")
	// 		const fromAcc = parent.accounts[0].address;
	// 		await parent.contract.deposit({value: oneEth, from: fromAcc});
	// 	})
	//
	//
	// 	it("should burn Tokens", async function () {
	// 		const depositedAmount = amount("1");
	// 		const fromAcc = parent.accounts[0].address;
	//
	// 		expect(await parent.contract.balanceOf(fromAcc)).to.equal(depositedAmount);
	//
	// 		await parent.contract.withdraw(depositedAmount, {from: fromAcc});
	//
	// 		expect(await parent.contract.balanceOf(fromAcc)).to.equal(0);
	// 	});
	//
	//
	// 	it('should emit Transfer event', async function () {
	// 		const fromAcc = parent.accounts[0].address;
	// 		const depositedAmount = amount("1");
	// 		expect(await parent.contract.balanceOf(fromAcc)).to.equal(depositedAmount);
	//
	// 		await expect(parent.contract.withdraw(depositedAmount, {from: fromAcc}))
	// 			.to.emit(parent.contract, 'Transfer')
	// 			.withArgs(fromAcc, "0x0000000000000000000000000000000000000000", depositedAmount);
	// 	});
	//
	//
	// })

	describe('subscribing with balance', function (this: any) {
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

			await parent.contract.provider.send('evm_mine', [])

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

			for(let i = 0; i < 5; i++) {
				await parent.contract.provider.send('evm_mine', []);
			}

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(maxAmount.sub(fiveEth));
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(fiveEth);

		});

		it('should return the correct balances after the subscription ends regularly (without state changing interaction)', async function () {
			const from = parent.accounts[0].address;
			const to = parent.accounts[1].address;
			const rate = amount('1');
			const maxAmount = amount('10');

			await parent.contract.updateSubscription(from, to, rate, maxAmount, {from: from});

			// Mine more blocks than the subscription lasts
			for(let i = 0; i < 11; i++) {
				await parent.contract.provider.send('evm_mine', []);
			}

			const from_balance = await parent.contract.lastUpdatedBalanceOf(from);
			expect(from_balance).to.equal(0);
			const to_balance = await parent.contract.lastUpdatedBalanceOf(to);
			expect(to_balance).to.equal(maxAmount);

		});

		// it('should emit SubscriptionCanceled event when canceling new subscription', async function () {
		//
		// });
		//
		//
		// it('should return the correct balances after the subscription is canceled after 1 block', async function () {
		//
		// });
		//
		//
		// it('should return the correct balances after the subscription is canceled after 5 block', async function () {
		//
		// });


		//
		// it('should unsubscribe successfully', async function () {
		// 	await subscribe()
		// 	await this.contract.subscribe(this.accounts[0].address, this.accounts[1].address, 0, 0)
		// 	expectSubscription(this.accounts[0].address, this.accounts[1].address, amount('0'), amount('0'))
		// })
		//
		// it('should update balances correctly', async function () {
		// 	await subscribe()
		//
		// 	await mineBlocks(1)
		//
		// 	const balance0 = await this.contract.balanceOf(this.accounts[0].address)
		// 	expect(balance0).to.be.bignumber.eq(amount('9'))
		//
		// 	const balance1 = await this.contract.balanceOf(this.accounts[1].address)
		// 	expect(balance1).to.be.bignumber.eq(amount('1'))
		// })

	})


	// describe('withdrawing with active subscriptions', function (this: any) {
	//
	// 	it('should emit Transfer event when withdraw is successful', async function () {
	//
	// 	});
	//
	//
	// 	it('should be successful if the user withdraws below availableAmount', async function () {
	//
	// 	});
	//
	// 	it('should be successful if the user withdraws equal to availableAmount', async function () {
	//
	// 	});
	//
	// 	it('should be unsuccessful if the user withdraws more then availableAmount', async function () {
	//
	// 	});
	//
	//
	//
	//
	// })

})
