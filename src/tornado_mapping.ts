import { BigInt } from "@graphprotocol/graph-ts";
import {
  Organization,
  User,
  DelegatorOrganization,
  DelegateOrganization,
} from "../generated/schema";
import { Delegated } from "../generated/TornadoCashToken/TornadoCashToken";

export function delegated(event: Delegated): void {
  let organization = new Organization("tornadocash");
  organization.token = "torn";
  organization.save();

  let delegate = new User(event.params.to.toHexString());
  delegate.save();

  let delegator = new User(event.params.account.toHexString());
  delegator.save();

  let delegatorOrganization = new DelegatorOrganization(
    `${delegator.id}-${organization.id}`
  );
  delegatorOrganization.delegate = delegate.id;
  delegatorOrganization.delegator = delegator.id;
  delegatorOrganization.organization = organization.id;
  delegatorOrganization.save();

  let delegateOrganization = new DelegateOrganization(
    `${delegate.id}-${organization.id}`
  );
  delegateOrganization.delegate = delegate.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = new BigInt(0);
  delegateOrganization.save();
}
