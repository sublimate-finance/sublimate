import {getUnnamedAccounts, ethers} from 'hardhat'


const waitFor = <T>(p: Promise<{wait: () => Promise<T>}>): Promise<T> => {
	return p.then((tx) => tx.wait())
}

const amount = (n: string) => {
	return ethers.utils.parseEther(n) //TODO: take decimals into account
}

const mineBlocks = async (n: number, provider: any)  => {
	for (let i = 0; i < n; i++) {
		await provider.send('evm_mine', [])
	}
}

async function main() {
	const others = await getUnnamedAccounts();
	const from1 = others[0];
	const from2 = others[1]
	const to1 = others[2]
	const to2 = others[3]

	const strEthContractFrom1 = await ethers.getContract(
		'strETH',
		from1
	)

	const strEthContractFrom2 = await ethers.getContract(
		'strETH',
		from2
	)

	const strEthContractTo1 = await ethers.getContract(
		'strETH',
		to1
	)

	const strEthContractTo2 = await ethers.getContract(
		'strETH',
		to2
	)

	// deposit
	await waitFor(strEthContractFrom1.deposit({from: from1, value: amount('50')}));
	await waitFor(strEthContractFrom2.deposit({from: from2, value: amount('20')}));

	// create subscriptions
	await waitFor(strEthContractFrom1.updateSubscription(from1, to1, amount('0.001'), amount('10')));
	await waitFor(strEthContractFrom1.updateSubscription(from1, to2, amount('0.02'), amount('15')));
	await waitFor(strEthContractFrom2.updateSubscription(from2, to1, amount('1'), amount('5')));
	await waitFor(strEthContractFrom2.updateSubscription(from2, to2, amount('0.00001'), amount('3')));

	await mineBlocks(5, strEthContractFrom1.provider );

	await waitFor(strEthContractTo1.withdraw(amount('1'), {from: to1}));

	await mineBlocks(100, strEthContractFrom1.provider );
	await waitFor(strEthContractTo2.withdraw(amount('0.01'), {from: to2}));

	const to1Balance = await strEthContractTo1.lastUpdatedBalanceOf(to1);
	const to2Balance = await strEthContractTo1.lastUpdatedBalanceOf(to1);
	console.log(to1Balance);
	console.log(to2Balance);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
