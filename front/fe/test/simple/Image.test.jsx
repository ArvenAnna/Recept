import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('../../components/styled/icons', () => ({RemoveIcon: 'remove-icon'}));
jest.mock('../../components/styled/overlay', () => ({Overlay: 'overlay'}));

import Image from '../../components/simple/Image';

describe('Image', () => {

    let image;

    afterEach(() => {
        image.unmount();
    });

    it('should render image', () => {
        const onRemove = () => {};
        const src = '/src';
        image = mount(
            <Image onRemove={onRemove} src={src}/>
        );

        console.log(image.debug())

        const innerHtml = image.find(`.nav_button`);

        expect(innerHtml.length).toBe(1);
        expect(innerHtml.text()).toBe(mockText);
    });
});

describe('Image match snapshot', () => {
    it('should render correctly', () => {
        const output = shallow(
            <Image/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});