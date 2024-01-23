import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  names: [],
}

const filterSLice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    chooseDealName: (state, action) => {
      state.names.push(action.payload)
    },
    removeDealName: (state, action) => {
      return {
        ...state,
        names: state.names.filter((name) => name !== action.payload),
      }
    },
    resetFilter: () => {
      return initialState
    },
  },
})

export const selectDealNamesFilter = (state) => state.filter.names

export const { chooseDealName, removeDealName, resetFilter } =
  filterSLice.actions

export default filterSLice.reducer
