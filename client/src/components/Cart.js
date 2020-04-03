import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import formatCurrency from "../helpers/formatters"

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

    changeQuantity = (amount, item_index, item_id) => {
        axios.put(`http://localhost:3001/cart/changeitemquantity/${item_id}/${amount}`).then((response) => {
            //todo copying the whole items array doesnt seem ideal
            const updatedItems = this.state.items.slice();
            updatedItems[item_index].quantity += amount;
            this.setState({ items: updatedItems });
        })
    }

    totalPrice = () => {
        return this.state.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    render() {

        const { items } = this.state;

        //TODO how to styling the cart?
        //todo format price and money in general

        //todo empty cart mewssage
        return (


            <div>
                <h1>Shopping Cart</h1>

                <div>               
                    {items.map( (item, index) => (
                        <CartItem key={index} index={ index } item={ item } changeQuantity={ this.changeQuantity } />
                    ))}
                </div >
                Your Total is { formatCurrency(this.totalPrice()) }
            </div>
        );
    }
}

export default Cart;