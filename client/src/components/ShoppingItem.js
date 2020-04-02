import React, { Component } from "react";

class ShoppingItem extends Component {


    //each item should have an individual price, quantity, total price, name, descripition, etc
    //TODO ability to edit quantity

    render() {
        return (
            <div>
                name: {this.props.item.name}
                price: {this.props.item.price}
            </div>
        );
    }
}

export default ShoppingItem;