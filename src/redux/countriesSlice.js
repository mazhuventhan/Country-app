import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const res = await fetch('https://restcountries.com/v2/all?fields=name,region,flag')
  return await res.json()
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { countries: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload
      state.status = 'succeeded'
    })
  }
})

export default countriesSlice.reducer
