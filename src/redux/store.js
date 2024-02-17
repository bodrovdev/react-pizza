// ? 1) REDUX. Создаём хранилище
import { configureStore } from '@reduxjs/toolkit'

// ? 4) REDUX. Импортируем созданные слайсы
import sortSlice from './slices/sortSlice'
import searchSlice from './slices/searchSlice'

// ? 5) REDUX. Передаём редюсеры слайсов в стор
export const store = configureStore({
  reducer: {
    sort: sortSlice,
    search: searchSlice,
  },
})