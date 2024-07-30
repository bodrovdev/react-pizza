import qs from "qs";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../components/common/Types/Hooks.type";
import { SortType, sortTypes } from "../../components/pages/Home/Sort";
import { selectFilter } from "../../redux/Filter/selectors";
import { setSorting } from "../../redux/Filter/slice";
import { FilterSliceState } from "../../redux/Filter/types";
import { selectPizzas } from "../../redux/Pizza/selectors";
import { fetchPizzas } from "../../redux/Pizza/slice";
import { ParamsType } from "../../redux/Pizza/types";

function useFetchOnCondition() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = useRef<Boolean>(false);
  const isFiltered = useRef<Boolean>(false);

  const { category, sort, order, search } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const getPizzas = () => {
    const paramsObj: ParamsType = {
      category: category ? String(category) : '',
      sortBy: sort.sortBy,
      order: order === false ? 'desc' : 'asc',
      name: search,
    }
    dispatch(fetchPizzas({ ...paramsObj }));
  }

  // & проверка на наличие параметров в URL, записываем полученные параметры в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortStartValue = sortTypes.find(obj => obj.sortBy === params.sortBy);

      const setSortingObj: FilterSliceState = {
        category: params.category as string,
        sort: (sortStartValue || { name: 'По цене', sortBy: 'price' }) as SortType,
        order: params.order === 'desc' ? false : true as boolean,
        search: params.name as string,
        localSearch: params.name as string,
      }

      dispatch(setSorting(setSortingObj));

      isFiltered.current = true;
    }
  }, [])

  // & получаем все айтемы, если параметров в URL нет
  useEffect(() => {
    if (!isFiltered.current) {
      getPizzas();
    }

    isFiltered.current = false;

  }, [category, sort, order, search]);

  // & проверка на первый рендер, записываем параметры из редакса в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category,
        sortBy: sort.sortBy,
        order: order === false ? 'desc' : 'asc',
        name: search,
      })
      navigate(`?${queryString}`);
    }

    isMounted.current = true;

  }, [category, sort, order, search])

  return { items, status, category }
}

export default useFetchOnCondition