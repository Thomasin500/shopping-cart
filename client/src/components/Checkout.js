import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import formatCurrency from "../helpers/formatters"

class Checkout extends Component {

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

    totalPrice = () => {
        return this.state.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    orderCart = () => {
        axios.post('http://localhost:8000/cart/order', {}).then((response) => {
            //TODO probably go to a temporary order success screen
            this.setState({ items: [] });
        });
    }

    render() {

        const { items } = this.state;

        //TODO how to styling the cart?

        if (items.length) {
            return (
                <div id="checkout-container">
                    <h1>Shopping Cart</h1>

                    <div>
                        {items.map((item, index) => (
                            <CartItem key={index} item={item} allowEdit={false} />
                        ))}
                    </div >

                    Your Total is { formatCurrency(this.totalPrice())}


                    <button onClick={() => this.orderCart()}> To order these items please click here </button>


                </div>
            );
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