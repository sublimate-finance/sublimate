/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { WrappedStreamableERC20 } from "../WrappedStreamableERC20";

export class WrappedStreamableERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides
  ): Promise<WrappedStreamableERC20> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      WrappedStreamableERC20
    >;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): WrappedStreamableERC20 {
    return super.attach(address) as WrappedStreamableERC20;
  }
  connect(signer: Signer): WrappedStreamableERC20__factory {
    return super.connect(signer) as WrappedStreamableERC20__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WrappedStreamableERC20 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WrappedStreamableERC20;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
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
      {
        indexed: true,
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
      {
        indexed: false,
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastTransferAtBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
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
        indexed: true,
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
      {
        indexed: false,
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastTransferAtBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
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
      {
        indexed: true,
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
      {
        indexed: false,
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastTransferAtBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
      },
    ],
    name: "SubscriptionUpdated",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "incomingRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalMaxIncomingAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outgoingRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalMaxOutgoingAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockAtLastUpdate",
        type: "uint256",
      },
    ],
    name: "UserStatusChanged",
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
  "0x60806040523480156200001157600080fd5b50604051620028a6380380620028a68339810160408190526200003491620001d2565b8181818181600390805190602001906200005092919062000081565b5080516200006690600490602084019062000081565b50506005805460ff19166012179055506200028c9350505050565b8280546200008f9062000239565b90600052602060002090601f016020900481019282620000b35760008555620000fe565b82601f10620000ce57805160ff1916838001178555620000fe565b82800160010185558215620000fe579182015b82811115620000fe578251825591602001919060010190620000e1565b506200010c92915062000110565b5090565b5b808211156200010c576000815560010162000111565b600082601f83011262000138578081fd5b81516001600160401b038082111562000155576200015562000276565b6040516020601f8401601f19168201810183811183821017156200017d576200017d62000276565b604052838252858401810187101562000194578485fd5b8492505b83831015620001b7578583018101518284018201529182019162000198565b83831115620001c857848185840101525b5095945050505050565b60008060408385031215620001e5578182fd5b82516001600160401b0380821115620001fc578384fd5b6200020a8683870162000127565b9350602085015191508082111562000220578283fd5b506200022f8582860162000127565b9150509250929050565b6002810460018216806200024e57607f821691505b602082108114156200027057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61260a806200029c6000396000f3fe6080604052600436106101295760003560e01c806370a08231116100a5578063a0821be311610074578063a9059cbb11610059578063a9059cbb1461032f578063d0e30db01461034f578063dd62ed3e1461035757610129565b8063a0821be3146102ef578063a457c2d71461030f57610129565b806370a082311461027a5780637946677b1461029a57806391b70212146102ba57806395d89b41146102da57610129565b80632e1a7d4d116100fc57806339509351116100e1578063395093511461020c5780635b0f7c541461022c5780635b75dd8d1461024c57610129565b80632e1a7d4d146101c8578063313ce567146101ea57610129565b806306fdde031461012e578063095ea7b31461015957806318160ddd1461018657806323b872dd146101a8575b600080fd5b34801561013a57600080fd5b50610143610377565b6040516101509190611e2b565b60405180910390f35b34801561016557600080fd5b50610179610174366004611ddf565b610409565b6040516101509190611e20565b34801561019257600080fd5b5061019b610426565b6040516101509190612366565b3480156101b457600080fd5b506101796101c3366004611d63565b61042c565b3480156101d457600080fd5b506101e86101e3366004611e08565b6104a1565b005b3480156101f657600080fd5b506101ff61051f565b60405161015091906123a0565b34801561021857600080fd5b50610179610227366004611ddf565b610528565b34801561023857600080fd5b506101e8610247366004611d9e565b610577565b34801561025857600080fd5b5061026c610267366004611d31565b610a71565b60405161015092919061236f565b34801561028657600080fd5b5061019b610295366004611d10565b610aa4565b3480156102a657600080fd5b506101e86102b5366004611d31565b610ac3565b3480156102c657600080fd5b5061019b6102d5366004611d10565b610d82565b3480156102e657600080fd5b50610143610e64565b3480156102fb57600080fd5b5061019b61030a366004611d10565b610e73565b34801561031b57600080fd5b5061017961032a366004611ddf565b610e8e565b34801561033b57600080fd5b5061017961034a366004611ddf565b610edd565b6101e8610ef1565b34801561036357600080fd5b5061019b610372366004611d31565b610efd565b60606003805461038690612568565b80601f01602080910402602001604051908101604052809291908181526020018280546103b290612568565b80156103ff5780601f106103d4576101008083540402835291602001916103ff565b820191906000526020600020905b8154815290600101906020018083116103e257829003601f168201915b5050505050905090565b600061041d610416610f28565b8484610f2c565b50600192915050565b60025490565b6000610439848484610fe0565b61049784610445610f28565b6001600160a01b03871660009081526001602052604081208691610467610f28565b6001600160a01b03166001600160a01b03168152602001908152602001600020546104929190612551565b610f2c565b5060019392505050565b6104aa336110dd565b6104b3336110f2565b806104bd33610e73565b10156104e45760405162461bcd60e51b81526004016104db90611f56565b60405180910390fd5b6104ee3382611112565b604051339082156108fc029083906000818181858888f1935050505015801561051b573d6000803e3d6000fd5b5050565b60055460ff1690565b600061041d610535610f28565b848460016000610543610f28565b6001600160a01b03908116825260208083019390935260409182016000908120918b16815292529020546104929190612406565b336001600160a01b0385161461059f5760405162461bcd60e51b81526004016104db90612010565b600082116105bf5760405162461bcd60e51b81526004016104db90612218565b600081116105df5760405162461bcd60e51b81526004016104db90612101565b818110156105ff5760405162461bcd60e51b81526004016104db90611ef9565b8061060985610e73565b10156106275760405162461bcd60e51b81526004016104db9061206d565b610630846110dd565b610639836110dd565b610642846110f2565b61064b836110f2565b60006001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff16600481111561069857634e487b7160e01b600052602160045260246000fd5b141561096b57806106a885610aa4565b10156106c65760405162461bcd60e51b81526004016104db9061206d565b60006106d2838361241e565b6106dc9043612406565b905060006040518060e00160405280858152602001848152602001438152602001838152602001438152602001600081526020016001600481111561073157634e487b7160e01b600052602160045260246000fd5b81525090508060086000886001600160a01b03166001600160a01b031681526020019081526020016000206000876001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff021916908360048111156107f357634e487b7160e01b600052602160045260246000fd5b021790555050506001600160a01b038087166000818152600960209081526040808320805460018181018355918552838520018054968c167fffffffffffffffffffffffff000000000000000000000000000000000000000097881681179091558452600a83528184208054918201815584528284200180549095168417909455918152600690915290812060028101805491928792610894908490612406565b92505081905550838160030160008282546108af9190612406565b909155506108bf90508785611122565b6001600160a01b03861660009081526006602052604081208054909187918391906108eb908490612406565b92505081905550848160010160008282546109069190612406565b9250508190555085876001600160a01b0316896001600160a01b03167f85a280fa73d3bdba5df88810bde586236355971cf5a2bbe2b1310defd19f9fd188438943600060405161095a95949392919061237d565b60405180910390a450505050610a6b565b60016001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff1660048111156109b857634e487b7160e01b600052602160045260246000fd5b1415610a6b576001600160a01b0380851660009081526008602090815260408083209387168352929052908120906109f0848461241e565b82600201546109ff9190612406565b6003830181905584835560018301849055600583015460405191925085916001600160a01b0380891692908a16917f8bacafa91352806741cd783f03a264fc3c859431725daf276516389e261ad5a591610a6091899143918991839161237d565b60405180910390a450505b50505050565b6001600160a01b039182166000908152600860209081526040808320939094168252919091522080546001909101549091565b6001600160a01b0381166000908152602081905260409020545b919050565b336001600160a01b03831614610aeb5760405162461bcd60e51b81526004016104db906120a4565b60016001600160a01b0380841660009081526008602090815260408083209386168352929052206006015460ff166004811115610b3857634e487b7160e01b600052602160045260246000fd5b14610b555760405162461bcd60e51b81526004016104db906122d2565b610b5e826110dd565b610b67816110dd565b610b70826110f2565b610b79816110f2565b6001600160a01b03828116600081815260086020908152604080832094861683529381528382206006808201805460ff1916600317905590549383529052918220600201805491929091610bce908490612551565b90915550506001600160a01b03808316600081815260086020908152604080832094861683529381528382206001015492825260069052918220600301805491929091610c1c908490612551565b90915550506001600160a01b03828116600090815260086020908152604080832093851683529290529081206005810154600190910154610c5d9190612551565b9050610c698382611166565b6001600160a01b03808416600090815260086020908152604080832093861683529281528282205460069091529181208054909190610ca9908490612551565b90915550506001600160a01b038084166000908152600860209081526040808320938616835292815282822060019081015460069092529282209092018054909190610cf6908490612551565b90915550506001600160a01b0383811660008181526008602090815260408083209487168084529490915290819020805460018201546002830154600384015460048501546005909501549551939796957ff42fb6ba415bf1f050f252edc251c980fee68059aca0e9dbe693ae490ae885bc95610d759590919061237d565b60405180910390a4505050565b6001600160a01b0381166000908152600660209081526040808320815160a081018352815481526001820154938101939093526002810154918301919091526003810154606083015260040154608082015281610dde8461118a565b90506000610deb8561132b565b90506000610df983836124f9565b9050600084604001518560000151610e1191906124f9565b90506000856080015143610e259190612551565b90506000610e33828461243e565b905060008482610e428c610aa4565b610e4c91906123ae565b610e5691906123ae565b9a9950505050505050505050565b60606004805461038690612568565b6001600160a01b031660009081526007602052604090205490565b600061041d610e9b610f28565b848460016000610ea9610f28565b6001600160a01b03908116825260208083019390935260409182016000908120918b16815292529020546104929190612551565b600061041d610eea610f28565b8484610fe0565b610efb33346114c6565b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b038316610f525760405162461bcd60e51b81526004016104db90612275565b6001600160a01b038216610f785760405162461bcd60e51b81526004016104db90611fb3565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610fd3908590612366565b60405180910390a3505050565b6001600160a01b0383166110065760405162461bcd60e51b81526004016104db906121bb565b6001600160a01b03821661102c5760405162461bcd60e51b81526004016104db90611e9c565b6110378383836114da565b6001600160a01b03831660009081526020819052604090205461105b908290612551565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461108b908290612406565b6001600160a01b0380841660008181526020819052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610fd3908590612366565b6110e6816114df565b6110ef816116d8565b50565b6001600160a01b0316600090815260066020526040902043600490910155565b61111c82826118ca565b61051b82825b6001600160a01b038216600090815260076020526040902054611146908290612551565b6001600160a01b0390921660009081526007602052604090209190915550565b6001600160a01b038216600090815260076020526040902054611146908290612406565b600080805b6001600160a01b0384166000908152600a6020526040902054811015611324576001600160a01b0384166000908152600a602052604081208054839081106111e757634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928a168552918352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff169081111561128857634e487b7160e01b600052602160045260246000fd5b60048111156112a757634e487b7160e01b600052602160045260246000fd5b905250905060018160c0015160048111156112d257634e487b7160e01b600052602160045260246000fd5b1480156112e25750806060015143115b1561130f5760608101516112f69043612551565b815161130291906124da565b61130c9085612406565b93505b5050808061131c906125a3565b91505061118f565b5092915050565b600080805b6001600160a01b038416600090815260096020526040902054811015611324576001600160a01b038416600090815260096020526040812080548390811061138857634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03888116845260088352604080852091909216808552908352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff169081111561142a57634e487b7160e01b600052602160045260246000fd5b600481111561144957634e487b7160e01b600052602160045260246000fd5b905250905060018160c00151600481111561147457634e487b7160e01b600052602160045260246000fd5b1480156114845750806060015143115b156114b15760608101516114989043612551565b81516114a491906124da565b6114ae9085612406565b93505b505080806114be906125a3565b915050611330565b6114d08282611994565b61051b8282611166565b505050565b6001600160a01b0381166000908152600960205260408120544391808267ffffffffffffffff81111561152257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561154b578160200160208202803683370190505b50905060005b6001600160a01b0386166000908152600960205260409020548110156116a6576001600160a01b03861660009081526009602052604081208054839081106115a957634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b038a811684526008835260408085209190921680855292529091209091506003600682015460ff16600481111561160557634e487b7160e01b600052602160045260246000fd5b1415611612575050611694565b80600301548711156116305761162b8189846000611a4a565b611688565b61163b818984611c03565b818486611647816125a3565b97508151811061166757634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b611691826110f2565b50505b8061169e816125a3565b915050611551565b506001600160a01b038516600090815260096020908152604090912082516116d092840190611c67565b505050505050565b6001600160a01b0381166000908152600a60205260408120544391808267ffffffffffffffff81111561171b57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611744578160200160208202803683370190505b50905060005b6001600160a01b0386166000908152600a60205260409020548110156118a0576001600160a01b0386166000908152600a602052604081208054839081106117a257634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928c168552919092529091209091506003600682015460ff1660048111156117ff57634e487b7160e01b600052602160045260246000fd5b141561180c57505061188e565b806003015487111561182a5761182581838a6001611a4a565b611882565b61183581838a611c03565b818486611841816125a3565b97508151811061186157634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b61188b826110f2565b50505b80611898816125a3565b91505061174a565b506001600160a01b0385166000908152600a6020908152604090912082516116d092840190611c67565b6001600160a01b0382166118f05760405162461bcd60e51b81526004016104db9061215e565b6118fc826000836114da565b6001600160a01b038216600090815260208190526040902054611920908290612551565b6001600160a01b038316600090815260208190526040902055600254611947908290612551565b6002556040516000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611988908590612366565b60405180910390a35050565b6001600160a01b0382166119ba5760405162461bcd60e51b81526004016104db9061232f565b6119c6600083836114da565b806002546119d49190612406565b6002556001600160a01b0382166000908152602081905260409020546119fb908290612406565b6001600160a01b0383166000818152602081905260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611988908590612366565b600084600401548560030154611a609190612551565b905080611a6d5750610a6b565b84546002860154600387015460009291611a8691612551565b611a9091906124da565b8660010154611a9f9190612551565b8654611aab90846124da565b611ab59190612406565b9050611ac2858583610fe0565b611acc8482611166565b8560030154866004018190555080866005016000828254611aed9190612406565b909155505060068601805460ff1916600417905560018381811115611b2257634e487b7160e01b600052602160045260246000fd5b1415611b945785546001600160a01b03851660009081526006602052604081208054909190611b52908490612551565b90915550506001808701546001600160a01b0386166000908152600660205260408120909201805491929091611b89908490612551565b909155506116d09050565b85546001600160a01b03861660009081526006602052604081206002018054909190611bc1908490612551565b909155505060018601546001600160a01b03861660009081526006602052604081206003018054909190611bf6908490612551565b9091555050505050505050565b6000836004015443611c159190612551565b8454909150600090611c2790836124da565b9050611c34848483610fe0565b611c3e8382611166565b43856004018190555080856005016000828254611c5b9190612406565b90915550505050505050565b828054828255906000526020600020908101928215611cd4579160200282015b82811115611cd457825182547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03909116178255602090920191600190910190611c87565b50611ce0929150611ce4565b5090565b5b80821115611ce05760008155600101611ce5565b80356001600160a01b0381168114610abe57600080fd5b600060208284031215611d21578081fd5b611d2a82611cf9565b9392505050565b60008060408385031215611d43578081fd5b611d4c83611cf9565b9150611d5a60208401611cf9565b90509250929050565b600080600060608486031215611d77578081fd5b611d8084611cf9565b9250611d8e60208501611cf9565b9150604084013590509250925092565b60008060008060808587031215611db3578081fd5b611dbc85611cf9565b9350611dca60208601611cf9565b93969395505050506040820135916060013590565b60008060408385031215611df1578182fd5b611dfa83611cf9565b946020939093013593505050565b600060208284031215611e19578081fd5b5035919050565b901515815260200190565b6000602080835283518082850152825b81811015611e5757858101830151858201604001528201611e3b565b81811115611e685783604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201527f6573730000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526039908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e206f7220657175616c20746f2074686520726174652e00000000000000606082015260800190565b6020808252602f908201527f52657175657374656420616d6f756e74206c6172676572207468616e2061766160408201527f696c61626c652062616c616e63652e0000000000000000000000000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560408201527f7373000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526030908201527f4f6e6c79207468652061646472657373206f776e65722063616e20737461727460408201527f206120737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526015908201527f496e73756666696369656e742062616c616e63652e0000000000000000000000604082015260600190565b60208082526030908201527f4f6e6c792074686520737562736372696265722063616e2063616e63656c207460408201527f686520737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526026908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e20302e0000000000000000000000000000000000000000000000000000606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360408201527f7300000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460408201527f6472657373000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602d908201527f54686520737562736372697074696f6e2072617465206d75737420626520677260408201527f6561746572207468616e20302e00000000000000000000000000000000000000606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460408201527f7265737300000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602a908201527f4f6e6c792061637469766520737562736372697074696f6e732063616e20626560408201527f2063616e63656c65642e00000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b918252602082015260400190565b948552602085019390935260408401919091526060830152608082015260a00190565b60ff91909116815260200190565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038413811516156123e8576123e86125be565b82600160ff1b038412811615612400576124006125be565b50500190565b60008219821115612419576124196125be565b500190565b60008261243957634e487b7160e01b81526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8184138284138583048511828216161561247d5761247d6125be565b600160ff1b8487128682058812818416161561249b5761249b6125be565b8587129250878205871284841616156124b6576124b66125be565b878505871281841616156124cc576124cc6125be565b505050929093029392505050565b60008160001904831182151516156124f4576124f46125be565b500290565b600080831283600160ff1b01831281151615612517576125176125be565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831381161561254b5761254b6125be565b50500390565b600082821015612563576125636125be565b500390565b60028104600182168061257c57607f821691505b6020821081141561259d57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156125b7576125b76125be565b5060010190565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220f74223f304687c77cecf62e799dcec03d123e8cc04793fe5ed58d5feaf30c85a64736f6c63430008000033";
