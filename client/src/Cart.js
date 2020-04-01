import React, { Component } from "react";
import CartItem from "./CartItem";

class Cart extends Component {
    render() {

        //TODO how to styling the cart?

        return (
            <div>

                <h1>Shopping Cart</h1>

               

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