import { ethereum, log } from "@graphprotocol/graph-ts";
import { DelegateOrganization } from "../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function getFirstTokenDelegatedAt(
  event: ethereum.Event,
  delegateOrganization: DelegateOrganization
): BigInt {
  if (
    !delegateOrganization.firstTokenDelegatedAt ||
    BigInt.compare(
      delegateOrganization.firstTokenDelegatedAt!,
      BigInt.zero()
    ) === 0
  ) {
    return event.block.timestamp;
  }

  return delegateOrganization.firstTokenDelegatedAt!;
}
