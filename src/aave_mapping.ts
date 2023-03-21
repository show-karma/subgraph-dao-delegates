import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
  DelegateVotingPowerChange,
  DelegateChange,
  DelegatingHistory
} from "../generated/schema";
import {
  DelegateChanged,
  DelegatedPowerChanged,
  Transfer,
} from "../generated/AaveToken/AaveToken";
import { getDelegateOrganization } from "./shared/getDelegateOrganization";
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt";
import { BigInt } from "@graphprotocol/graph-ts";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("aave");
  organization.token = "aave";
  organization.save();

  let delegate = new User(event.params.delegatee.toHexString());
  delegate.save();

  let delegator = new User(event.params.delegator.toHexString());
  delegator.save();

  let delegatorOrganization = new DelegatorOrganization(
    `${delegator.id}-${organization.id}`
  );
  delegatorOrganization.delegate = delegate.id;
  delegatorOrganization.delegator = delegator.id;
  delegatorOrganization.organization = organization.id;

  const delegateChange = new DelegateChange(event.transaction.hash.toHexString());
  delegateChange.newDelegate = event.params.delegatee.toHexString(),
  delegateChange.delegator = event.params.delegator.toHexString(),
  delegateChange.blockTimestamp = event.block.timestamp,
  delegateChange.txnHash = event.transaction.hash.toHexString(),
  delegateChange.blockNumber = event.block.number,
  delegateChange.save();

  let delegatingHistory = DelegatingHistory.load(event.transaction.hash.toHexString())

  if(!delegatingHistory){
    delegatingHistory = new DelegatingHistory(event.transaction.hash.toHexString());
    delegatingHistory.daoName = organization.id;
    delegatingHistory.amount = BigInt.zero();
    delegatingHistory.timestamp = event.block.timestamp;
  }

  delegatingHistory.fromDelegate = null;
  delegatingHistory.toDelegate = event.params.delegatee.toHexString();
  delegatingHistory.delegator = delegator.id;

  delegatingHistory.save();
  delegatorOrganization.save();
}

export function delegateVotesChanged(event: DelegatedPowerChanged): void {
  let organization = new Organization("aave");
  organization.token = "aave";
  organization.save();

  let user = new User(event.params.user.toHexString());
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);

  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.amount;

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(event, delegateOrganization);

  delegateOrganization.save();

  const delegatePowerChange = new DelegateVotingPowerChange(
    event.transaction.hash.toHexString()
  );

  delegatePowerChange.previousBalance = BigInt.fromI32(0);
  delegatePowerChange.newBalance = event.params.amount;
  delegatePowerChange.delegate = user.id;
  delegatePowerChange.tokenAddress = event.address.toHexString();
  delegatePowerChange.txnHash = event.transaction.hash.toHexString();
  delegatePowerChange.blockTimestamp = event.block.timestamp;
  delegatePowerChange.blockNumber = event.block.number;
  delegatePowerChange.save();
}

