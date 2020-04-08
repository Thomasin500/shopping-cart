import React, { Component } from "react";
import axios from "axios";
import '../css/Orders.css';

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

        if (orders.length) {
            return (
                <div>
                    <div className="orders-container">
                        <h2>Orders</h2>
                        <h2 className="orders-date-header">Ordered On</h2>
                    </div>
                    <ul>
                        {orders.map((order, index) => {

                            let orderDate = new Date(Date.parse(order.created_at));
                            let formattedDate = `${orderDate.getMonth() + 1}/${orderDate.getDate()}/${orderDate.getFullYear()}`;
                            let formattedHours = orderDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                            return (
                                <li className="order-item">
                                    <a key={index} href={`/orders/${order.id}`}>{order.name}</a>
                                    <span className="order-date">
                                        {formattedDate} @ {formattedHours}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
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
