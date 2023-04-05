import { ipfs, json, BigInt, BigDecimal, Bytes, log } from "@graphprotocol/graph-ts"
import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
  DelegateVotingPowerChange,
  DelegateChange,
  DelegatingHistory
} from "../generated/schema"
import { DelegateChanged, DelegateVotesChanged, Transfer } from "../generated/GitcoinToken/GitcoinToken"
import { getDelegateOrganization } from "./shared/getDelegateOrganization"
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt"

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("gitcoin")
  organization.token = "gtc"
  organization.save()

  let delegate = new User(event.params.toDelegate.toHexString())
  delegate.save();

  let delegator = new User(event.params.delegator.toHexString())
  delegator.save();

  let delegatorOrganization = new DelegatorOrganization(`${delegator.id}-${organization.id}`)
  delegatorOrganization.delegate = delegate.id
  delegatorOrganization.delegator = delegator.id
  delegatorOrganization.organization = organization.id

  let delegatingHistory = DelegatingHistory.load(event.transaction.hash.toHexString())

  if(!delegatingHistory){
    delegatingHistory = new DelegatingHistory(event.transaction.hash.toHexString());
    delegatingHistory.daoName = organization.id;
    delegatingHistory.amount = BigInt.zero();
    delegatingHistory.timestamp = event.block.timestamp;
  }

  delegatingHistory.fromDelegate = event.params.fromDelegate.toHexString();
  delegatingHistory.toDelegate = event.params.toDelegate.toHexString();
  delegatingHistory.delegator = delegator.id;

  delegatingHistory.save();
  delegatorOrganization.save();

  const delegateChange = new DelegateChange(event.transaction.hash.toHexString());
  delegateChange.oldDelegate = event.params.fromDelegate.toHexString(),
  delegateChange.newDelegate = event.params.toDelegate.toHexString(),
  delegateChange.delegator = event.params.delegator.toHexString(),
  delegateChange.blockTimestamp = event.block.timestamp,
  delegateChange.txnHash = event.transaction.hash.toHexString(),
  delegateChange.blockNumber = event.block.number,
  delegateChange.save();
}

export function delegateVotesChanged(event: DelegateVotesChanged): void {
  let organization = new Organization("gitcoin")
  organization.token = "gtc"
  organization.save()

  let user = new User(event.params.delegate.toHexString())
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);

  delegateOrganization.delegate = user.id
  delegateOrganization.organization = organization.id
  delegateOrganization.voteBalance = event.params.newBalance

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(event, delegateOrganization);

  delegateOrganization.save()

  let delegatedAmount = event.params.newBalance.minus(event.params.previousBalance)

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
