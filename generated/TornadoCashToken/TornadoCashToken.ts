// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Delegated extends ethereum.Event {
  get params(): Delegated__Params {
    return new Delegated__Params(this);
  }
}

export class Delegated__Params {
  _event: Delegated;

  constructor(event: Delegated) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ProposalCreated extends ethereum.Event {
  get params(): ProposalCreated__Params {
    return new ProposalCreated__Params(this);
  }
}

export class ProposalCreated__Params {
  _event: ProposalCreated;

  constructor(event: ProposalCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get startTime(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get description(): string {
    return this._event.parameters[5].value.toString();
  }
}

export class ProposalExecuted extends ethereum.Event {
  get params(): ProposalExecuted__Params {
    return new ProposalExecuted__Params(this);
  }
}

export class ProposalExecuted__Params {
  _event: ProposalExecuted;

  constructor(event: ProposalExecuted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class RewardUpdateFailed extends ethereum.Event {
  get params(): RewardUpdateFailed__Params {
    return new RewardUpdateFailed__Params(this);
  }
}

export class RewardUpdateFailed__Params {
  _event: RewardUpdateFailed;

  constructor(event: RewardUpdateFailed) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get errorData(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class RewardUpdateSuccessful extends ethereum.Event {
  get params(): RewardUpdateSuccessful__Params {
    return new RewardUpdateSuccessful__Params(this);
  }
}

export class RewardUpdateSuccessful__Params {
  _event: RewardUpdateSuccessful;

  constructor(event: RewardUpdateSuccessful) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Undelegated extends ethereum.Event {
  get params(): Undelegated__Params {
    return new Undelegated__Params(this);
  }
}

export class Undelegated__Params {
  _event: Undelegated;

  constructor(event: Undelegated) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Voted extends ethereum.Event {
  get params(): Voted__Params {
    return new Voted__Params(this);
  }
}

export class Voted__Params {
  _event: Voted;

  constructor(event: Voted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get support(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get votes(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class TornadoCashToken__getReceiptResultValue0Struct extends ethereum.Tuple {
  get hasVoted(): boolean {
    return this[0].toBoolean();
  }

  get support(): boolean {
    return this[1].toBoolean();
  }

  get votes(): BigInt {
    return this[2].toBigInt();
  }
}

export class TornadoCashToken__proposalsResult {
  value0: Address;
  value1: Address;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: boolean;
  value7: boolean;

  constructor(
    value0: Address,
    value1: Address,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: boolean,
    value7: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    map.set("value7", ethereum.Value.fromBoolean(this.value7));
    return map;
  }
}

export class TornadoCashToken extends ethereum.SmartContract {
  static bind(address: Address): TornadoCashToken {
    return new TornadoCashToken("TornadoCashToken", address);
  }

  CLOSING_PERIOD(): BigInt {
    let result = super.call("CLOSING_PERIOD", "CLOSING_PERIOD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_CLOSING_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "CLOSING_PERIOD",
      "CLOSING_PERIOD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  EXECUTION_DELAY(): BigInt {
    let result = super.call(
      "EXECUTION_DELAY",
      "EXECUTION_DELAY():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_EXECUTION_DELAY(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "EXECUTION_DELAY",
      "EXECUTION_DELAY():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  EXECUTION_EXPIRATION(): BigInt {
    let result = super.call(
      "EXECUTION_EXPIRATION",
      "EXECUTION_EXPIRATION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_EXECUTION_EXPIRATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "EXECUTION_EXPIRATION",
      "EXECUTION_EXPIRATION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  PROPOSAL_THRESHOLD(): BigInt {
    let result = super.call(
      "PROPOSAL_THRESHOLD",
      "PROPOSAL_THRESHOLD():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_PROPOSAL_THRESHOLD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "PROPOSAL_THRESHOLD",
      "PROPOSAL_THRESHOLD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  QUORUM_VOTES(): BigInt {
    let result = super.call("QUORUM_VOTES", "QUORUM_VOTES():(uint256)", []);

    return result[0].toBigInt();
  }

  try_QUORUM_VOTES(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("QUORUM_VOTES", "QUORUM_VOTES():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  Staking(): Address {
    let result = super.call("Staking", "Staking():(address)", []);

    return result[0].toAddress();
  }

  try_Staking(): ethereum.CallResult<Address> {
    let result = super.tryCall("Staking", "Staking():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  VOTE_EXTEND_TIME(): BigInt {
    let result = super.call(
      "VOTE_EXTEND_TIME",
      "VOTE_EXTEND_TIME():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_VOTE_EXTEND_TIME(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "VOTE_EXTEND_TIME",
      "VOTE_EXTEND_TIME():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VOTING_DELAY(): BigInt {
    let result = super.call("VOTING_DELAY", "VOTING_DELAY():(uint256)", []);

    return result[0].toBigInt();
  }

  try_VOTING_DELAY(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("VOTING_DELAY", "VOTING_DELAY():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VOTING_PERIOD(): BigInt {
    let result = super.call("VOTING_PERIOD", "VOTING_PERIOD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_VOTING_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "VOTING_PERIOD",
      "VOTING_PERIOD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bulkResolve(domains: Array<Bytes>): Array<Address> {
    let result = super.call(
      "bulkResolve",
      "bulkResolve(bytes32[]):(address[])",
      [ethereum.Value.fromFixedBytesArray(domains)]
    );

    return result[0].toAddressArray();
  }

  try_bulkResolve(domains: Array<Bytes>): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "bulkResolve",
      "bulkResolve(bytes32[]):(address[])",
      [ethereum.Value.fromFixedBytesArray(domains)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  canWithdrawAfter(param0: Address): BigInt {
    let result = super.call(
      "canWithdrawAfter",
      "canWithdrawAfter(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_canWithdrawAfter(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "canWithdrawAfter",
      "canWithdrawAfter(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  checkIfQuorumReached(proposalId: BigInt): boolean {
    let result = super.call(
      "checkIfQuorumReached",
      "checkIfQuorumReached(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );

    return result[0].toBoolean();
  }

  try_checkIfQuorumReached(proposalId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkIfQuorumReached",
      "checkIfQuorumReached(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(proposalId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  delegatedTo(param0: Address): Address {
    let result = super.call("delegatedTo", "delegatedTo(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_delegatedTo(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "delegatedTo",
      "delegatedTo(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  gasCompensationVault(): Address {
    let result = super.call(
      "gasCompensationVault",
      "gasCompensationVault():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_gasCompensationVault(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "gasCompensationVault",
      "gasCompensationVault():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getReceipt(
    proposalId: BigInt,
    voter: Address
  ): TornadoCashToken__getReceiptResultValue0Struct {
    let result = super.call(
      "getReceipt",
      "getReceipt(uint256,address):((bool,bool,uint256))",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(voter)
      ]
    );

    return changetype<TornadoCashToken__getReceiptResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getReceipt(
    proposalId: BigInt,
    voter: Address
  ): ethereum.CallResult<TornadoCashToken__getReceiptResultValue0Struct> {
    let result = super.tryCall(
      "getReceipt",
      "getReceipt(uint256,address):((bool,bool,uint256))",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(voter)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<TornadoCashToken__getReceiptResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  hasAccountVoted(proposalId: BigInt, account: Address): boolean {
    let result = super.call(
      "hasAccountVoted",
      "hasAccountVoted(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account)
      ]
    );

    return result[0].toBoolean();
  }

  try_hasAccountVoted(
    proposalId: BigInt,
    account: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasAccountVoted",
      "hasAccountVoted(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  latestProposalIds(param0: Address): BigInt {
    let result = super.call(
      "latestProposalIds",
      "latestProposalIds(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_latestProposalIds(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "latestProposalIds",
      "latestProposalIds(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lockedBalance(param0: Address): BigInt {
    let result = super.call(
      "lockedBalance",
      "lockedBalance(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_lockedBalance(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lockedBalance",
      "lockedBalance(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposalCount(): BigInt {
    let result = super.call("proposalCount", "proposalCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_proposalCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalCount",
      "proposalCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposals(param0: BigInt): TornadoCashToken__proposalsResult {
    let result = super.call(
      "proposals",
      "proposals(uint256):(address,address,uint256,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new TornadoCashToken__proposalsResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBoolean(),
      result[7].toBoolean()
    );
  }

  try_proposals(
    param0: BigInt
  ): ethereum.CallResult<TornadoCashToken__proposalsResult> {
    let result = super.tryCall(
      "proposals",
      "proposals(uint256):(address,address,uint256,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TornadoCashToken__proposalsResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBoolean(),
        value[7].toBoolean()
      )
    );
  }

  propose(target: Address, description: string): BigInt {
    let result = super.call("propose", "propose(address,string):(uint256)", [
      ethereum.Value.fromAddress(target),
      ethereum.Value.fromString(description)
    ]);

    return result[0].toBigInt();
  }

  try_propose(
    target: Address,
    description: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall("propose", "propose(address,string):(uint256)", [
      ethereum.Value.fromAddress(target),
      ethereum.Value.fromString(description)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposeByDelegate(
    from: Address,
    target: Address,
    description: string
  ): BigInt {
    let result = super.call(
      "proposeByDelegate",
      "proposeByDelegate(address,address,string):(uint256)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromAddress(target),
        ethereum.Value.fromString(description)
      ]
    );

    return result[0].toBigInt();
  }

  try_proposeByDelegate(
    from: Address,
    target: Address,
    description: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposeByDelegate",
      "proposeByDelegate(address,address,string):(uint256)",
      [
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromAddress(target),
        ethereum.Value.fromString(description)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  resolve(node: Bytes): Address {
    let result = super.call("resolve", "resolve(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(node)
    ]);

    return result[0].toAddress();
  }

  try_resolve(node: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall("resolve", "resolve(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(node)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  returnMultisigAddress(): Address {
    let result = super.call(
      "returnMultisigAddress",
      "returnMultisigAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_returnMultisigAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "returnMultisigAddress",
      "returnMultisigAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  state(proposalId: BigInt): i32 {
    let result = super.call("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);

    return result[0].toI32();
  }

  try_state(proposalId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("state", "state(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(proposalId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  torn(): Address {
    let result = super.call("torn", "torn():(address)", []);

    return result[0].toAddress();
  }

  try_torn(): ethereum.CallResult<Address> {
    let result = super.tryCall("torn", "torn():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  userVault(): Address {
    let result = super.call("userVault", "userVault():(address)", []);

    return result[0].toAddress();
  }

  try_userVault(): ethereum.CallResult<Address> {
    let result = super.tryCall("userVault", "userVault():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  version(): string {
    let result = super.call("version", "version():(string)", []);

    return result[0].toString();
  }

  try_version(): ethereum.CallResult<string> {
    let result = super.tryCall("version", "version():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get stakingRewardsAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get gasCompLogic(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get userVaultAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CastDelegatedVoteCall extends ethereum.Call {
  get inputs(): CastDelegatedVoteCall__Inputs {
    return new CastDelegatedVoteCall__Inputs(this);
  }

  get outputs(): CastDelegatedVoteCall__Outputs {
    return new CastDelegatedVoteCall__Outputs(this);
  }
}

export class CastDelegatedVoteCall__Inputs {
  _call: CastDelegatedVoteCall;

  constructor(call: CastDelegatedVoteCall) {
    this._call = call;
  }

  get from(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get support(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class CastDelegatedVoteCall__Outputs {
  _call: CastDelegatedVoteCall;

  constructor(call: CastDelegatedVoteCall) {
    this._call = call;
  }
}

export class CastVoteCall extends ethereum.Call {
  get inputs(): CastVoteCall__Inputs {
    return new CastVoteCall__Inputs(this);
  }

  get outputs(): CastVoteCall__Outputs {
    return new CastVoteCall__Outputs(this);
  }
}

export class CastVoteCall__Inputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get support(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class CastVoteCall__Outputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }
}

export class DelegateCall extends ethereum.Call {
  get inputs(): DelegateCall__Inputs {
    return new DelegateCall__Inputs(this);
  }

  get outputs(): DelegateCall__Outputs {
    return new DelegateCall__Outputs(this);
  }
}

export class DelegateCall__Inputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DelegateCall__Outputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }
}

export class ExecuteCall extends ethereum.Call {
  get inputs(): ExecuteCall__Inputs {
    return new ExecuteCall__Inputs(this);
  }

  get outputs(): ExecuteCall__Outputs {
    return new ExecuteCall__Outputs(this);
  }
}

export class ExecuteCall__Inputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ExecuteCall__Outputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _torn(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class LockCall extends ethereum.Call {
  get inputs(): LockCall__Inputs {
    return new LockCall__Inputs(this);
  }

  get outputs(): LockCall__Outputs {
    return new LockCall__Outputs(this);
  }
}

export class LockCall__Inputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }

  get owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class LockCall__Outputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }
}

export class LockWithApprovalCall extends ethereum.Call {
  get inputs(): LockWithApprovalCall__Inputs {
    return new LockWithApprovalCall__Inputs(this);
  }

  get outputs(): LockWithApprovalCall__Outputs {
    return new LockWithApprovalCall__Outputs(this);
  }
}

export class LockWithApprovalCall__Inputs {
  _call: LockWithApprovalCall;

  constructor(call: LockWithApprovalCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class LockWithApprovalCall__Outputs {
  _call: LockWithApprovalCall;

  constructor(call: LockWithApprovalCall) {
    this._call = call;
  }
}

export class ProposeCall extends ethereum.Call {
  get inputs(): ProposeCall__Inputs {
    return new ProposeCall__Inputs(this);
  }

  get outputs(): ProposeCall__Outputs {
    return new ProposeCall__Outputs(this);
  }
}

export class ProposeCall__Inputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get description(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ProposeCall__Outputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ProposeByDelegateCall extends ethereum.Call {
  get inputs(): ProposeByDelegateCall__Inputs {
    return new ProposeByDelegateCall__Inputs(this);
  }

  get outputs(): ProposeByDelegateCall__Outputs {
    return new ProposeByDelegateCall__Outputs(this);
  }
}

export class ProposeByDelegateCall__Inputs {
  _call: ProposeByDelegateCall;

  constructor(call: ProposeByDelegateCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get target(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get description(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class ProposeByDelegateCall__Outputs {
  _call: ProposeByDelegateCall;

  constructor(call: ProposeByDelegateCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetClosingPeriodCall extends ethereum.Call {
  get inputs(): SetClosingPeriodCall__Inputs {
    return new SetClosingPeriodCall__Inputs(this);
  }

  get outputs(): SetClosingPeriodCall__Outputs {
    return new SetClosingPeriodCall__Outputs(this);
  }
}

export class SetClosingPeriodCall__Inputs {
  _call: SetClosingPeriodCall;

  constructor(call: SetClosingPeriodCall) {
    this._call = call;
  }

  get closingPeriod(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetClosingPeriodCall__Outputs {
  _call: SetClosingPeriodCall;

  constructor(call: SetClosingPeriodCall) {
    this._call = call;
  }
}

export class SetExecutionDelayCall extends ethereum.Call {
  get inputs(): SetExecutionDelayCall__Inputs {
    return new SetExecutionDelayCall__Inputs(this);
  }

  get outputs(): SetExecutionDelayCall__Outputs {
    return new SetExecutionDelayCall__Outputs(this);
  }
}

export class SetExecutionDelayCall__Inputs {
  _call: SetExecutionDelayCall;

  constructor(call: SetExecutionDelayCall) {
    this._call = call;
  }

  get executionDelay(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetExecutionDelayCall__Outputs {
  _call: SetExecutionDelayCall;

  constructor(call: SetExecutionDelayCall) {
    this._call = call;
  }
}

export class SetExecutionExpirationCall extends ethereum.Call {
  get inputs(): SetExecutionExpirationCall__Inputs {
    return new SetExecutionExpirationCall__Inputs(this);
  }

  get outputs(): SetExecutionExpirationCall__Outputs {
    return new SetExecutionExpirationCall__Outputs(this);
  }
}

export class SetExecutionExpirationCall__Inputs {
  _call: SetExecutionExpirationCall;

  constructor(call: SetExecutionExpirationCall) {
    this._call = call;
  }

  get executionExpiration(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetExecutionExpirationCall__Outputs {
  _call: SetExecutionExpirationCall;

  constructor(call: SetExecutionExpirationCall) {
    this._call = call;
  }
}

export class SetGasCompensationsCall extends ethereum.Call {
  get inputs(): SetGasCompensationsCall__Inputs {
    return new SetGasCompensationsCall__Inputs(this);
  }

  get outputs(): SetGasCompensationsCall__Outputs {
    return new SetGasCompensationsCall__Outputs(this);
  }
}

export class SetGasCompensationsCall__Inputs {
  _call: SetGasCompensationsCall;

  constructor(call: SetGasCompensationsCall) {
    this._call = call;
  }

  get gasCompensationsLimit(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetGasCompensationsCall__Outputs {
  _call: SetGasCompensationsCall;

  constructor(call: SetGasCompensationsCall) {
    this._call = call;
  }
}

export class SetProposalThresholdCall extends ethereum.Call {
  get inputs(): SetProposalThresholdCall__Inputs {
    return new SetProposalThresholdCall__Inputs(this);
  }

  get outputs(): SetProposalThresholdCall__Outputs {
    return new SetProposalThresholdCall__Outputs(this);
  }
}

export class SetProposalThresholdCall__Inputs {
  _call: SetProposalThresholdCall;

  constructor(call: SetProposalThresholdCall) {
    this._call = call;
  }

  get proposalThreshold(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProposalThresholdCall__Outputs {
  _call: SetProposalThresholdCall;

  constructor(call: SetProposalThresholdCall) {
    this._call = call;
  }
}

export class SetQuorumVotesCall extends ethereum.Call {
  get inputs(): SetQuorumVotesCall__Inputs {
    return new SetQuorumVotesCall__Inputs(this);
  }

  get outputs(): SetQuorumVotesCall__Outputs {
    return new SetQuorumVotesCall__Outputs(this);
  }
}

export class SetQuorumVotesCall__Inputs {
  _call: SetQuorumVotesCall;

  constructor(call: SetQuorumVotesCall) {
    this._call = call;
  }

  get quorumVotes(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetQuorumVotesCall__Outputs {
  _call: SetQuorumVotesCall;

  constructor(call: SetQuorumVotesCall) {
    this._call = call;
  }
}

export class SetVoteExtendTimeCall extends ethereum.Call {
  get inputs(): SetVoteExtendTimeCall__Inputs {
    return new SetVoteExtendTimeCall__Inputs(this);
  }

  get outputs(): SetVoteExtendTimeCall__Outputs {
    return new SetVoteExtendTimeCall__Outputs(this);
  }
}

export class SetVoteExtendTimeCall__Inputs {
  _call: SetVoteExtendTimeCall;

  constructor(call: SetVoteExtendTimeCall) {
    this._call = call;
  }

  get voteExtendTime(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetVoteExtendTimeCall__Outputs {
  _call: SetVoteExtendTimeCall;

  constructor(call: SetVoteExtendTimeCall) {
    this._call = call;
  }
}

export class SetVotingDelayCall extends ethereum.Call {
  get inputs(): SetVotingDelayCall__Inputs {
    return new SetVotingDelayCall__Inputs(this);
  }

  get outputs(): SetVotingDelayCall__Outputs {
    return new SetVotingDelayCall__Outputs(this);
  }
}

export class SetVotingDelayCall__Inputs {
  _call: SetVotingDelayCall;

  constructor(call: SetVotingDelayCall) {
    this._call = call;
  }

  get votingDelay(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetVotingDelayCall__Outputs {
  _call: SetVotingDelayCall;

  constructor(call: SetVotingDelayCall) {
    this._call = call;
  }
}

export class SetVotingPeriodCall extends ethereum.Call {
  get inputs(): SetVotingPeriodCall__Inputs {
    return new SetVotingPeriodCall__Inputs(this);
  }

  get outputs(): SetVotingPeriodCall__Outputs {
    return new SetVotingPeriodCall__Outputs(this);
  }
}

export class SetVotingPeriodCall__Inputs {
  _call: SetVotingPeriodCall;

  constructor(call: SetVotingPeriodCall) {
    this._call = call;
  }

  get votingPeriod(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetVotingPeriodCall__Outputs {
  _call: SetVotingPeriodCall;

  constructor(call: SetVotingPeriodCall) {
    this._call = call;
  }
}

export class UndelegateCall extends ethereum.Call {
  get inputs(): UndelegateCall__Inputs {
    return new UndelegateCall__Inputs(this);
  }

  get outputs(): UndelegateCall__Outputs {
    return new UndelegateCall__Outputs(this);
  }
}

export class UndelegateCall__Inputs {
  _call: UndelegateCall;

  constructor(call: UndelegateCall) {
    this._call = call;
  }
}

export class UndelegateCall__Outputs {
  _call: UndelegateCall;

  constructor(call: UndelegateCall) {
    this._call = call;
  }
}

export class UnlockCall extends ethereum.Call {
  get inputs(): UnlockCall__Inputs {
    return new UnlockCall__Inputs(this);
  }

  get outputs(): UnlockCall__Outputs {
    return new UnlockCall__Outputs(this);
  }
}

export class UnlockCall__Inputs {
  _call: UnlockCall;

  constructor(call: UnlockCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UnlockCall__Outputs {
  _call: UnlockCall;

  constructor(call: UnlockCall) {
    this._call = call;
  }
}

export class WithdrawFromHelperCall extends ethereum.Call {
  get inputs(): WithdrawFromHelperCall__Inputs {
    return new WithdrawFromHelperCall__Inputs(this);
  }

  get outputs(): WithdrawFromHelperCall__Outputs {
    return new WithdrawFromHelperCall__Outputs(this);
  }
}

export class WithdrawFromHelperCall__Inputs {
  _call: WithdrawFromHelperCall;

  constructor(call: WithdrawFromHelperCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawFromHelperCall__Outputs {
  _call: WithdrawFromHelperCall;

  constructor(call: WithdrawFromHelperCall) {
    this._call = call;
  }
}
