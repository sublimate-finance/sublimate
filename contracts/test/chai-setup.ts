import chaiModule from 'chai'
import {chaiEthers} from 'chai-ethers'
chaiModule.use(chaiEthers)
chaiModule.use(require('chai-bignumber'))
export = chaiModule
