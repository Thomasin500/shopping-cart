import React from "react";
import formatCurrency from "../helpers/formatters"

//todo styling
const CartItem = props => {

    const { item, changeQuantity } = props;

    return (
        <div>
            name: { item.name }
            price: { formatCurrency(item.price) }
            quantity: { item.quantity }
            <button onClick={ () => changeQuantity(-1, props.index, item.item_id) }> Decrement Quantity </button>
            <button onClick={ () => changeQuantity(1, props.index, item.item_id) }> Increment Quantity </button>
        </div>
    );
}

export default CartItem;