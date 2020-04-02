import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";

function callServer() {
    axios.get('http://localhost:3001/shopping', {
        params: {
            table: 'test_table',
        },
    }).then((response) => {
        console.log(response.data);
    });
}

class Cart extends Component {
    render() {

        //TODO how to styling the cart?

        return (
            <div>

                <h1>Shopping Cart 11</h1>

                
                {callServer()}





                <h1>Shopping Cart 22</h1>

               

                <div>
                   
                    {this.props.items.map((item, index) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div >

                Your Total is $100

            </div>

          

            
        );
    }
}

export default Cart;