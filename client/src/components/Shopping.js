import React, { Component } from "react";
import axios from "axios";
import ShoppingItem from "./ShoppingItem";

class Shopping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/shopping', {}).then((response) => {
            this.setState({ items: response.data });
        });
    }

    render() {

        const { items } = this.state;

        return (
            <div>
                <h2>Shopping for Things to Buy</h2>

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