import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/cart', {}).then((response) => {
            console.log(response.data)
            this.setState({ items: response.data });
        });
    }

    render() {

        const { items } = this.state;

        //TODO how to styling the cart?
        return (
            <div>
                <h1>Shopping Cart</h1>
                <div>               
                    {items.map( item => (
                        <CartItem key={item.item_id} item={item} />
                    ))}
                </div >
                Your Total is $100
            </div>
        );
    }
}

export default Cart;