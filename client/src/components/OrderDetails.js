import React, { Component } from "react";
import axios from "axios";
import formatCurrency from "../helpers/formatters"
import CartItem from "./CartItem";
import { withRouter } from "react-router-dom";

class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderItems: []
        };
    }

    componentDidMount() {

        const order_id = this.props.match.params.order_id

        axios.get(`http://localhost:8000/orders/${order_id}`, {}).then((response) => {
            console.log(response.data)
            this.setState({ orderItems: response.data });
        });
    }

    totalPrice = () => {
        return Array.isArray(this.state.orderItems) ? this.state.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) : 0.00;
    }

    render() {

        const { orderItems } = this.state;

        return (
            <div>

                <h1>Order Details</h1>

                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>

                        {Array.isArray(orderItems) && orderItems.map((orderItem, index) => (
                            <CartItem key={index} item={orderItem} allowEdit={false} />
                        ))}
                    </tbody>
                </table>

                <div className="totals-bar">
                    <div id="cart-total">
                        Order Total: {formatCurrency(this.totalPrice())}
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(OrderDetails);
