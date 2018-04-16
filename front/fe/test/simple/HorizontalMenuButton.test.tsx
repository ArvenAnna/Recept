import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('react-router-dom', () => ({NavLink: 'nav-link'}));
jest.mock('../../components/styled/buttons', () => ({ActionButton: 'action-button'}));

import HorizontalMenuButton, {HorizontalMenuButtonProps} from '../../components/simple/HorizontalMenuButton';
import Mock = jest.Mock;

describe('HorizontalMenuButton', () => {

    let component;

    const fn: Mock = jest.fn();

    const props: HorizontalMenuButtonProps = {
        text: 'text',
        to: 'linkTo',
        onClick: fn
    };

    afterEach(() => {
        component.unmount();
    });

    it('should render button with link', () => {
        component = mount(
            <HorizontalMenuButton {...props}/>
        );

        expect(component.filterWhere(item => item.text() == props.text).length).toBe(1);
        expect(component.find('nav-link').length).toEqual(1);
        expect(component.find('nav-link').prop('to')).toEqual(props.to);
    });

    it('should render button with onClick', () => {
        component = mount(
            <HorizontalMenuButton {...props}/>
        );

        expect(component.find('.nav_button').length).toEqual(1);

        component.find('.nav_button').simulate('click');

        expect(fn.mock.calls.length).toEqual(1);
    });
});

describe('HorizontalMenuButton match snapshot', () => {
    it('should render correctly', () => {
        const props: HorizontalMenuButtonProps = {
            text: 'text',
            to: 'linkTo',
            onClick: () => {}
        };
        const output = shallow(
            <HorizontalMenuButton {...props}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});