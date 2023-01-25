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
  Transaction,
} from "../generated/schema";
import {
  DelegateChanged,
  DelegateVotesChanged,
} from "../generated/ENSToken/ENSToken";
import { getDelegateOrganization } from "./shared/getDelegateOrganization";
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt";
import { getDelegatingHistory } from "./shared/getDelegatingHistory";
import { calculateDelegatorVoteBalance } from "./shared/delegatorVoteBalance";

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("gitcoin");
  organization.token = "gtc";
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
  delegatorOrganization.delegatedVotes = BigInt.zero();
  delegatorOrganization.save();

  getDelegatingHistory(
    event.transaction.hash.toHexString(),
    event.params.toDelegate.toHexString(),
    event.params.delegator.toHexString(),
    event.block.timestamp
  );
}

export function delegateVotesChanged(event: DelegateVotesChanged): void {
  let organization = new Organization("gitcoin");
  organization.token = "gtc";
  organization.save();

  let user = new User(event.params.delegate.toHexString());
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);

  delegateOrganization.delegate = user.id;
  delegateOrganization.organization = organization.id;
  delegateOrganization.voteBalance = event.params.newBalance;

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(
    event,
    delegateOrganization
  );

  delegateOrganization.save();

  calculateDelegatorVoteBalance(
    user,
    organization,
    event.transaction.hash.toHexString() as string,
    event.params.newBalance,
    event.params.previousBalance,
    event.params.delegate.toHexString() as string
  );

  const transaction = new Transaction(event.transaction.hash.toHexString());
  transaction.delegate = event.params.delegate.toHexString();
  transaction.amount = event.params.newBalance.minus(
    event.params.previousBalance
  );
  transaction.timestamp = event.block.timestamp;
  transaction.address = event.address.toHexString();
  transaction.oldBalance = event.params.newBalance;
  transaction.newBalance = event.params.previousBalance;
  transaction.save();
}
