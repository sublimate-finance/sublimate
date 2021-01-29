import * as chai from "chai";
import { solidity } from "ethereum-waffle";

import {chaiEthers} from 'chai-ethers'
chai.use(chaiEthers)
chai.use(solidity)
export = chai
