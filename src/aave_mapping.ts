import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
} from "../generated/schema";
import {
  DelegateChanged,
  DelegatedPowerChanged,
} from "../generated/AaveToken/AaveToken";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("aaev");
  organization.token = "aaev";
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
}

export function delegateVotesChanged(event: DelegatedPowerChanged): void {
  let organization = new Organization("aaev");
  organization.token = "aaev";
  organization.save();

  let user = new User(event.params.user.toHexString());
  user.save();

  let delegateOrganization = new DelegateOrganization(
    `${user.id}-${organization.id}`
  );
  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.amount;
  delegateOrganization.save();
}
