import { DelegatorOrganization } from "../../generated/schema";

export function getDelegatorOrganization(id: string): DelegatorOrganization {
  return (DelegatorOrganization.load(id) ||
    new DelegatorOrganization(id)) as DelegatorOrganization;
}
