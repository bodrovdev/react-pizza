import { FetchedPizzaItem } from "../../components/common/Types/PizzaItem.type"

export type ParamsType = {
  category: string,
  order: string,
  sortBy: string,
  name: string,
}

export type PizzasSliceState = {
  items: FetchedPizzaItem[],
  status: Status,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}