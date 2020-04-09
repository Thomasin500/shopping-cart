import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import formatCurrency from "../helpers/formatters";
import '../css/Cart.css';

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            orderPlaced: false
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/cart', {}).then((response) => {
            this.setState({ items: response.data });
        });
    }

    totalPrice = () => {
        return this.state.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    orderCart = () => {
        axios.post('http://localhost:8000/cart/order', {}).then((response) => {
            this.setState({ items: [], orderPlaced: true });
        });
    }

    render() {

        const { items } = this.state;

        if (items.length) {
            return (
                <div id="checkout-container">
                    <h1>Please review your order</h1>

                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>

                            {Array.isArray(items) && items.map((item, index) => (
                                <CartItem key={index} allowEdit={false} index={index} item={item} />
                            ))}
                        </tbody>
                    </table>

                    <div className="totals-bar">
                        <div id="cart-total">
                            Your Total is {formatCurrency(this.totalPrice())}
                        </div>
                        <button className="checkout-link" onClick={() => this.orderCart()}> To order these items please click here </button>
                    </div>
                </div>
            );
        } else if (this.state.orderPlaced) {
            return <h1>You have successfully place your order!</h1>
        } else {
            return (
                <div id="empty-checkout">
                    <h1>You have no items in your shopping cart to checkout!</h1>
                </div>
            );
        }
    }
}

export default Checkout;