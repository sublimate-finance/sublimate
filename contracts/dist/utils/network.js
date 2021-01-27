"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accounts = exports.getMnemonic = exports.node_url = void 0;
require("dotenv/config");
function node_url(networkName) {
    if (networkName) {
        var uri_1 = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];
        if (uri_1 && uri_1 !== '') {
            return uri_1;
        }
    }
    var uri = process.env.ETH_NODE_URI;
    if (uri) {
        uri = uri.replace('{{networkName}}', networkName);
    }
    if (!uri || uri === '') {
        if (networkName === 'localhost') {
            return 'http://localhost:8545';
        }
        // throw new Error(`environment variable "ETH_NODE_URI" not configured `);
        return '';
    }
    if (uri.indexOf('{{') >= 0) {
        throw new Error("invalid uri or network not supported by nod eprovider : " + uri);
    }
    return uri;
}
exports.node_url = node_url;
function getMnemonic(networkName) {
    if (networkName) {
        var mnemonic_1 = process.env['MNEMONIC_' + networkName.toUpperCase()];
        if (mnemonic_1 && mnemonic_1 !== '') {
            return mnemonic_1;
        }
    }
    var mnemonic = process.env.MNEMONIC;
    if (!mnemonic || mnemonic === '') {
        return 'test test test test test test test test test test test junk';
    }
    return mnemonic;
}
exports.getMnemonic = getMnemonic;
function accounts(networkName) {
    return { mnemonic: getMnemonic(networkName) };
}
exports.accounts = accounts;
