import React from "react";
import Orders from "../components/Orders";
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

describe('Orders', () => {

    it('renders an empty Order', done => {

        const wrapper = mount(<Orders />);

        expect(wrapper.state().orders).toEqual([]);

        expect(wrapper.find('#empty-orders')).toBeTruthy();

        expect(wrapper.find('#empty-orders').html())
            .toContain('You have no previous orders. Once you have placed an order, it will appear here');

        done();
    });

    //TODO make sure it formats and shows the past orders correctly
    it('renders a history of past Orders', done => {

        var mock = new MockAdapter(axios);

        const data = [
            {
                "id": 1,
                "name": "ORDER #1",
                "created_at": "2020-04-07T21:56:37.000Z"
            },
            {
                "id": 2,
                "name": "ORDER #2",
                "created_at": "2020-04-07T21:56:37.000Z"
            }
        ];

        mock.onGet('http://localhost:8000/orders').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(<Orders />);

        expect(wrapper.state().orders).toEqual([]);

        expect(getSpy).toBeCalled();

        //results is an array of all calls to the mocked function
        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {

            const currentState = wrapper.state();

            expect(currentState.orders).toEqual(data);

            mock.restore();
            done();
        }); 
    }); 
});
