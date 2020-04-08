import React, { Component } from "react";
import axios from "axios";

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/orders', {}).then((response) => {
            this.setState({ orders: response.data });
        });
    }

    render() {

        const { orders } = this.state;

        //TODO dont have a custom component here, just create a table with a link to order details
        if (orders.length) {
            return (
                <div>
                    {orders.map((order, index) => {

                        let orderDate = new Date(Date.parse(order.created_at));
                        let formattedDate = `${orderDate.getMonth() + 1}/${orderDate.getDate()}/${orderDate.getFullYear()} @ ${orderDate.getHours()}:${orderDate.getMinutes()}`;

                        return (
                            <a key={index} href={`/orders/${order.id}`}>{order.name} {formattedDate}</a>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div id="empty-orders">
                    <h1>You have no previous orders. Once you have placed an order, it will appear here</h1>
                </div>
            );
        }
    }
}

export default Orders;
