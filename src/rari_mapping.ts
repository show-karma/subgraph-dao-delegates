import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
  DelegateVotingPowerChange
} from "../generated/schema";
import {
  DelegateChanged,
  DelegateVotesChanged,
} from "../generated/RariToken/RariToken";
import { getDelegateOrganization } from "./shared/getDelegateOrganization";
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("raricapital");
  organization.token = "rari";
  organization.save();

  let delegate = new User(event.params.toDelegate.toHexString());
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
}

export function delegateVotesChanged(event: DelegateVotesChanged): void {
  let organization = new Organization("raricapital");
  organization.token = "rari";
  organization.save();

  let user = new User(event.params.delegate.toHexString());
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);
  
  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.newBalance;

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(event, delegateOrganization);

  delegateOrganization.save();

  const delegatePowerChange = new DelegateVotingPowerChange(
    event.transaction.hash.toHexString()
  );

  delegatePowerChange.previousBalance = event.params.previousBalance;
  delegatePowerChange.newBalance = event.params.newBalance;
  delegatePowerChange.delegate = event.params.delegate.toHexString();
  delegatePowerChange.tokenAddress = event.address.toHexString();
  delegatePowerChange.txnHash = event.transaction.hash.toHexString();
  delegatePowerChange.blockTimestamp = event.block.timestamp;
  delegatePowerChange.blockNumber = event.block.number;
  delegatePowerChange.save();
}
