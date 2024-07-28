import { SortType } from "../../components/pages/Home/Sort"

export type FilterSliceState = {
  category: string,
  sort: SortType,
  order: boolean,
  search: string,
  localSearch: string,
}