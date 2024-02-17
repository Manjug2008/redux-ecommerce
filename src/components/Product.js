import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { add } from './Store/cartSlice'
import { getProductsFromApi } from './Store/productSlice'

export const Product = () => {
    const dispatch = useDispatch()
    const {data: productsData, status} = useSelector(state=>state.products)


    useEffect(() => {
        /** dispatch action for fetch products */
        dispatch(getProductsFromApi())
        
        
    }, [])


    const addToCart = (product)=>{
        // redux dispatch an add action
        dispatch(add(product)) //Product is payload to redux toolkit

    }

    const cards = productsData.map((product, index) => {
        return (
            <div className='col-md-3' style={{marginBottom: '10px'}}>
                <Card key={index} className='h-100'>
                <div className='text-center'>
                    <Card.Img variant="top" src={product.image} style={{width: '100px', height:'130px'}}/>
                    </div>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>Rs.{product.price}</Card.Text>

                    </Card.Body>
                    <Card.Footer style={{background:'white'}}>
                    <Button variant="primary" onClick={()=>{ addToCart(product)}}>Add To Cart</Button>
                    </Card.Footer>
                </Card>

            </div>
        )
    })

    if(status === 'Loading'){
        return <div>Loading....</div>

    }else if(status === 'error'){
        return <div>Something went wrong! Please try later....</div>

    }

    return (
        <div>
            <h1>Product dash board</h1>
            <div className='row'>
            {cards}

            </div>
        </div>
    )
}
