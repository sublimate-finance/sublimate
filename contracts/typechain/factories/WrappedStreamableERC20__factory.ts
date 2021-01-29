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
        indexed: true,
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
        indexed: true,
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
        indexed: true,
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
        indexed: true,
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
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
      },
      {
        internalType: "enum IStreamableERC20.SubscriptionStatus",
        name: "status",
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
  "0x60806040523480156200001157600080fd5b5060405162002b9438038062002b948339810160408190526200003491620001d2565b8181818181600390805190602001906200005092919062000081565b5080516200006690600490602084019062000081565b50506005805460ff19166012179055506200028c9350505050565b8280546200008f9062000239565b90600052602060002090601f016020900481019282620000b35760008555620000fe565b82601f10620000ce57805160ff1916838001178555620000fe565b82800160010185558215620000fe579182015b82811115620000fe578251825591602001919060010190620000e1565b506200010c92915062000110565b5090565b5b808211156200010c576000815560010162000111565b600082601f83011262000138578081fd5b81516001600160401b038082111562000155576200015562000276565b6040516020601f8401601f19168201810183811183821017156200017d576200017d62000276565b604052838252858401810187101562000194578485fd5b8492505b83831015620001b7578583018101518284018201529182019162000198565b83831115620001c857848185840101525b5095945050505050565b60008060408385031215620001e5578182fd5b82516001600160401b0380821115620001fc578384fd5b6200020a8683870162000127565b9350602085015191508082111562000220578283fd5b506200022f8582860162000127565b9150509250929050565b6002810460018216806200024e57607f821691505b602082108114156200027057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6128f8806200029c6000396000f3fe6080604052600436106101295760003560e01c806370a08231116100a5578063a0821be311610074578063a9059cbb11610059578063a9059cbb14610333578063d0e30db014610353578063dd62ed3e1461035b57610129565b8063a0821be3146102f3578063a457c2d71461031357610129565b806370a082311461027e5780637946677b1461029e57806391b70212146102be57806395d89b41146102de57610129565b80632e1a7d4d116100fc57806339509351116100e1578063395093511461020c5780635b0f7c541461022c5780635b75dd8d1461024c57610129565b80632e1a7d4d146101c8578063313ce567146101ea57610129565b806306fdde031461012e578063095ea7b31461015957806318160ddd1461018657806323b872dd146101a8575b600080fd5b34801561013a57600080fd5b5061014361037b565b604051610150919061209e565b60405180910390f35b34801561016557600080fd5b50610179610174366004612052565b61040d565b6040516101509190612093565b34801561019257600080fd5b5061019b61042a565b6040516101509190612610565b3480156101b457600080fd5b506101796101c3366004611fd6565b610430565b3480156101d457600080fd5b506101e86101e336600461207b565b6104a5565b005b3480156101f657600080fd5b506101ff610523565b604051610150919061268e565b34801561021857600080fd5b50610179610227366004612052565b61052c565b34801561023857600080fd5b506101e8610247366004612011565b61057b565b34801561025857600080fd5b5061026c610267366004611fa4565b610ca8565b6040516101509695949392919061263c565b34801561028a57600080fd5b5061019b610299366004611f83565b610cfb565b3480156102aa57600080fd5b506101e86102b9366004611fa4565b610d1a565b3480156102ca57600080fd5b5061019b6102d9366004611f83565b610fd9565b3480156102ea57600080fd5b506101436110bb565b3480156102ff57600080fd5b5061019b61030e366004611f83565b6110ca565b34801561031f57600080fd5b5061017961032e366004612052565b6110e5565b34801561033f57600080fd5b5061017961034e366004612052565b611134565b6101e8611148565b34801561036757600080fd5b5061019b610376366004611fa4565b611154565b60606003805461038a90612856565b80601f01602080910402602001604051908101604052809291908181526020018280546103b690612856565b80156104035780601f106103d857610100808354040283529160200191610403565b820191906000526020600020905b8154815290600101906020018083116103e657829003601f168201915b5050505050905090565b600061042161041a61117f565b8484611183565b50600192915050565b60025490565b600061043d848484611237565b61049b8461044961117f565b6001600160a01b0387166000908152600160205260408120869161046b61117f565b6001600160a01b03166001600160a01b0316815260200190815260200160002054610496919061283f565b611183565b5060019392505050565b6104ae33611334565b6104b733611349565b806104c1336110ca565b10156104e85760405162461bcd60e51b81526004016104df906121c9565b60405180910390fd5b6104f23382611369565b604051339082156108fc029083906000818181858888f1935050505015801561051f573d6000803e3d6000fd5b5050565b60055460ff1690565b600061042161053961117f565b84846001600061054761117f565b6001600160a01b03908116825260208083019390935260409182016000908120918b168152925290205461049691906126f4565b336001600160a01b038516146105a35760405162461bcd60e51b81526004016104df90612283565b600082116105c35760405162461bcd60e51b81526004016104df9061248b565b600081116105e35760405162461bcd60e51b81526004016104df90612374565b818110156106035760405162461bcd60e51b81526004016104df9061216c565b60006001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff16600481111561065057634e487b7160e01b600052602160045260246000fd5b141561067e5780610660856110ca565b101561067e5760405162461bcd60e51b81526004016104df906122e0565b61068784611334565b61069083611334565b61069984611349565b6106a283611349565b806106ac85610cfb565b10156106ca5760405162461bcd60e51b81526004016104df906122e0565b60006001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff16600481111561071757634e487b7160e01b600052602160045260246000fd5b14156109c2576000610729838361270c565b61073390436126f4565b905060006040518060e00160405280858152602001848152602001438152602001838152602001438152602001600081526020016001600481111561078857634e487b7160e01b600052602160045260246000fd5b81525090508060086000886001600160a01b03166001600160a01b031681526020019081526020016000206000876001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301556080820151816004015560a0820151816005015560c08201518160060160006101000a81548160ff0219169083600481111561084a57634e487b7160e01b600052602160045260246000fd5b021790555050506001600160a01b038087166000818152600960209081526040808320805460018181018355918552838520018054968c167fffffffffffffffffffffffff000000000000000000000000000000000000000097881681179091558452600a835281842080549182018155845282842001805490951684179094559181526006909152908120600281018054919287926108eb9084906126f4565b925050819055508381600301600082825461090691906126f4565b9091555061091690508785611379565b6001600160a01b03861660009081526006602052604081208054909187918391906109429084906126f4565b925050819055508481600101600082825461095d91906126f4565b9250508190555043876001600160a01b0316896001600160a01b03167f85a280fa73d3bdba5df88810bde586236355971cf5a2bbe2b1310defd19f9fd18989438a60006040516109b1959493929190612619565b60405180910390a450505050610ca2565b60016001600160a01b0380861660009081526008602090815260408083209388168352929052206006015460ff166004811115610a0f57634e487b7160e01b600052602160045260246000fd5b1415610ca2576001600160a01b038085166000908152600860209081526040808320938716835292905290812090610a47848461270c565b610a5190436126f4565b9050438111610a725760405162461bcd60e51b81526004016104df906125d9565b600082600501548360010154610a88919061283f565b90506000836005015485610a9c919061283f565b6001600160a01b038916600090815260076020526040812054919250908290610ac690859061283f565b610ad091906126f4565b90508460010154861115610b065780610ae88a610cfb565b1015610b065760405162461bcd60e51b81526004016104df906122e0565b610b1089826113bd565b6001600160a01b0389166000908152600660205260408120865460028201805492939192909190610b4290849061283f565b9250508190555087816002016000828254610b5d91906126f4565b90915550506001860154600382018054600090610b7b90849061283f565b9250508190555086816003016000828254610b9691906126f4565b90915550506001600160a01b03891660009081526006602052604081208754815491929091839190610bc990849061283f565b9091555050805489908290600090610be29084906126f4565b925050819055508660010154816001016000828254610c01919061283f565b9250508190555087816001016000828254610c1c91906126f4565b92505081905550858760030181905550888760000181905550878760010181905550438a6001600160a01b03168c6001600160a01b03167f8bacafa91352806741cd783f03a264fc3c859431725daf276516389e261ad5a58c8c8c600201548c8e60050154604051610c92959493929190612619565b60405180910390a4505050505050505b50505050565b6001600160a01b039182166000908152600860209081526040808320939094168252919091522080546001820154600283015460038401546005850154600690950154939592949193909260ff90911690565b6001600160a01b0381166000908152602081905260409020545b919050565b336001600160a01b03831614610d425760405162461bcd60e51b81526004016104df90612317565b60016001600160a01b0380841660009081526008602090815260408083209386168352929052206006015460ff166004811115610d8f57634e487b7160e01b600052602160045260246000fd5b14610dac5760405162461bcd60e51b81526004016104df90612545565b610db582611334565b610dbe81611334565b610dc782611349565b610dd081611349565b6001600160a01b03828116600081815260086020908152604080832094861683529381528382206006808201805460ff1916600317905590549383529052918220600201805491929091610e2590849061283f565b90915550506001600160a01b03808316600081815260086020908152604080832094861683529381528382206001015492825260069052918220600301805491929091610e7390849061283f565b90915550506001600160a01b03828116600090815260086020908152604080832093851683529290529081206005810154600190910154610eb4919061283f565b9050610ec083826113d9565b6001600160a01b03808416600090815260086020908152604080832093861683529281528282205460069091529181208054909190610f0090849061283f565b90915550506001600160a01b038084166000908152600860209081526040808320938616835292815282822060019081015460069092529282209092018054909190610f4d90849061283f565b90915550506001600160a01b0383811660008181526008602090815260408083209487168084529490915290819020600481015481546001830154600284015460038501546005909501549551939796957ff42fb6ba415bf1f050f252edc251c980fee68059aca0e9dbe693ae490ae885bc95610fcc95909190612619565b60405180910390a4505050565b6001600160a01b0381166000908152600660209081526040808320815160a081018352815481526001820154938101939093526002810154918301919091526003810154606083015260040154608082015281611035846113fd565b905060006110428561159e565b9050600061105083836127e7565b905060008460400151856000015161106891906127e7565b9050600085608001514361107c919061283f565b9050600061108a828461272c565b9050600084826110998c610cfb565b6110a3919061269c565b6110ad919061269c565b9a9950505050505050505050565b60606004805461038a90612856565b6001600160a01b031660009081526007602052604090205490565b60006104216110f261117f565b84846001600061110061117f565b6001600160a01b03908116825260208083019390935260409182016000908120918b1681529252902054610496919061283f565b600061042161114161117f565b8484611237565b6111523334611739565b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166111a95760405162461bcd60e51b81526004016104df906124e8565b6001600160a01b0382166111cf5760405162461bcd60e51b81526004016104df90612226565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061122a908590612610565b60405180910390a3505050565b6001600160a01b03831661125d5760405162461bcd60e51b81526004016104df9061242e565b6001600160a01b0382166112835760405162461bcd60e51b81526004016104df9061210f565b61128e83838361174d565b6001600160a01b0383166000908152602081905260409020546112b290829061283f565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546112e29082906126f4565b6001600160a01b0380841660008181526020819052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061122a908590612610565b61133d81611752565b6113468161194b565b50565b6001600160a01b0316600090815260066020526040902043600490910155565b6113738282611b3d565b61051f82825b6001600160a01b03821660009081526007602052604090205461139d90829061283f565b6001600160a01b0390921660009081526007602052604090209190915550565b6001600160a01b03909116600090815260076020526040902055565b6001600160a01b03821660009081526007602052604090205461139d9082906126f4565b600080805b6001600160a01b0384166000908152600a6020526040902054811015611597576001600160a01b0384166000908152600a6020526040812080548390811061145a57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928a168552918352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff16908111156114fb57634e487b7160e01b600052602160045260246000fd5b600481111561151a57634e487b7160e01b600052602160045260246000fd5b905250905060018160c00151600481111561154557634e487b7160e01b600052602160045260246000fd5b1480156115555750806060015143115b15611582576060810151611569904361283f565b815161157591906127c8565b61157f90856126f4565b93505b5050808061158f90612891565b915050611402565b5092915050565b600080805b6001600160a01b038416600090815260096020526040902054811015611597576001600160a01b03841660009081526009602052604081208054839081106115fb57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03888116845260088352604080852091909216808552908352818420825160e08101845281548152600182015494810194909452600281015492840192909252600382015460608401526004808301546080850152600583015460a0850152600683015491955060c084019160ff169081111561169d57634e487b7160e01b600052602160045260246000fd5b60048111156116bc57634e487b7160e01b600052602160045260246000fd5b905250905060018160c0015160048111156116e757634e487b7160e01b600052602160045260246000fd5b1480156116f75750806060015143115b1561172457606081015161170b904361283f565b815161171791906127c8565b61172190856126f4565b93505b5050808061173190612891565b9150506115a3565b6117438282611c07565b61051f82826113d9565b505050565b6001600160a01b0381166000908152600960205260408120544391808267ffffffffffffffff81111561179557634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156117be578160200160208202803683370190505b50905060005b6001600160a01b038616600090815260096020526040902054811015611919576001600160a01b038616600090815260096020526040812080548390811061181c57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b038a811684526008835260408085209190921680855292529091209091506003600682015460ff16600481111561187857634e487b7160e01b600052602160045260246000fd5b1415611885575050611907565b80600301548711156118a35761189e8189846000611cbd565b6118fb565b6118ae818984611e76565b8184866118ba81612891565b9750815181106118da57634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b61190482611349565b50505b8061191181612891565b9150506117c4565b506001600160a01b0385166000908152600960209081526040909120825161194392840190611eda565b505050505050565b6001600160a01b0381166000908152600a60205260408120544391808267ffffffffffffffff81111561198e57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156119b7578160200160208202803683370190505b50905060005b6001600160a01b0386166000908152600a6020526040902054811015611b13576001600160a01b0386166000908152600a60205260408120805483908110611a1557634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03908116808452600883526040808520928c168552919092529091209091506003600682015460ff166004811115611a7257634e487b7160e01b600052602160045260246000fd5b1415611a7f575050611b01565b8060030154871115611a9d57611a9881838a6001611cbd565b611af5565b611aa881838a611e76565b818486611ab481612891565b975081518110611ad457634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b0316815250505b611afe82611349565b50505b80611b0b81612891565b9150506119bd565b506001600160a01b0385166000908152600a60209081526040909120825161194392840190611eda565b6001600160a01b038216611b635760405162461bcd60e51b81526004016104df906123d1565b611b6f8260008361174d565b6001600160a01b038216600090815260208190526040902054611b9390829061283f565b6001600160a01b038316600090815260208190526040902055600254611bba90829061283f565b6002556040516000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611bfb908590612610565b60405180910390a35050565b6001600160a01b038216611c2d5760405162461bcd60e51b81526004016104df906125a2565b611c396000838361174d565b80600254611c4791906126f4565b6002556001600160a01b038216600090815260208190526040902054611c6e9082906126f4565b6001600160a01b0383166000818152602081905260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90611bfb908590612610565b600084600401548560030154611cd3919061283f565b905080611ce05750610ca2565b84546002860154600387015460009291611cf99161283f565b611d0391906127c8565b8660010154611d12919061283f565b8654611d1e90846127c8565b611d2891906126f4565b9050611d35858583611237565b611d3f84826113d9565b8560030154866004018190555080866005016000828254611d6091906126f4565b909155505060068601805460ff1916600417905560018381811115611d9557634e487b7160e01b600052602160045260246000fd5b1415611e075785546001600160a01b03851660009081526006602052604081208054909190611dc590849061283f565b90915550506001808701546001600160a01b0386166000908152600660205260408120909201805491929091611dfc90849061283f565b909155506119439050565b85546001600160a01b03861660009081526006602052604081206002018054909190611e3490849061283f565b909155505060018601546001600160a01b03861660009081526006602052604081206003018054909190611e6990849061283f565b9091555050505050505050565b6000836004015443611e88919061283f565b8454909150600090611e9a90836127c8565b9050611ea7848483611237565b611eb183826113d9565b43856004018190555080856005016000828254611ece91906126f4565b90915550505050505050565b828054828255906000526020600020908101928215611f47579160200282015b82811115611f4757825182547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03909116178255602090920191600190910190611efa565b50611f53929150611f57565b5090565b5b80821115611f535760008155600101611f58565b80356001600160a01b0381168114610d1557600080fd5b600060208284031215611f94578081fd5b611f9d82611f6c565b9392505050565b60008060408385031215611fb6578081fd5b611fbf83611f6c565b9150611fcd60208401611f6c565b90509250929050565b600080600060608486031215611fea578081fd5b611ff384611f6c565b925061200160208501611f6c565b9150604084013590509250925092565b60008060008060808587031215612026578081fd5b61202f85611f6c565b935061203d60208601611f6c565b93969395505050506040820135916060013590565b60008060408385031215612064578182fd5b61206d83611f6c565b946020939093013593505050565b60006020828403121561208c578081fd5b5035919050565b901515815260200190565b6000602080835283518082850152825b818110156120ca578581018301518582016040015282016120ae565b818111156120db5783604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201527f6573730000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526039908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e206f7220657175616c20746f2074686520726174652e00000000000000606082015260800190565b6020808252602f908201527f52657175657374656420616d6f756e74206c6172676572207468616e2061766160408201527f696c61626c652062616c616e63652e0000000000000000000000000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560408201527f7373000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526030908201527f4f6e6c79207468652061646472657373206f776e65722063616e20737461727460408201527f206120737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526015908201527f496e73756666696369656e742062616c616e63652e0000000000000000000000604082015260600190565b60208082526030908201527f4f6e6c792074686520737562736372696265722063616e2063616e63656c207460408201527f686520737562736372697074696f6e2e00000000000000000000000000000000606082015260800190565b60208082526026908201527f546865206d617820616d6f756e74206d7573742062652067726561746572207460408201527f68616e20302e0000000000000000000000000000000000000000000000000000606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360408201527f7300000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460408201527f6472657373000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602d908201527f54686520737562736372697074696f6e2072617465206d75737420626520677260408201527f6561746572207468616e20302e00000000000000000000000000000000000000606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460408201527f7265737300000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602a908201527f4f6e6c792061637469766520737562736372697074696f6e732063616e20626560408201527f2063616e63656c65642e00000000000000000000000000000000000000000000606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b6020808252601c908201527f54686520737562736372697074696f6e20697320657870697265642e00000000604082015260600190565b90815260200190565b948552602085019390935260408401919091526060830152608082015260a00190565b600060c0820190508782528660208301528560408301528460608301528360808301526005831061267d57634e487b7160e01b600052602160045260246000fd5b8260a0830152979650505050505050565b60ff91909116815260200190565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038413811516156126d6576126d66128ac565b82600160ff1b0384128116156126ee576126ee6128ac565b50500190565b60008219821115612707576127076128ac565b500190565b60008261272757634e487b7160e01b81526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8184138284138583048511828216161561276b5761276b6128ac565b600160ff1b84871286820588128184161615612789576127896128ac565b8587129250878205871284841616156127a4576127a46128ac565b878505871281841616156127ba576127ba6128ac565b505050929093029392505050565b60008160001904831182151516156127e2576127e26128ac565b500290565b600080831283600160ff1b01831281151615612805576128056128ac565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018313811615612839576128396128ac565b50500390565b600082821015612851576128516128ac565b500390565b60028104600182168061286a57607f821691505b6020821081141561288b57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156128a5576128a56128ac565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212207f8b1455087ac5c277275bcdd55bc6e757feda04bcfd1cec8e3af1f727690cf264736f6c63430008000033";
