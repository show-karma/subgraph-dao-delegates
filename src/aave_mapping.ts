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
import { getDelegateOrganization } from "./shared/getDelegateOrganization";
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt";
import { getDelegatingHistory } from "./shared/getDelegatingHistory";
import { calculateDelegatorVoteBalance } from "./shared/delegatorVoteBalance";
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
  delegatorOrganization.delegatedVotes = BigInt.zero();

  delegatorOrganization.save();

  getDelegatingHistory(
    event.transaction.hash.toHexString(),
    event.params.delegatee.toHexString(),
    event.params.delegator.toHexString(),
    event.block.timestamp
  );
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

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(
    event,
    delegateOrganization
  );

  delegateOrganization.save();

  calculateDelegatorVoteBalance(
    user,
    organization,
    event.transaction.hash.toHexString(),
    event.params.amount,
    delegateOrganization.voteBalance,
    event.params.user.toHexString()
  );
}
