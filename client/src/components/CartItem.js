import React, { Component } from "react";

class CartItem extends Component {


    //each item should have an individual price, quantity, total price, name, descripition, etc
    //TODO ability to edit quantity

    render() {
        debugger;

        return (
            <div>
                name: {this.props.item.name}
                price: {this.props.item.price}
            </div>
        );
    }
}

export default CartItem;