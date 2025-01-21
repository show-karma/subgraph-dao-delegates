import {  BigInt } from "@graphprotocol/graph-ts"
import { DelegateChange, DelegateVotingPowerChange, DelegatingHistory, DelegatorOrganization, Organization, User } from "../../generated/schema"
import { getDelegateOrganization } from "../shared/getDelegateOrganization"
import { getFirstTokenDelegatedAt } from "../shared/getFirstTokenDelegatedAt"
import { DelegateChanged, DelegateVotesChanged } from "../../generated/ClearToken/ClearToken"


const daoName = 'everclear'

export function handleDelegateChanged(event: DelegateChanged): void {
  let organization = new Organization(daoName)
  organization.token = daoName
  organization.save()

  let delegate = new User(event.params.toDelegate.toHexString())
  delegate.save();

  let delegator = new User(event.params.delegator.toHexString())
  delegator.save();

  let delegatorOrganization = new DelegatorOrganization(`${delegator.id}-${organization.id}`)
  delegatorOrganization.delegate = delegate.id
  delegatorOrganization.delegator = delegator.id
  delegatorOrganization.organization = organization.id

  let delegatingHistory = DelegatingHistory.load(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)

  if(!delegatingHistory){
    delegatingHistory = new DelegatingHistory(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`);
    delegatingHistory.daoName = organization.id;
    delegatingHistory.amount = BigInt.zero();
    delegatingHistory.timestamp = event.block.timestamp;
    delegatingHistory.contract = event.address.toHexString();
  }

  delegatingHistory.fromDelegate = event.params.fromDelegate.toHexString();
  delegatingHistory.toDelegate = event.params.toDelegate.toHexString();
  delegatingHistory.delegator = delegator.id;

  delegatingHistory.save();
  delegatorOrganization.save();

  const delegateChange = new DelegateChange(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`);
  delegateChange.oldDelegate = event.params.fromDelegate.toHexString(),
  delegateChange.newDelegate = event.params.toDelegate.toHexString(),
  delegateChange.delegator = event.params.delegator.toHexString(),
  delegateChange.blockTimestamp = event.block.timestamp,
  delegateChange.txnHash = event.transaction.hash.toHexString(),
  delegateChange.blockNumber = event.block.number,
  delegateChange.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let organization = new Organization(daoName)
  organization.token = daoName
  organization.save()

  let user = new User(event.params.delegate.toHexString())
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);

  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  
  // Get current balances or initialize them
  let v1Balance = delegateOrganization.voteBalanceV1;
  let v2Balance = delegateOrganization.voteBalanceV2;
  
  if (!v1Balance) {
    v1Balance = BigInt.fromI32(0);
  }
  if (!v2Balance) {
    v2Balance = BigInt.fromI32(0);
  }
  
  // Determine which contract triggered the event and update the corresponding balance
  event.address
  if (event.address.toHexString().toLowerCase() == "0xFE67A4450907459c3e1FFf623aA927dD4e28c67a".toLowerCase()) {
    v1Balance = event.params.newBalance;
  } else {
    v2Balance = event.params.newBalance;
  }
  
  // Update all balances
  delegateOrganization.voteBalanceV1 = v1Balance;
  delegateOrganization.voteBalanceV2 = v2Balance;
  delegateOrganization.voteBalance = v1Balance.plus(v2Balance);

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(event, delegateOrganization);

  delegateOrganization.save()

  const delegatePowerChange = new DelegateVotingPowerChange( `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`);

  delegatePowerChange.previousBalance = event.params.previousBalance;
  delegatePowerChange.newBalance = event.params.newBalance;
  delegatePowerChange.delegate = event.params.delegate.toHexString();
  delegatePowerChange.tokenAddress = event.address.toHexString();
  delegatePowerChange.txnHash = event.transaction.hash.toHexString();
  delegatePowerChange.blockTimestamp = event.block.timestamp;
  delegatePowerChange.blockNumber = event.block.number;
  delegatePowerChange.save();
}
