import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization,
} from "../generated/schema";
import {
  DelegateChanged,
  DelegateVotesChanged,
} from "../generated/OlympusToken/OlympusToken";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("olympus");
  organization.token = "gohm";
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
  let organization = new Organization("olympus");
  organization.token = "gohm";
  organization.save();

  let user = new User(event.params.delegate.toHexString());
  user.save();

  let delegateOrganization = new DelegateOrganization(
    `${user.id}-${organization.id}`
  );
  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.newBalance;
  delegateOrganization.save();
}
