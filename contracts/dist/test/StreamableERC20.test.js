"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_setup_1 = require("./chai-setup");
var hardhat_1 = require("hardhat");
var mineBlocks = function (n) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(Array(n).map(function (i) {
                    return hardhat_1.ethers.provider.send('evm_mine', []);
                }))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
describe('strETH', function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, hardhat_1.getUnnamedAccounts()];
                    case 1:
                        _a.accounts = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    /*const StreamableERC20 = await ethers.getContractFactory('IStreamableERC20')
                    const contract = await StreamableERC20.deploy()*/
                    return [4 /*yield*/, hardhat_1.deployments.fixture('strETH')];
                    case 1:
                        /*const StreamableERC20 = await ethers.getContractFactory('IStreamableERC20')
                        const contract = await StreamableERC20.deploy()*/
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, hardhat_1.ethers.getContract('strETH')];
                    case 2:
                        _a.contract = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    function amount(n) {
        return hardhat_1.ethers.utils.parseEther(n); //TODO: take decimals into account
    }
    it('should be deployed correctly', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("this contract address", this.contract);
                chai_setup_1.expect(this.contract.address).to.be.a('string');
                return [2 /*return*/];
            });
        });
    });
    it('should have 0 balance by default', function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("THIS ACCOUNTS", this.accounts[1]);
                        return [4 /*yield*/, this.contract.balanceOf(this.accounts[1])];
                    case 1:
                        balance = _a.sent();
                        console.log("BALANCE", balance);
                        chai_setup_1.expect(balance).to.be.bignumber.eq(hardhat_1.ethers.utils.parseEther('0'));
                        return [2 /*return*/];
                }
            });
        });
    });
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
});
