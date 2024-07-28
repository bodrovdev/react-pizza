import { ToCartPizzaItem } from "../components/common/Types/PizzaItem.type";

const localData: string | null = window.localStorage.getItem('cart');
export const parsedLocalData: ToCartPizzaItem[] = localData ? JSON.parse(localData) : [];

export const getLocalUpdatedPrice = () => {
  if (parsedLocalData.length) {
    return parsedLocalData.reduce((sum: number, item: ToCartPizzaItem) => {
      return sum + item.price * item.count;
    }, 0);
  }
  else {
    return 0;
  }
}

export const getLocalUpdatedAmount = () => {
  if (parsedLocalData) {
    return parsedLocalData.reduce((sum: number, item: ToCartPizzaItem) => {
      return sum + item.count;
    }, 0);
  }
  else {
    return 0;
  }
}