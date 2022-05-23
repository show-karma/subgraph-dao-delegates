import { DelegateOrganization } from "../../generated/schema";

export function getDelegateOrganization(id: string): DelegateOrganization {
  return (DelegateOrganization.load(id) || new DelegateOrganization(id)) as DelegateOrganization;
}