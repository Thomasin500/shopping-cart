import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";
import axios from "axios";

import './App.css';
import Shopping from "../components/Shopping";
import Cart from "../components/Cart";
import Home from "../components/Home";
import Checkout from "../components/Checkout";
import Orders from "../components/Orders";
import OrderDetails from "../components/OrderDetails";

function callServer() {
    console.log('call server')
    axios.get('http://localhost:8000/test', {}).then((response) => {
        console.log('THEN BLOCK')
        console.log(response.data);
    });
}

function App() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/shopping">Items for Sale</Link>
                        </li>
                        <li>
                            <Link to="/cart">Shopping Cart</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/shopping">
                        <Shopping />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                    <Route path="/orders/:order_id">
                        <OrderDetails />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>     
    );
}

export default App;
