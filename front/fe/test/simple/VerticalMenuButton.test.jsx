import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

// jest.mock("react-redux/es/connect/connect", () => ({
// }));

import VerticalMenuButton from '../../components/simple/VerticalMenuButton';

describe('VerticalMenuButton', () => {

    let verticalMenuButton;

    afterEach(() => {
        verticalMenuButton.unmount();
    });

    // it('should render if message is present', () => {
    //     const mockText = "mock text";
    //     const mockClassName = "mock_className";
    //     backendError = mount(
    //         <BackendError message={mockText} className={mockClassName}/>
    //     );
    //     const innerHtml = backendError.find(`div .${mockClassName}`);
    //
    //     expect(innerHtml.length).toBe(1);
    //     expect(innerHtml.text()).toBe(mockText);
    // });
    //
    // it('should render nothing if message is absent', () => {
    //     const mockClassName = "mock_className";
    //     backendError = mount(
    //         <BackendError className={mockClassName}/>
    //     );
    //     const innerHtml = backendError.find(`div .${mockClassName}`);
    //
    //     expect(innerHtml.exists()).toBe(false);
    // });
});

describe('VerticalMenuButton match snapshot', () => {
    it('should render correctly', () => {
        const output = shallow(
            <VerticalMenuButton message="mock text"/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});