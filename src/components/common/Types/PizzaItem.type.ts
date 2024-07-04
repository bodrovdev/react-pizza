type BasePizzaItem = {
  category: number,
  id: number,
  imageUrl: string,
  name: string,
  price: number,
}

export type FetchedPizzaItem = BasePizzaItem & {
  types: number[],
  sizes: number[],
  rating: number,
}

export type ToCartPizzaItem = BasePizzaItem & {
  count: number,
  keyword: string,
  size: number,
  type: string,
}