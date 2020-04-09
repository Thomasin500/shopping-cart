import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import formatCurrency from "../helpers/formatters";
import '../css/Cart.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/cart', {}).then((response) => {
            this.setState({ items: response.data });
        });
    }

    changeQuantity = (item, amount, item_index) => {
        if ((item.quantity + amount) >= 1) {
            axios.put(`http://localhost:8000/cart/changeitemquantity/${item.id}/${amount}`).then((response) => {
                const updatedItems = this.state.items.slice();
                updatedItems[item_index].quantity += amount;
                this.setState({ items: updatedItems });
            });
        }
    }

    removeFromCart = (item_index, item_id) => {
        axios.delete(`http://localhost:8000/cart/removefromcart/${item_id}`).then((response) => {
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

        if (items.length) {

            return (
                <div id="shopping-cart">

                    <h1>Shopping Cart</h1>

                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>

                            {Array.isArray(items) && items.map((item, index) => (
                                <CartItem key={index} index={index} item={item} removeFromCart={this.removeFromCart} changeQuantity={this.changeQuantity} />                                                     
                            ))}
                        </tbody>
                    </table>

                    <div className="totals-bar">
                        <div id="cart-total">
                            Your Total is {formatCurrency(this.totalPrice())}
                        </div>
                        <a className="checkout-link" href="/checkout">Checkout</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="empty-cart-container">
                    <h2>Welcome to your Shopping Cart! Please add items to see your order here</h2>
                </div>
            );
        }
    }
}

export default Cart;


