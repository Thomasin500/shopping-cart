import React from "react";
import formatCurrency from "../helpers/formatters"

//todo styling
const CartItem = props => {

    //TODO remove item from cart

    const { item, changeQuantity, removeFromCart } = props;

    return (
        <div>
            name: { item.name }
            price: { formatCurrency(item.price) }
            quantity: { item.quantity }
            <button onClick={ () => changeQuantity(-1, props.index, item.item_id) }> Decrement Quantity </button>
            <button onClick={() => changeQuantity(1, props.index, item.item_id)}> Increment Quantity </button>
            <button onClick={() => removeFromCart(props.index, item.item_id)}> Remove From Cart </button>
        </div>
    );
}

export default CartItem;