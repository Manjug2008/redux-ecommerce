import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    data:[],
    status: 'Idle'
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        // fetchProducts(state, action){
        //     state.data = action.payload
        // }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProductsFromApi.pending, (state, action)=>{
            state.status = 'Loading'
        })
        .addCase(getProductsFromApi.fulfilled, (state, action)=>{
            state.data = action.payload
            state.status = 'Idle'
        })
        .addCase(getProductsFromApi.rejected, (state, action)=>{
            state.status = 'error'
        })


    }
})

export const {fetchProducts}  = productSlice.actions
export default productSlice.reducer

export const getProductsFromApi = createAsyncThunk('products/get', async()=>{
    const data = await fetch('https://fakestoreapi.com/products')
    const result =  await data.json()
    return result
}) 
// export const getProductsFromApi = ()=>{
//     return async function getProductsThunk(dispatch, getState){

//         const data = await fetch('https://fakestoreapi.com/products')
//         const result =  await data.json()
//         console.log(result)
//         dispatch(fetchProducts(result))

//     }
// }