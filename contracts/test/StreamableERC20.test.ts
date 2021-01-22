import {expect} from './chai-setup'
import {ethers, deployments, getUnnamedAccounts, artifacts} from 'hardhat'
import { BigNumber } from '@ethersproject/bignumber'

const mineBlocks = async (n: number) => {
	return await Promise.all(
		Array(n).map(i =>
			ethers.provider.send('evm_mine', [])
		)
	)
}

describe('StreamableERC20', function () {

	before(async function () {
		this.accounts = await ethers.getSigners()
	})

	beforeEach(async function () {
		/*const StreamableERC20 = await ethers.getContractFactory('IStreamableERC20')
		const contract = await StreamableERC20.deploy()*/
		this.contract = await ethers.getContractAt('strETH', '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0')
	})

	function amount(this: any, n: string) {
		return ethers.utils.parseEther(n) //TODO: take decimals into account
	}

	it('should be deployed correctly', async function () {
		expect(this.contract.address).to.be.a('string')
	})

	it('should have 0 balance by default', async function () {
		const balance = await this.contract.balanceOf(this.accounts[0].address)
		balance.should.be.bignumber.eq(ethers.utils.parseEther('0'))
	})

	// describe('with inital token balance', function () {
	//
	// 	beforeEach(async function () {
	// 		//TODO: mint tokens for user (this.accounts[0].address)
	// 	})
	//
	// 	async function subscribe(this: any) {
	// 		// subscribe from [0] to [1] with 1 ETH / block, maximum of 10 ETH
	// 		await this.contract.subscribe(this.accounts[0].address, this.accounts[1].address, amount('1'), amount('10'))
	// 	}
	//
	// 	async function expectSubscription(this: any, from: string, to: string, rate: BigNumber, maxAmount: BigNumber) {
	// 		const [_rate, _maxAmount] = this.contract.getSubscription(from, this.accounts[1].address)
	// 		expect(_rate).to.be.bignumber.eq(rate)
	// 		expect(_maxAmount).to.be.bignumber.eq(amount('10'))
	// 	}
	//
	// 	it('should subscribe successfully', async function () {
	// 		await subscribe()
	// 		expectSubscription(this.accounts[0].address, this.accounts[1].address, amount('1'), amount('10'))
	// 	})
	//
	// 	it('should unsubscribe successfully', async function () {
	// 		await subscribe()
	// 		await this.contract.subscribe(this.accounts[0].address, this.accounts[1].address, 0, 0)
	// 		expectSubscription(this.accounts[0].address, this.accounts[1].address, amount('0'), amount('0'))
	// 	})
	//
	// 	it('should update balances correctly', async function () {
	// 		await subscribe()
	//
	// 		await mineBlocks(1)
	//
	// 		const balance0 = await this.contract.balanceOf(this.accounts[0].address)
	// 		expect(balance0).to.be.bignumber.eq(amount('9'))
	//
	// 		const balance1 = await this.contract.balanceOf(this.accounts[1].address)
	// 		expect(balance1).to.be.bignumber.eq(amount('1'))
	// 	})
	//
	// })
})
