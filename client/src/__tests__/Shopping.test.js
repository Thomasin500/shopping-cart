import React from "react";
import Shopping from "../components/Shopping";
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

describe('Shopping', () => {

    //TODO not finding total ID or something like that
    it('renders an empty Shopping list', done => {

        const wrapper = mount(<Shopping />);

        expect(wrapper.state().items).toEqual([]);

        done();
    });

    
    it('renders a list of Shopping items', done => {

        var mock = new MockAdapter(axios);

        const data = [
            {
                name: 'Item One',
                quantity: 1,
                price: 1.00
            },
            {
                name: 'Item Two',
                quantity: 2,
                price: 2.50
            },
            {
                name: 'Item Three',
                quantity: 3,
                price: 4.50
            }
        ];
        //total = 19.50

        mock.onGet('http://localhost:3001/shopping').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(<Shopping />);

        expect(wrapper.state().items).toEqual([]);

        expect(getSpy).toBeCalled();

        //results is an array of all calls to the mocked function
        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {

            const currentState = wrapper.state();

            expect(currentState.items).toEqual(data);

            mock.restore();
            done();
        });
    });
}); 
