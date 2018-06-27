import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import routes from '../../constants/Routes';

jest.mock('../../components/styled/icons', () => ({RemoveIcon: 'remove-icon'}));
jest.mock('../../components/styled/overlay', () => ({Overlay: 'overlay'}));

import FileWithDescriptionItem from '../../components/simple/FileWithDescriptionItem';

describe('FileWithDescriptionItem', () => {

    let component;
    const detail = {filePath: 'path', description: 'description'};


    afterEach(() => {
        component.unmount();
    });

    it('should render item with overlay and remove icon', () => {
        const onRemove = () => {};
        component = mount(
            <FileWithDescriptionItem removeDetail={onRemove} detail={detail}/>
        );

        expect(component.find('img').length).toBe(1);
        expect(component.find('img').prop('src')).toEqual(routes.IMAGE_CATALOG + detail.filePath);
        expect(component.filterWhere(item => item.text() == detail.description).length).toBe(1);
        expect(component.find('overlay').length).toEqual(1);
        expect(component.find('remove-icon').length).toEqual(1);
    });

    it('should call onClick when click remove icon', () => {
        const onRemove = jest.fn();

        component = mount(
            <FileWithDescriptionItem removeDetail={onRemove} detail={detail}/>
        );

        expect(component.find('remove-icon').length).toEqual(1);

        component.find('remove-icon').simulate('click');

        expect(onRemove.mock.calls.length).toEqual(1);

    });

    it('should render item without overlay and remove icon', () => {
        component = mount(
            <FileWithDescriptionItem detail={detail}/>
        );

        expect(component.find('img').length).toBe(1);

        expect(component.find('img').prop('src')).toEqual(routes.IMAGE_CATALOG + detail.filePath);

        expect(component.find('overlay').length).toEqual(0);
        expect(component.find('remove-icon').length).toEqual(0);
    });
});

describe('FileWithDescriptionItem match snapshot', () => {
    it('should render correctly', () => {
        const detail = {filePath: 'path', description: 'description'};
        const output = shallow(
            <FileWithDescriptionItem detail={detail}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});