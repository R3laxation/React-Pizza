import { CartItemType } from "../bll/slises/cart/types"


export const calcTotalPrice = (items: CartItemType[]) => {
  return  items.reduce((sum, obj) => sum + (obj.price * obj.count), 0)
}