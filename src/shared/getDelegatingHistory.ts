import { bigInt, BigInt } from "@graphprotocol/graph-ts";
import { DelegatingHistory } from "../../generated/schema";

export function getDelegatingHistory(
  id: string,
  delegate: string | null,
  delegator: string | null,
  timestamp: BigInt | null
): DelegatingHistory | null {
  let delegatingHistory = DelegatingHistory.load(id);

  if (!delegatingHistory && delegate && delegator && timestamp) {
    delegatingHistory = new DelegatingHistory(id);
    delegatingHistory.delegate = delegate;
    delegatingHistory.delegator = delegator;
    delegatingHistory.timestamp = timestamp;
    delegatingHistory.amount = BigInt.zero();
    delegatingHistory.save();
  }

  return delegatingHistory;
}

export function updateDelegatinHistoryAmount(id: string, amount: BigInt): void {
  const delegatingHistory = DelegatingHistory.load(id);
  delegatingHistory!.amount = amount;
  delegatingHistory!.save();
}
