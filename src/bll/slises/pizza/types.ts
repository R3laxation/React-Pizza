export type PizzaStateType = {
    items: ItemsType[]
    status: Status
}

export type ItemsType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

export enum Status  {
    ENTITY = 'entity',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}