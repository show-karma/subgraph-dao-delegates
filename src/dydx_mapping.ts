import {
  ipfs,
  json,
  BigInt,
  BigDecimal,
  Bytes,
  log,
} from "@graphprotocol/graph-ts";
import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
  DelegateVotingPowerChange,
  DelegateChange
} from "../generated/schema";
import {
  DelegateChanged,
  DelegatedPowerChanged,
} from "../generated/DYDXToken/DYDXToken";
import { getDelegateOrganization } from "./shared/getDelegateOrganization";
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("dydx");
  organization.token = "dydx";
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
  delegatorOrganization.save();

  const delegateChange = new DelegateChange(event.transaction.hash.toHexString());
  delegateChange.newDelegate = event.params.delegatee.toHexString(),
  delegateChange.delegator = event.params.delegator.toHexString(),
  delegateChange.blockTimestamp = event.block.timestamp,
  delegateChange.txnHash = event.transaction.hash.toHexString(),
  delegateChange.blockNumber = event.block.number,
  delegateChange.save();
}

export function delegateVotesChanged(event: DelegatedPowerChanged): void {
  let organization = new Organization("dydx");
  organization.token = "dydx";
  organization.save();

  let user = new User(event.params.user.toHexString());
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);

  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.amount;

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(
    event,
    delegateOrganization
  );

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
