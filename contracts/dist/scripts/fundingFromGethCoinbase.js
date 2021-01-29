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
// script used to fund account from a geth coinbase account (geth --dev)
var hardhat_1 = require("hardhat");
var bignumber_1 = require("@ethersproject/bignumber");
var providers_1 = require("@ethersproject/providers");
function wait(numSec) {
    return new Promise(function (resolve) {
        setTimeout(resolve, numSec * 1000);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var found, chainId, e_1, rawProvider, coinbase, accounts, accountsToFund, coinbaseBalance, nonce, maxAmount, amount, coinbaseSigner, i, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('funding from coinbase ...');
                    _a.label = 1;
                case 1:
                    if (!!found) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, hardhat_1.ethers.provider.send('eth_chainId', [])];
                case 3:
                    chainId = _a.sent();
                    console.log({ chainId: chainId });
                    found = true;
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5:
                    if (!!found) return [3 /*break*/, 7];
                    return [4 /*yield*/, wait(1)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 1];
                case 8:
                    rawProvider = new providers_1.JsonRpcProvider('http://localhost:8545');
                    return [4 /*yield*/, hardhat_1.ethers.provider.send('eth_coinbase', [])];
                case 9:
                    coinbase = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.provider.listAccounts()];
                case 10:
                    accounts = _a.sent();
                    accountsToFund = accounts;
                    if (coinbase === accounts[0]) {
                        accountsToFund = accounts.slice(1);
                    }
                    return [4 /*yield*/, hardhat_1.ethers.provider.getBalance(coinbase)];
                case 11:
                    coinbaseBalance = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.provider.getTransactionCount(coinbase)];
                case 12:
                    nonce = _a.sent();
                    maxAmount = bignumber_1.BigNumber.from('10000000000000000000');
                    amount = coinbaseBalance.div(accountsToFund.length);
                    if (amount.gt(maxAmount)) {
                        amount = maxAmount;
                    }
                    if (!coinbaseBalance.gt(0)) return [3 /*break*/, 16];
                    coinbaseSigner = rawProvider.getSigner(coinbase);
                    i = 0;
                    _a.label = 13;
                case 13:
                    if (!(i < accountsToFund.length)) return [3 /*break*/, 16];
                    return [4 /*yield*/, coinbaseSigner.sendTransaction({
                            to: accountsToFund[i],
                            value: amount.sub(21000).toHexString(),
                            nonce: bignumber_1.BigNumber.from(nonce + i).toHexString(),
                        })];
                case 14:
                    tx = _a.sent();
                    console.log(tx.hash);
                    _a.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
