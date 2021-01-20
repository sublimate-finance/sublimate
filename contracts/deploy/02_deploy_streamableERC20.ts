import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {deployer} = await hre.getNamedAccounts()
	const {deploy} = hre.deployments
	const useProxy = !hre.network.live

// proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
// in live network, proxy is disabled and constructor is invoked
	await deploy('StreamableERC20', {
		from: deployer,
		args: ["Streamable Ether", "strETH"],
		log: true,
	})

	return !useProxy // when live network, record the script as executed to prevent rexecution
}
export default func
func.id = 'deploy_streamable_erc20' // id required to prevent reexecution
func.tags = ['StreamableERC20']
