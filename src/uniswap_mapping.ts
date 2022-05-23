import { ipfs, json, BigInt, BigDecimal, Bytes, log } from "@graphprotocol/graph-ts"
import {
  Organization,
  User,
  DelegateOrganization,
  DelegatorOrganization
} from "../generated/schema"
import { DelegateChanged, DelegateVotesChanged } from "../generated/UniswapToken/UniswapToken"
import { getDelegateOrganization } from "./shared/getDelegateOrganization"
import { getFirstTokenDelegatedAt } from "./shared/getFirstTokenDelegatedAt"

export function delegateChanged(event: DelegateChanged): void {
  let organization = new Organization("uniswap")
  organization.token = "uni"
  organization.save()

  let delegate = new User(event.params.toDelegate.toHexString())
  delegate.save();

  let delegator = new User(event.params.delegator.toHexString())
  delegator.save();

  let delegatorOrganization = new DelegatorOrganization(`${delegator.id}-${organization.id}`)
  delegatorOrganization.delegate = delegate.id
  delegatorOrganization.delegator = delegator.id
  delegatorOrganization.organization = organization.id
  delegatorOrganization.save()
}

export function delegateVotesChanged(event: DelegateVotesChanged): void {
  let organization = new Organization("uniswap")
  organization.token = "uni"
  organization.save()

  let user = new User(event.params.delegate.toHexString())
  user.save();

  const delegateOrganizationId = `${user.id}-${organization.id}`;
  const delegateOrganization = getDelegateOrganization(delegateOrganizationId);
  
  delegateOrganization.delegate = user.id
  delegateOrganization.organization = organization.id
  delegateOrganization.voteBalance = event.params.newBalance

  delegateOrganization.firstTokenDelegatedAt = getFirstTokenDelegatedAt(event, delegateOrganization);

  delegateOrganization.save()
}
