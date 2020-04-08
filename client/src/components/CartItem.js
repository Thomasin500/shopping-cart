import React from "react";
import PropTypes from 'prop-types';
import formatCurrency from "../helpers/formatters";

//todo styling
const CartItem = props => {

    const { item, changeQuantity, removeFromCart, allowEdit } = props;

    let editButtons;

    if (allowEdit) {
        editButtons = (
            <div id="edit-buttons">
                <button id="decrementQuantity" onClick={() => changeQuantity(-1, props.index, item.item_id)}> Decrement Quantity </button>
                <button id="incrementQuantity" onClick={() => changeQuantity(1, props.index, item.item_id)}> Increment Quantity </button>
                <button id="remove" onClick={() => removeFromCart(props.index, item.item_id)}> Remove From Cart </button>
            </div>
        );
    }

    return (
        <div id="cart-item" >
            name: { item.name }
            price: { formatCurrency(item.price) }
            quantity: { item.quantity}

            {editButtons}
        </div>
    );
}

CartItem.defaultProps = {
    allowEdit: true
};

CartItem.propTypes  = {
    allowEdit: PropTypes.bool
}

export default CartItem;