import {expect} from './chai-setup'
import {ethers, deployments, getUnnamedAccounts, artifacts} from 'hardhat'
import { BigNumber } from '@ethersproject/bignumber'
import {accounts} from "../utils/network";


const mineBlocks = async (n: number) => {
	return await Promise.all(
		Array(n).map(i =>
			ethers.provider.send('evm_mine', [])
		)
	)
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

		it('should create subscription successfully', async function () {
			await subscribe()
		})
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

})
