import React, { Component } from "react";
import ShoppingItem from "./ShoppingItem";

class Shopping extends Component {

    render() {
        return (
            <div>
                <h2>Shopping for Things to Buy</h2>

                <div>

                    {this.props.items.map((item, index) => (
                        <ShoppingItem key={item.id} item={item} />
                    ))}
                </div >
               
            </div>
        );
    }
}

export default Shopping;