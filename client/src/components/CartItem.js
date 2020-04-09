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
                <button id="decrementQuantity" onClick={() => changeQuantity(item, -1, props.index)}> Decrement Quantity </button>
                <button id="incrementQuantity" onClick={() => changeQuantity(item, 1, props.index)}> Increment Quantity </button>
                <button id="remove" onClick={() => removeFromCart(props.index, item.item_id)}> Remove From Cart </button>
            </div>
        );
    }

    return (
        <tr id="cart-item">
            <td>{item.name}</td>
            <td align="center">
                <div className="shopping-item-desc">{item.description}</div>
            </td>
            <td align="center">{formatCurrency(item.price)}</td>
            <td align="center">
                <span>
                    {item.quantity}
                </span>
            </td>
            <td align="center">{formatCurrency(item.price * parseInt(item.quantity))}</td>
            <td align="center">
                <span className="shopping-item-actions">{editButtons}</span>
            </td>
        </tr> 
    );
}

CartItem.defaultProps = {
    allowEdit: true
};

CartItem.propTypes  = {
    allowEdit: PropTypes.bool
}

export default CartItem;
