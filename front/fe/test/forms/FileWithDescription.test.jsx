import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('../../components/styled/icons', () => ({AddIcon: 'add-icon', RemoveIcon: 'remove-icon', SearchIcon: 'search-icon'}));
jest.mock('../../components/styled/textFields', () => ({Text: 'text'}));
jest.mock('../../components/styled/overlay', () => ({Overlay: 'overlay'}));

import FileWithDescription from '../../components/forms/FileWithDescription';

describe('FileWithDescription', () => {

	let component;

	afterEach(() => {
		component.unmount();
	});

	it('should not call add detail and show alert if file is not chosen', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);

		// expect(component.find('img').length).toBe(1);
		// expect(component.find('img').prop('src')).toEqual(detail.filePath);
		// expect(component.filterWhere(item => item.text() == detail.description).length).toBe(1);
		// expect(component.find('overlay').length).toEqual(1);
		// expect(component.find('remove-icon').length).toEqual(1);
	});

	it('should call add detail if file is chosen', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
	});

	it('should show correct image after it was loaded', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
	});

	it('should show alert if image can not be loaded by url', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
	});
});

describe('FileWithDescriptionItem match snapshot', () => {
	it('should render correctly', () => {
		const output = shallow(
			<FileWithDescription/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});