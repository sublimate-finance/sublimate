/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IStreamableERC20Interface extends ethers.utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "cancelSubscription(address,address)": FunctionFragment;
    "getSubscription(address,address)": FunctionFragment;
    "lastUpdatedBalanceOf(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "updateSubscription(address,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "cancelSubscription",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubscription",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdatedBalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSubscription",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastUpdatedBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSubscription",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "SubscriptionCanceled(address,address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "SubscriptionStarted(address,address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "SubscriptionUpdated(address,address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
    "UserStatusChanged(address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserStatusChanged"): EventFragment;
}

export class IStreamableERC20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IStreamableERC20Interface;

  functions: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    cancelSubscription(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getSubscription(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        rate: BigNumber;
        maxAmount: BigNumber;
        startBlock: BigNumber;
        endBlock: BigNumber;
        amountPaid: BigNumber;
        status: number;
      }
    >;

    "getSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        rate: BigNumber;
        maxAmount: BigNumber;
        startBlock: BigNumber;
        endBlock: BigNumber;
        amountPaid: BigNumber;
        status: number;
      }
    >;

    lastUpdatedBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "lastUpdatedBalanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    "totalSupply()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    updateSubscription(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "updateSubscription(address,address,uint256,uint256)"(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "allowance(address,address)"(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approve(address,uint256)"(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  "balanceOf(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cancelSubscription(
    from: string,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelSubscription(address,address)"(
    from: string,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getSubscription(
    from: string,
    to: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
      rate: BigNumber;
      maxAmount: BigNumber;
      startBlock: BigNumber;
      endBlock: BigNumber;
      amountPaid: BigNumber;
      status: number;
    }
  >;

  "getSubscription(address,address)"(
    from: string,
    to: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
      rate: BigNumber;
      maxAmount: BigNumber;
      startBlock: BigNumber;
      endBlock: BigNumber;
      amountPaid: BigNumber;
      status: number;
    }
  >;

  lastUpdatedBalanceOf(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "lastUpdatedBalanceOf(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferFrom(address,address,uint256)"(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  updateSubscription(
    from: string,
    to: string,
    rate: BigNumberish,
    maxAmount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "updateSubscription(address,address,uint256,uint256)"(
    from: string,
    to: string,
    rate: BigNumberish,
    maxAmount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelSubscription(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getSubscription(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        rate: BigNumber;
        maxAmount: BigNumber;
        startBlock: BigNumber;
        endBlock: BigNumber;
        amountPaid: BigNumber;
        status: number;
      }
    >;

    "getSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        rate: BigNumber;
        maxAmount: BigNumber;
        startBlock: BigNumber;
        endBlock: BigNumber;
        amountPaid: BigNumber;
        status: number;
      }
    >;

    lastUpdatedBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastUpdatedBalanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateSubscription(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "updateSubscription(address,address,uint256,uint256)"(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Approval(
      owner: string | null,
      spender: string | null,
      value: null
    ): EventFilter;

    SubscriptionCanceled(
      from: string | null,
      to: string | null,
      rate: null,
      maxAmount: null,
      startBlock: null,
      endBlock: null,
      lastTransferAtBlock: BigNumberish | null,
      amountPaid: null
    ): EventFilter;

    SubscriptionStarted(
      from: string | null,
      to: string | null,
      rate: null,
      maxAmount: null,
      startBlock: null,
      endBlock: null,
      lastTransferAtBlock: BigNumberish | null,
      amountPaid: null
    ): EventFilter;

    SubscriptionUpdated(
      from: string | null,
      to: string | null,
      rate: null,
      maxAmount: null,
      startBlock: null,
      endBlock: null,
      lastTransferAtBlock: BigNumberish | null,
      amountPaid: null
    ): EventFilter;

    Transfer(from: string | null, to: string | null, value: null): EventFilter;

    UserStatusChanged(
      account: string | null,
      incomingRate: BigNumberish | null,
      totalMaxIncomingAmount: null,
      outgoingRate: null,
      totalMaxOutgoingAmount: null,
      blockAtLastUpdate: BigNumberish | null,
      balance: null,
      availableBalance: null
    ): EventFilter;
  };

  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelSubscription(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getSubscription(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastUpdatedBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastUpdatedBalanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    updateSubscription(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "updateSubscription(address,address,uint256,uint256)"(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowance(address,address)"(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approve(address,uint256)"(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelSubscription(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getSubscription(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSubscription(address,address)"(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastUpdatedBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lastUpdatedBalanceOf(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transfer(address,uint256)"(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferFrom(address,address,uint256)"(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    updateSubscription(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "updateSubscription(address,address,uint256,uint256)"(
      from: string,
      to: string,
      rate: BigNumberish,
      maxAmount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
