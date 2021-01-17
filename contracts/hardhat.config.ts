import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/types'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-typechain'
import { node_url, accounts } from './utils/network'

const config: HardhatUserConfig = {
	solidity: {
		compilers: [
			{
				version: '0.8.0',
				settings: {
					optimizer: {
						enabled: true,
						runs: 2000,
					},
				},
			},
			{
				version: '0.7.1',
				settings: {
					optimizer: {
						enabled: true,
						runs: 2000,
					},
				},
			}
		]
	},
	namedAccounts: {
		deployer: 0,
	},
	networks: {
		hardhat: {
			accounts: accounts(),
		},
		localhost: {
			url: node_url('localhost'),
			accounts: accounts(),
		},
		mainnet: {
			url: node_url('mainnet'),
			accounts: accounts('mainnet'),
		},
		rinkeby: {
			url: node_url('rinkeby'),
			accounts: accounts('rinkeby'),
		},
		kovan: {
			url: node_url('kovan'),
			accounts: accounts('kovan'),
		},
		goerli: {
			url: node_url('goerli'),
			accounts: accounts('goerli'),
		},
		staging: {
			url: node_url('rinkeby'),
			accounts: accounts('rinkeby'),
		},
	},
	paths: {
		sources: 'src',
	},
	mocha: {
		timeout: 0,
	},
}

export default config
