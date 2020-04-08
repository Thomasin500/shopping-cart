import React, { Component } from "react";
import axios from "axios";
import ShoppingItem from "./ShoppingItem";
import '../css/Shopping.css';

class Shopping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/shopping', {}).then((response) => {
            this.setState({ items: response.data });
        });
    }

    render() {

        const { items } = this.state;

        console.log(items)

        return (
            <div>
                <h2>Shopping for Things to Buy</h2>

                <div className="shopping-header-container">
                    <div className="shopping-header">Name</div>
                    <div className="shopping-header">Description</div>
                    <div className="shopping-header">Price</div>
                </div>

                <div>
                    {items.map( item => (
                        <ShoppingItem key={item.id} item={item} />
                    ))}
                </div >
               
            </div>
        );
    }
}

export default Shopping;