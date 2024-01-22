import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  names: [],
}

const filterSLice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    setDealNames: (state, action) => {
      state.names.push(action.payload)
    },
    resetFilter: () => {
      return initialState
    },
  },
})

export const selectDealNamesFilter = (state) => state.filter.names

export const { setDealNames, resetFilter } = filterSLice.actions

export default filterSLice.reducer
