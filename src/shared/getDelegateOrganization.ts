import { BigInt } from "@graphprotocol/graph-ts";
import { DelegateOrganization } from "../../generated/schema";

export function getDelegateOrganization(id: string): DelegateOrganization {
  let delegate = DelegateOrganization.load(id);

  if(!delegate){
    delegate = new DelegateOrganization(id);
    delegate.voteBalance = BigInt.zero();
  }

  return delegate as DelegateOrganization;
}
