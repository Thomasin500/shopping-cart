import React from "react";
import ShoppingItem from "../components/ShoppingItem";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//TODO need to test adding to cart
describe('ShoppingItem', () => {

    it('Renders a basic Shopping Item without edit buttons', done => {

        const item = {
            name: 'Item One',
            price: 1.99,
            quantity: 2
        }

        const wrapper = mount(<ShoppingItem item={item} />);
        const html = wrapper.find('#shopping-item').html()

        expect(html).toContain('name: Item One');
        expect(html).toContain('price: $1.99'); //after formatting

        done();
    });

    it('Renders a Cart Item with edit buttons', done => {

        const item = {
            name: 'Item Two',
            price: 2.25,
        }

        const wrapper = mount(<ShoppingItem item={item} />);
        const html = wrapper.find('#shopping-item').html()

        expect(html).toContain('name: Item Two');
        expect(html).toContain('price: $2.25'); //after formatting

        const addToCart = wrapper.find('#addToCart');
       
        expect(addToCart.length).toEqual(1);

        done();
    });
});
