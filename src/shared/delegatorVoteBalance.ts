import { BigInt } from "@graphprotocol/graph-ts";
import {
  DelegatorOrganization,
  Organization,
  User,
} from "../../generated/schema";
import { getDelegatorOrganization } from "./getDelegatorOrganization";
import {
  getDelegatingHistory,
  updateDelegatinHistoryAmount,
} from "./getDelegatingHistory";

// export interface eventDelegatorVoteBalance {
//   hash: string;
//   newBalance: BigInt;
//   previousBalance: BigInt;
//   delegate: string;
// }

export function calculateDelegatorVoteBalance(
  user: User,
  organization: Organization,
  hash: string,
  newBalance: BigInt,
  previousBalance: BigInt,
  delegate: string
  // event: eventDelegatorVoteBalance
): void {
  const historyDelegating = getDelegatingHistory(hash, null, null, null);

  if (historyDelegating && historyDelegating.id == hash) {
    const votes = newBalance.minus(previousBalance);

    updateDelegatinHistoryAmount(historyDelegating.id, votes);

    let delegatorOrganization = DelegatorOrganization.load(
      `${user.id}-${organization.id}`
    );

    if (!delegatorOrganization) {
      delegatorOrganization = getDelegatorOrganization(
        `${user.id}-${organization.id}`
      );

      const delegator = new User(historyDelegating.delegator);
      delegator.save();
      delegatorOrganization.organization = organization.id;
      delegatorOrganization.delegate = user.id;
      delegatorOrganization.delegator = delegator.id;
      delegatorOrganization.delegatedVotes = BigInt.zero();
    }

    delegatorOrganization.delegate = delegate;
    delegatorOrganization.delegatedVotes = delegatorOrganization.delegatedVotes.plus(
      votes
    );
    delegatorOrganization.save();
  }
}
