import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";
import { Issue as IssueEvent } from '../generated/IssuanceModule/IssuanceModule'
import { IssueEvent as IssueEventEntity, } from '../generated/schema'
import {
  AddCallOrder, AddCallOrder_callOrderStruct, AddPutOrder, AddPutOrder_putOrderStruct
} from "../generated/Diamond/Diamond"
import { OptionPremiun } from '../generated/OptionModule/OptionModule'
import { CallOrderEntity, Order, PutOrderEntity, OptionPremium } from "../generated/schema"

export function handleIssue(event: IssueEvent): void {
  let entity = new IssueEventEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.vault = event.params._vault
  entity.from = event.params.from
  entity.assets = event.params._assets.map<Bytes>((_assets: Bytes) => _assets);
  entity.amounts = event.params._amounts
  entity.timestamp = event.block.timestamp
  entity.save()
}




export function handleAddCallOrder(event: AddCallOrder): void {
  let entityId = event.params._orderId.toString()
  let order = new Order(entityId)
  let callOrder = event.params._callOrder
  order.holder = callOrder.holder
  order.liquidateMode = callOrder.liquidateMode
  order.writer = callOrder.writer
  order.underlyingAssetType = callOrder.underlyingAssetType
  order.recipient = callOrder.recipient
  order.underlyingAsset = callOrder.underlyingAsset
  order.strikeAsset = callOrder.strikeAsset
  order.underlyingAmount = callOrder.underlyingAmount
  order.strikeAmount = callOrder.strikeAmount
  order.expirationDate = callOrder.expirationDate
  order.underlyingNftID = callOrder.underlyingNftID
  order.save()

  let callOrderEntity = new CallOrderEntity(entityId)
  callOrderEntity.orderId = event.params._orderId
  callOrderEntity.callOrder = order.id
  callOrderEntity.holderWallet = event.params._holderWallet
  callOrderEntity.writerWallet = event.params._writerWallet
  callOrderEntity.transactionHash = event.transaction.hash
  callOrderEntity.timestamp = event.block.timestamp

  callOrderEntity.save()
}


export function handleAddPutOrder(event: AddPutOrder): void {
  let entityId = event.params._orderId.toString()

  let order = new Order(entityId)
  let putOrder = event.params._putOrder
  order.holder = putOrder.holder
  order.liquidateMode = putOrder.liquidateMode
  order.writer = putOrder.writer
  order.underlyingAssetType = putOrder.underlyingAssetType
  order.recipient = putOrder.recipient
  order.underlyingAsset = putOrder.underlyingAsset
  order.strikeAsset = putOrder.strikeAsset
  order.underlyingAmount = putOrder.underlyingAmount
  order.strikeAmount = putOrder.strikeAmount
  order.expirationDate = putOrder.expirationDate
  order.underlyingNftID = putOrder.underlyingNftID
  order.save()

  let putOrderEntity = new PutOrderEntity(entityId)
  putOrderEntity.orderId = event.params._orderId
  putOrderEntity.putOrder = order.id
  putOrderEntity.holderWallet = event.params._holderWallet
  putOrderEntity.writerWallet = event.params._writerWallet
  putOrderEntity.transactionHash = event.transaction.hash
  putOrderEntity.timestamp = event.block.timestamp

  putOrderEntity.save()
}

export function handleOptionPremiun(event: OptionPremiun): void {
  let entity = new OptionPremium(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  entity.orderType = event.params._orderType
  entity.orderID = event.params._orderID
  entity.writer = event.params._writer
  entity.holder = event.params._holder
  entity.premiumAsset = event.params._premiumAsset
  entity.amount = event.params._amount
  entity.transactionHash = event.transaction.hash
  entity.timestamp = event.block.timestamp
  entity.save()
}