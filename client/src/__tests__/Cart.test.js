import React from "react";
import Cart from "../components/Cart";
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

describe('Cart', () => {

    //TODO not finding total ID or something like that
    it('renders an empty Cart', done => {

        const wrapper = mount(<Cart />);

        expect(wrapper.state().items).toEqual([]);

        expect(wrapper.find('#empty-cart-container')).toBeTruthy();

        expect(wrapper.find('#empty-cart-container').html())
            .toContain('Welcome to your Shopping Cart! Please add items to see your order here');

        done();
    });

    /*
    it('returns data when sendMessage is called', done => {

        var mock = new MockAdapter(axios);

        const data = [
            {
                name: 123,
                quantity: 3,
                price: 1.25

            }
        ];

        mock.onGet('http://localhost:3001/cart').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(<Cart />);

        const totalText = wrapper.find('#cart-total');
        const abc = wrapper.find('#empty-cart-container')

        console.log('abc children' + JSON.stringify(abc.children()))
        //console.log('wrapper html' + wrapper.html())
        console.log('abc' + JSON.stringify(abc))
        console.log('totalText' + JSON.stringify(totalText))

        expect(wrapper.find('#empty-cart-container')).to.have.lengthOf(1);
        expect(getSpy).toBeCalled();

        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {
            console.log(postResponse.data)

            const currentState = wrapper.state();
            console.log('state' + JSON.stringify(currentState))

            const totalText = wrapper.find('#cart-total');

            //console.log('wrapper html' + wrapper.html())
            console.log(totalText)
            console.log('totalText' + JSON.stringify(totalText))

            expect(currentState.items.includes((postResponse.data.items))).toBe(true);

            done();

        });
    }); */
});
