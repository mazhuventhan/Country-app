import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchCountries = createAsyncThunk(
  'countries/fetch',
  async () => {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,region,flag')
    if (!res.ok) throw new Error('Failed to fetch countries')
    return res.json()
  }
)

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  regionFilter: 'All',
  visibleCount: 20
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setRegionFilter(state, action) {
      state.regionFilter = action.payload
      state.visibleCount = 20
    },
    loadMore(state) {
      state.visibleCount += 20
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setRegionFilter, loadMore } = countriesSlice.actions
export default countriesSlice.reducer
