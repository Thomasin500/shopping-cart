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

        axios.get(`http://localhost:3001/orders/${order_id}`, {}).then((response) => {
            console.log(response.data)
            this.setState({ orderItems: response.data });
        });
    }

    totalPrice = () => {
        return this.state.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    render() {

        const { orderItems } = this.state;

        return (
            <div>
                {orderItems.map((orderItem, index) => (
                    <CartItem key={index} item={orderItem} allowEdit={false} />
                ))}

                Your Order Total is { formatCurrency(this.totalPrice())}

            </div>
        );

    }
}

export default withRouter(OrderDetails);