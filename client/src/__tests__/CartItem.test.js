import React from "react";
import CartItem from "../components/CartItem";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//TODO need to test button clicks
describe('Cart Item', () => {

    it('Renders a basic Cart Item without edit buttons', done => {

        const item = {
            name: 'Item One',
            price: 1.99,
            quantity: 2
        }

        const wrapper = mount(
            <table>
                <tbody>
                    <CartItem item={item} allowEdit={false} />               
                </tbody>
            </table>
        );
        const html = wrapper.find('#cart-item').html()

        expect(html).toContain('Item One');
        expect(html).toContain('$1.99'); //after formatting
        expect(html).toContain('2');
        expect(wrapper.find('#edit-buttons').length).toEqual(0);

        done();
    });

    it('Renders a Cart Item with edit buttons', done => {

        const item = {
            name: 'Item Two',
            price: 2.25,
            quantity: 3
        }

        const wrapper = mount(
            <table>
                <tbody>
                    <CartItem item={item} />
                </tbody>
            </table>
        );
        const html = wrapper.find('#cart-item').html()

        expect(html).toContain('Item Two');
        expect(html).toContain('$2.25'); //after formatting
        expect(html).toContain('3');

        expect(wrapper.find('#edit-buttons').length).toEqual(1);

        const decrement = wrapper.find('#decrementQuantity');
        const increment = wrapper.find('#incrementQuantity');
        const remove = wrapper.find('#remove');

        expect(decrement.length).toEqual(1);
        expect(increment.length).toEqual(1);
        expect(remove.length).toEqual(1);

        done();
    });
});
