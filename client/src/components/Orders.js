import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/orders', {}).then((response) => {
            this.setState({ orders: response.data });
        });
    }

    render() {

        const { orders } = this.state;

        //TODO dont have a custom component here, just create a table with a link to order details
       
        return (
            <div>
                {orders.map((order, index) => (
                    <Link key={index} to={`/orders/${order.id}`}>{order.name}</Link>
                ))}
            </div>
        );
        
    }
}

export default Orders;
