/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { StrETH } from "../StrETH";

export class StrETH__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<StrETH> {
    return super.deploy(overrides || {}) as Promise<StrETH>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StrETH {
    return super.attach(address) as StrETH;
  }
  connect(signer: Signer): StrETH__factory {
    return super.connect(signer) as StrETH__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): StrETH {
    return new Contract(address, _abi, signerOrProvider) as StrETH;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "SubscriptionCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256",
      },
    ],
    name: "SubscriptionStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "SubscriptionStopped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "source",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "availableBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "cancelSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "getSubscription",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "lastUpdatedBalanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256",
      },
    ],
    name: "updateSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280601081526020016f29ba3932b0b6b0b136329022ba3432b960811b815250604051806040016040528060068152602001650e6e8e48aa8960d31b81525081818181816003908051906020019062000076929190620000a7565b5080516200008c906004906020840190620000a7565b50506005805460ff19166012179055506200018a9350505050565b828054620000b5906200014d565b90600052602060002090601f016020900481019282620000d9576000855562000124565b82601f10620000f457805160ff191683800117855562000124565b8280016001018555821562000124579182015b828111156200012457825182559160200191906001019062000107565b506200013292915062000136565b5090565b5b8082111562000132576000815560010162000137565b6002810460018216806200016257607f821691505b602082108114156200018457634e487b7160e01b600052602260045260246000fd5b50919050565b612acb806200019a6000396000f3fe6080604052600436106101295760003560e01c806370a08231116100a5578063a0821be311610074578063a9059cbb11610059578063a9059cbb1461032f578063d0e30db01461034f578063dd62ed3e1461035757610129565b8063a0821be3146102ef578063a457c2d71461030f57610129565b806370a082311461027a5780637946677b1461029a57806391b70212146102ba57806395d89b41146102da57610129565b80632e1a7d4d116100fc57806339509351116100e1578063395093511461020c5780635b0f7c541461022c5780635b75dd8d1461024c57610129565b80632e1a7d4d146101c8578063313ce567146101ea57610129565b806306fdde031461012e578063095ea7b31461015957806318160ddd1461018657806323b872dd146101a8575b600080fd5b34801561013a57600080fd5b50610143610377565b60405161015091906122e0565b60405180910390f35b34801561016557600080fd5b50610179610174366004612240565b610409565b60405161015091906122cc565b34801561019257600080fd5b5061019b610426565b60405161015091906122d7565b3480156101b457600080fd5b506101796101c33660046121c4565b61042c565b3480156101d457600080fd5b506101e86101e3366004612269565b6104a1565b005b3480156101f657600080fd5b506101ff61051f565b6040516101509190612818565b34801561021857600080fd5b50610179610227366004612240565b610528565b34801561023857600080fd5b506101e86102473660046121ff565b610577565b34801561025857600080fd5b5061026c610267366004612192565b610a9f565b60405161015092919061280a565b34801561028657600080fd5b5061019b610295366004612171565b610ad2565b3480156102a657600080fd5b506101e86102b5366004612192565b610af1565b3480156102c657600080fd5b5061019b6102d5366004612171565b610e01565b3480156102e657600080fd5b50610143611149565b3480156102fb57600080fd5b5061019b61030a366004612171565b611158565b34801561031b57600080fd5b5061017961032a366004612240565b611173565b34801561033b57600080fd5b5061017961034a366004612240565b6111c2565b6101e86111d6565b34801561036357600080fd5b5061019b610372366004612192565b6111e2565b606060038054610386906129e0565b80601f01602080910402602001604051908101604052809291908181526020018280546103b2906129e0565b80156103ff5780601f106103d4576101008083540402835291602001916103ff565b820191906000526020600020905b8154815290600101906020018083116103e257829003601f168201915b5050505050905090565b600061041d61041661120d565b8484611211565b50600192915050565b60025490565b60006104398484846112c5565b6104978461044561120d565b6001600160a01b0387166000908152600160205260408120869161046761120d565b6001600160a01b03166001600160a01b031681526020019081526020016000205461049291906129c9565b611211565b5060019392505050565b6104aa336113c2565b6104b3336113d7565b806104bd33611158565b10156104e45760405162461bcd60e51b81526004016104db906123fa565b60405180910390fd5b6104ee33826113f7565b604051339082156108fc029083906000818181858888f1935050505015801561051b573d6000803e3d6000fd5b5050565b60055460ff1690565b600061041d61053561120d565b84846001600061054361120d565b6001600160a01b03908116825260208083019390935260409182016000908120918b1681529252902054610492919061287e565b336001600160a01b0385161461059f5760405162461bcd60e51b81526004016104db906124b4565b600082116105bf5760405162461bcd60e51b81526004016104db906126bc565b600081116105df5760405162461bcd60e51b81526004016104db906125a5565b818110156105ff5760405162461bcd60e51b81526004016104db9061239d565b8061060985611158565b10156106275760405162461bcd60e51b81526004016104db90612511565b610630846113c2565b610639846113d7565b610642836113d7565b6106816040518060400160405280600f81526020017f616464726573732066726f6d20257300000000000000000000000000000000008152508561140b565b6106c06040518060400160405280600d81526020017f6164647265737320746f202573000000000000000000000000000000000000008152508461140b565b6106ff6040518060400160405280600f81526020017f61646472657373207261746520257300000000000000000000000000000000008152508361147e565b61073e6040518060400160405280601481526020017f61646472657373206d6178416d6f756e742025730000000000000000000000008152508261147e565b6107856040518060400160405280601081526020017f73757065722062616c616e6365206f660000000000000000000000000000000081525061078086610ad2565b61147e565b8061078f85610ad2565b10156107ad5760405162461bcd60e51b81526004016104db90612511565b60006001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff1660048111156107fa57634e487b7160e01b600052602160045260246000fd5b1415610a9957600061080c8383612896565b610816904361287e565b905060006040518060e00160405280858152602001848152602001438152602001838152602001438152602001600081526020016001600481111561086b57634e487b7160e01b600052602160045260246000fd5b81525090508060086000886001600160a01b03166001600160a01b031681526020019081526020016000206000876001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff0219169083600481111561092d57634e487b7160e01b600052602160045260246000fd5b021790555050506001600160a01b038087166000818152600960209081526040808320805460018181018355918552838520018054968c167fffffffffffffffffffffffff000000000000000000000000000000000000000097881681179091558452600a835281842080549182018155845282842001805490951684179094559181526006909152908120600281018054919287926109ce90849061287e565b92505081905550838160030160008282546109e9919061287e565b909155506109f9905087856114f1565b6001600160a01b0386166000908152600660205260408120805490918791839190610a2590849061287e565b9250508190555084816001016000828254610a40919061287e565b92505081905550866001600160a01b0316886001600160a01b03167fc4662c9885aee03589723fddf92c8240c905bd763063f2e8785b4311b750507b8888604051610a8c92919061280a565b60405180910390a3505050505b50505050565b6001600160a01b039182166000908152600860209081526040808320939094168252919091522080546001909101549091565b6001600160a01b0381166000908152602081905260409020545b919050565b336001600160a01b03831614610b195760405162461bcd60e51b81526004016104db90612548565b60016001600160a01b0380841660009081526008602090815260408083209386168352929052206006015460ff166004811115610b6657634e487b7160e01b600052602160045260246000fd5b14610b835760405162461bcd60e51b81526004016104db90612776565b610b8c826113c2565b610b95826113d7565b610b9e816113d7565b6001600160a01b03828116600081815260086020908152604080832094861683529381528382206006808201805460ff1916600317905590549383529052918220600201805491929091610bf39084906129c9565b90915550506001600160a01b03808316600081815260086020908152604080832094861683529381528382206001015492825260069052918220600301805491929091610c419084906129c9565b90915550506001600160a01b03828116600090815260086020908152604080832093851683529290529081206005810154600190910154610c8291906129c9565b9050610cc36040518060400160405280601081526020017f756e7061696420616d6f756e74202573000000000000000000000000000000008152508261147e565b610ccd8382611535565b610d316040518060400160405280601381526020017f617661696c61626c652062616c616e636520250000000000000000000000000081525060076000866001600160a01b03166001600160a01b031681526020019081526020016000205461147e565b6001600160a01b03808416600090815260086020908152604080832093861683529281528282205460069091529181208054909190610d719084906129c9565b90915550506001600160a01b038084166000908152600860209081526040808320938616835292815282822060019081015460069092529282209092018054909190610dbe9084906129c9565b90915550506040516001600160a01b0380841691908516907f193673179ecd55aff62614ea2d28c166ba370f94fa3604ed5ce77d7d666d855090600090a3505050565b6001600160a01b0381166000908152600660209081526040808320815160a081018352815481526001820154818501526002820154818401526003820154606082015260049091015460808201528151808301909252601e82527f757365722073746174757320696e636f6d6d696e6720726174653a2025730000928201929092528151610e8f919061147e565b610ed26040518060400160405280602081526020017f757365722073746174757320696e636f6d6d696e6720616d6f756e743a202573815250826020015161147e565b610f156040518060400160405280601d81526020017f7573657220737461747573206f7574676f696e6720726174653a202573000000815250826040015161147e565b610f3b604051806060016040528060258152602001612a4d60259139826060015161147e565b610f61604051806060016040528060248152602001612a7260249139826080015161147e565b6000610f6c84611559565b9050610fad6040518060400160405280601281526020017f616d6f756e7420696e63207375627320257300000000000000000000000000008152508261147e565b6000610fb8856116fa565b9050610ff96040518060400160405280601781526020017f616d6f756e74206f7574676f696e6720737562732025730000000000000000008152508261147e565b60006110058383612971565b90506110496040518060400160405280601581526020017f62616c616e6365206f66206163636f756e74202573000000000000000000000081525061078088610ad2565b6110886040518060400160405280601781526020017f63757272656e7420626c6f636b206e756d6265722025730000000000000000008152504361147e565b6040840151845160009161109b91612971565b905060008560800151436110af91906129c9565b90506110ba82611895565b6110c381611895565b60006110cf82846128b6565b90506110da81611895565b600084826110e78c610ad2565b6110f19190612826565b6110fb9190612826565b905061113c6040518060400160405280600c81526020017f526573756c7420697320257300000000000000000000000000000000000000008152508261147e565b9998505050505050505050565b606060048054610386906129e0565b6001600160a01b031660009081526007602052604090205490565b600061041d61118061120d565b84846001600061118e61120d565b6001600160a01b03908116825260208083019390935260409182016000908120918b168152925290205461049291906129c9565b600061041d6111cf61120d565b84846112c5565b6111e03334611906565b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166112375760405162461bcd60e51b81526004016104db90612719565b6001600160a01b03821661125d5760405162461bcd60e51b81526004016104db90612457565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906112b89085906122d7565b60405180910390a3505050565b6001600160a01b0383166112eb5760405162461bcd60e51b81526004016104db9061265f565b6001600160a01b0382166113115760405162461bcd60e51b81526004016104db90612340565b61131c83838361191a565b6001600160a01b0383166000908152602081905260409020546113409082906129c9565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461137090829061287e565b6001600160a01b0380841660008181526020819052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906112b89085906122d7565b6113cb8161191f565b6113d481611b18565b50565b6001600160a01b0316600090815260066020526040902043600490910155565b6114018282611d0a565b61051b82826114f1565b61051b82826040516024016114219291906122f3565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f319af33300000000000000000000000000000000000000000000000000000000179052611dd4565b61051b828260405160240161149492919061231e565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f9710a9d000000000000000000000000000000000000000000000000000000000179052611dd4565b6001600160a01b0382166000908152600760205260409020546115159082906129c9565b6001600160a01b0390921660009081526007602052604090209190915550565b6001600160a01b03821660009081526007602052604090205461151590829061287e565b600080805b6001600160a01b0384166000908152600a60205260409020548110156116f3576001600160a01b0384166000908152600a602052604081208054839081106115b657634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928a168552918352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff169081111561165757634e487b7160e01b600052602160045260246000fd5b600481111561167657634e487b7160e01b600052602160045260246000fd5b905250905060018160c0015160048111156116a157634e487b7160e01b600052602160045260246000fd5b1480156116b15750806060015143115b156116de5760608101516116c590436129c9565b81516116d19190612952565b6116db908561287e565b93505b505080806116eb90612a1b565b91505061155e565b5092915050565b600080805b6001600160a01b0384166000908152600960205260409020548110156116f3576001600160a01b038416600090815260096020526040812080548390811061175757634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03888116845260088352604080852091909216808552908352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff16908111156117f957634e487b7160e01b600052602160045260246000fd5b600481111561181857634e487b7160e01b600052602160045260246000fd5b905250905060018160c00151600481111561184357634e487b7160e01b600052602160045260246000fd5b1480156118535750806060015143115b1561188057606081015161186790436129c9565b81516118739190612952565b61187d908561287e565b93505b5050808061188d90612a1b565b9150506116ff565b6113d4816040516024016118a991906122d7565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f4e0c1d1d00000000000000000000000000000000000000000000000000000000179052611dd4565b6119108282611df5565b61051b8282611535565b505050565b6001600160a01b0381166000908152600960205260408120544391808267ffffffffffffffff81111561196257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561198b578160200160208202803683370190505b50905060005b6001600160a01b038616600090815260096020526040902054811015611ae6576001600160a01b03861660009081526009602052604081208054839081106119e957634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b038a811684526008835260408085209190921680855292529091209091506003600682015460ff166004811115611a4557634e487b7160e01b600052602160045260246000fd5b1415611a52575050611ad4565b8060030154871115611a7057611a6b8189846000611eab565b611ac8565b611a7b818984612064565b818486611a8781612a1b565b975081518110611aa757634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b611ad1826113d7565b50505b80611ade81612a1b565b915050611991565b506001600160a01b03851660009081526009602090815260409091208251611b10928401906120c8565b505050505050565b6001600160a01b0381166000908152600a60205260408120544391808267ffffffffffffffff811115611b5b57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611b84578160200160208202803683370190505b50905060005b6001600160a01b0386166000908152600a6020526040902054811015611ce0576001600160a01b0386166000908152600a60205260408120805483908110611be257634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928c168552919092529091209091506003600682015460ff166004811115611c3f57634e487b7160e01b600052602160045260246000fd5b1415611c4c575050611cce565b8060030154871115611c6a57611c6581838a6001611eab565b611cc2565b611c7581838a612064565b818486611c8181612a1b565b975081518110611ca157634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b611ccb826113d7565b50505b80611cd881612a1b565b915050611b8a565b506001600160a01b0385166000908152600a602090815260409091208251611b10928401906120c8565b6001600160a01b038216611d305760405162461bcd60e51b81526004016104db90612602565b611d3c8260008361191a565b6001600160a01b038216600090815260208190526040902054611d609082906129c9565b6001600160a01b038316600090815260208190526040902055600254611d879082906129c9565b6002556040516000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611dc89085906122d7565b60405180910390a35050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6001600160a01b038216611e1b5760405162461bcd60e51b81526004016104db906127d3565b611e276000838361191a565b80600254611e35919061287e565b6002556001600160a01b038216600090815260208190526040902054611e5c90829061287e565b6001600160a01b0383166000818152602081905260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611dc89085906122d7565b600084600401548560030154611ec191906129c9565b905080611ece5750610a99565b84546002860154600387015460009291611ee7916129c9565b611ef19190612952565b8660010154611f0091906129c9565b8654611f0c9084612952565b611f16919061287e565b9050611f238585836112c5565b611f2d8482611535565b8560030154866004018190555080866005016000828254611f4e919061287e565b909155505060068601805460ff1916600417905560018381811115611f8357634e487b7160e01b600052602160045260246000fd5b1415611ff55785546001600160a01b03851660009081526006602052604081208054909190611fb39084906129c9565b90915550506001808701546001600160a01b0386166000908152600660205260408120909201805491929091611fea9084906129c9565b90915550611b109050565b85546001600160a01b038616600090815260066020526040812060020180549091906120229084906129c9565b909155505060018601546001600160a01b038616600090815260066020526040812060030180549091906120579084906129c9565b9091555050505050505050565b600083600401544361207691906129c9565b84549091506000906120889083612952565b90506120958484836112c5565b61209f8382611535565b438560040181905550808560050160008282546120bc919061287e565b90915550505050505050565b828054828255906000526020600020908101928215612135579160200282015b8281111561213557825182547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b039091161782556020909201916001909101906120e8565b50612141929150612145565b5090565b5b808211156121415760008155600101612146565b80356001600160a01b0381168114610aec57600080fd5b600060208284031215612182578081fd5b61218b8261215a565b9392505050565b600080604083850312156121a4578081fd5b6121ad8361215a565b91506121bb6020840161215a565b90509250929050565b6000806000606084860312156121d8578081fd5b6121e18461215a565b92506121ef6020850161215a565b9150604084013590509250925092565b60008060008060808587031215612214578081fd5b61221d8561215a565b935061222b6020860161215a565b93969395505050506040820135916060013590565b60008060408385031215612252578182fd5b61225b8361215a565b946020939093013593505050565b60006020828403121561227a578081fd5b5035919050565b60008151808452815b818110156122a65760208185018101518683018201520161228a565b818111156122b75782602083870101525b50601f01601f19169290920160200192915050565b901515815260200190565b90815260200190565b60006020825261218b6020830184612281565b6000604082526123066040830185612281565b90506001600160a01b03831660208301529392505050565b6000604082526123316040830185612281565b90508260208301529392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201527f6573730000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526039908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e206f7220657175616c20746f2074686520726174652e00000000000000606082015260800190565b6020808252602f908201527f52657175657374656420616d6f756e74206c6172676572207468616e2061766160408201527f696c61626c652062616c616e63652e0000000000000000000000000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560408201527f7373000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526030908201527f4f6e6c79207468652061646472657373206f776e65722063616e20737461727460408201527f206120737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526015908201527f496e73756666696369656e742062616c616e63652e0000000000000000000000604082015260600190565b60208082526030908201527f4f6e6c792074686520737562736372696265722063616e2063616e63656c207460408201527f686520737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526026908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e20302e0000000000000000000000000000000000000000000000000000606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360408201527f7300000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460408201527f6472657373000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602d908201527f54686520737562736372697074696f6e2072617465206d75737420626520677260408201527f6561746572207468616e20302e00000000000000000000000000000000000000606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460408201527f7265737300000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602a908201527f4f6e6c792061637469766520737562736372697074696f6e732063616e20626560408201527f2063616e63656c65642e00000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b918252602082015260400190565b60ff91909116815260200190565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0384138115161561286057612860612a36565b82600160ff1b03841281161561287857612878612a36565b50500190565b6000821982111561289157612891612a36565b500190565b6000826128b157634e487b7160e01b81526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff818413828413858304851182821616156128f5576128f5612a36565b600160ff1b8487128682058812818416161561291357612913612a36565b85871292508782058712848416161561292e5761292e612a36565b8785058712818416161561294457612944612a36565b505050929093029392505050565b600081600019048311821515161561296c5761296c612a36565b500290565b600080831283600160ff1b0183128115161561298f5761298f612a36565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0183138116156129c3576129c3612a36565b50500390565b6000828210156129db576129db612a36565b500390565b6002810460018216806129f457607f821691505b60208210811415612a1557634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415612a2f57612a2f612a36565b5060010190565b634e487b7160e01b600052601160045260246000fdfe757365722073746174757320746f74616c206f7574676f696e6720616d6f756e743a202573757365722073746174757320626c6f636b206174206c617374207570646174653a202573a2646970667358221220d5dc6c0b0ad199ef551af0ead03164ba1fd516cf6b81bd9974b9ebfec60d324364736f6c63430008000033";
