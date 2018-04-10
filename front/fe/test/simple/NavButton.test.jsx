import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('react-router-dom', () => 'NavLink');

import NavButton from '../../components/simple/NavButton';

describe('NavButton', () => {

    let navMenuButton;

    afterEach(() => {
        navMenuButton.unmount();
    });

    it('should render text', () => {
        const mockText = "mock text";
        const mockLink = "/link";
        const item = {
            name: mockText,
            to: mockLink
        }
        navMenuButton = mount(
            <NavButton item={item}/>
        );

        const innerHtml = navMenuButton.find(`.nav_button`);

        expect(innerHtml.length).toBe(1);
        expect(innerHtml.text()).toBe(mockText);
    });
});

describe('NavButton match snapshot', () => {
    it('should render correctly', () => {
        const mockText = "mock text";
        const mockLink = "/link";
        const item = {
            name: mockText,
            to: mockLink
        }
        const output = shallow(
            <NavButton item={item}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});