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

    it('should render image with overlay and remove icon', () => {
        const onRemove = () => {};
        const src = '/src';
        image = mount(
            <Image onRemove={onRemove} src={src}/>
        );

        const innerHtml = image.find('img');
        expect(innerHtml.length).toBe(1);

        expect(innerHtml.find('img').prop('src')).toEqual(src);

        expect(image.find('overlay').length).toEqual(1);
        expect(image.find('remove-icon').length).toEqual(1);

    });

    it('should call onClick when click remove icon', () => {
        const onRemove = jest.fn();

        image = mount(
            <Image onRemove={onRemove} src={'/src'}/>
        );

        expect(image.find('remove-icon').length).toEqual(1);

        image.find('remove-icon').simulate('click');

        expect(onRemove.mock.calls.length).toEqual(1);

    });

    it('should render image without overlay and remove icon', () => {
        const src = '/src';
        image = mount(
            <Image src={src}/>
        );

        const innerHtml = image.find('img');
        expect(innerHtml.length).toBe(1);

        expect(innerHtml.find('img').prop('src')).toEqual(src);

        expect(image.find('overlay').length).toEqual(0);
        expect(image.find('remove-icon').length).toEqual(0);
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