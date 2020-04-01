import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import Items from "./Items";
import Cart from "./Cart";
import Home from "./Home";

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
                            <Link to="/items">Items for Sale</Link>
                        </li>
                        <li>
                            <Link to="/cart">Shopping Cart</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                   
                    <Route path="/items">
                        <Items />
                    </Route>
                    <Route path="/cart">
                        <Cart />
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
