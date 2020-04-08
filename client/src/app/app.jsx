import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";

import '../css/App.css';
import cartLogo from "../assets/cart.png";
import Shopping from "../components/Shopping";
import Cart from "../components/Cart";
import Home from "../components/Home";
import Checkout from "../components/Checkout";
import Orders from "../components/Orders";
import OrderDetails from "../components/OrderDetails";

function App() {
    return (
        <Router>
            <nav>
                <div className="header-container">
                    <div className="header-item">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="header-item">
                        <Link to="/shopping">Shopping</Link>
                    </div>
                    <div className="header-item">
                        <Link to="/orders">Past Orders</Link>
                    </div>
                    <div className="header-item header-item-about">
                        <Link to="/about">About</Link>
                    </div>
                    <div className="header-item header-item-cart">
                        <Link to="/cart">
                            <img className="cart-image" src={cartLogo}/>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="main-container">
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
                    <Route path="/about">
                        <p>
                            This is a Shopping Cart application created for the tech screening of the Software Engineering role @ <a href="https://www.artifactuprising.com/">Artifact Uprising</a>
                        </p>

                        <h2>Features</h2>
                        <ul>
                            <li>Ability to shop a variety of items for sale and add them to a shopping cart</li>
                            <li>Persistent data through an included mySQL database</li>
                            <li>Ability to edit/change quantities of shopping cart items and remove them entirely if desired</li>
                            <li>A checkout flow to place an order of the items in your cart</li>
                            <li>View past orders and details of that order</li>
                        </ul> 

                        <h2>Stack</h2>
                        <ul>
                            <li>ExpressJS (nodeJS) server</li>
                            <li>React Frontend</li>
                            <li>mySQL database</li>
                            <li>Jest/Enzyme Testing</li>
                            <li>100% Dockerized </li>
                        </ul> 

                        Learn More here:   <a href={`https://github.com/Thomasin500/shopping-cart`}>Github Repo</a>
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
