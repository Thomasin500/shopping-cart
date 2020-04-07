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
        console.log('DID MOUNT')
        return axios.get('http://localhost:3001/cart', {}).then((response) => {
            console.log('THEN AFTER CALL')
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

    removeFromCart = (item_index, item_id) => {
        axios.delete(`http://localhost:3001/cart/removefromcart/${item_id}`).then((response) => {
            const updatedItems = this.state.items.slice();
            updatedItems.splice(item_index, 1);
            this.setState({ items: updatedItems });
        })
    }

    totalPrice = () => {
        return this.state.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    render() {

        const { items } = this.state;

        console.log(12345)

        //TODO how to styling the cart?

        if (items.length) {
            return (
                <div>
                    <h1>Shopping Cart</h1>

                    <div>
                        {items.map((item, index) => (
                            <CartItem key={index} index={index} item={item} removeFromCart={this.removeFromCart} changeQuantity={this.changeQuantity} />
                        ))}
                    </div >

                    <div id="cart-total">
                        Your Total is {formatCurrency(this.totalPrice())}
                    </div>

                    <a href="/checkout">Checkout</a>

                </div>
            );
        } else {
            return (
                <div id="empty-cart-container">
                    <h1>Welcome to your Shopping Cart! Please add items to see your order here</h1>
                </div>
            );
        }
    }
}

export default Cart;