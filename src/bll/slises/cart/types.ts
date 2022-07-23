export type CartStateType = {
    totalPrice: number
    items: CartItemType[]
}

export type CartItemType = {
    id: number,
    imageUrl: string,
    title: string,
    price: number,
    type: string,
    size: number
    count: number
}