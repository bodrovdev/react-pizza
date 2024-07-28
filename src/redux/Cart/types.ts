import { ToCartPizzaItem } from "../../components/common/Types/PizzaItem.type";

export type CartSliceState = {
  totalPrice: number,
  totalAmount: number,
  itemsInCart: ToCartPizzaItem[],
}