import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { remove } from './Store/cartSlice'


export const Cart = () => {
    const cartProducts = useSelector(state => state.cart)
    const productDispatch = useDispatch()

    const removeFromcart = (id)=>{
        productDispatch(remove(id)) //redux dispatch to remove product from cart


    }

    const cards = cartProducts.map((product, index) => {
        return (
            <div className='col-md-12' style={{marginBottom: '10px'}}>
                <Card key={index} className='h-100'>
                <div className='text-center'>
                    <Card.Img variant="top" src={product.image} style={{width: '100px', height:'130px'}}/>
                    </div>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>Rs.{product.price}</Card.Text>

                    </Card.Body>
                    <Card.Footer style={{background:'white'}}>
                    <Button variant="danger" onClick={()=>{ removeFromcart(product.id) }}>Remove Item</Button>
                    </Card.Footer>
                </Card>

            </div>
        )
    })

  return (
    <div className='row'>
        {
            cards
        }
    </div>
  )
}
