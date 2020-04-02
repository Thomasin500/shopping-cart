import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import Shopping from "../components/Shopping";
import Cart from "../components/Cart";
import Home from "../components/Home";

const items = [

    {
        id: 1,
        name: "item one",
        price: 100
    },
    {
        id: 2,
        name: "item two",
        price: 250
    }

];

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
                            <Link to="/Shopping">Items for Sale</Link>
                        </li>
                        <li>
                            <Link to="/cart">Shopping Cart</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                   
                    <Route path="/Shopping">
                        <Shopping items={items} />
                    </Route>
                    <Route path="/cart">
                        <Cart items={items} />
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
