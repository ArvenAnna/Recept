import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Alert from 'react-s-alert';

jest.mock('../../components/styled/icons', () => ({AddIcon: 'add-icon', RemoveIcon: 'remove-icon', SearchIcon: 'search-icon'}));
jest.mock('../../components/styled/textFields', () => ({Text: 'text'}));
jest.mock('../../components/styled/overlay', () => ({Overlay: 'overlay'}));
// jest.mock('react-s-alert', () => {
//     const RealModule = require.requireActual('react-s-alert');
//     const MyModule = {
//        // RealThing: RealModule.RealThing,
//     info: mockAlert
// };
//     return MyModule;
// 	//{Alert: {info: mockAlert}}
// });

jest.mock('react-s-alert');

import FileWithDescription from '../../components/forms/FileWithDescription';

xdescribe('FileWithDescription', () => {

	let component;
	let addDetail;
	const fileUrl = 'myFile';
	const file = new File([], 'myFile');

	// beforeAll(() => {
	// 	//return initializeCityDatabase();
	// });

	beforeEach(() => {
		addDetail = jest.fn();

		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
		component.instance().reader = {
			readAsDataURL: () => component.instance().reader.onload({target: {result: fileUrl}})
		}
	});

	afterEach(() => {
		Alert.info.mockClear();
		Alert.error.mockClear();
		component.unmount();
	});

	it('should not call add detail and show alert if file is not chosen', () => {
		const text = 'someText';

		expect(component.find('text').length).toBe(1);
		expect(component.state().text).toBe('');

        component.find('text').simulate('change', {target: {value: text}});

		expect(component.state().text).toBe(text);

        expect(component.find('add-icon').length).toBe(1);
        component.find('add-icon').simulate('click');
        expect(addDetail.mock.calls.length).toEqual(0);
        expect(Alert.info).toBeCalled();
	});

	it('should call add detail if file is chosen', () => {
        expect(component.find('input').length).toBe(1);

        component.find('input').simulate('change', {target: {files: [file]}});

		expect(component.state().fileUrl).toBe(fileUrl);
		expect(component.state().file).toBe(file);
		expect(component.find('img').length).toBe(1);
		expect(component.find('input').length).toBe(0);
		expect(component.find('img').prop('src')).toBe(fileUrl);

		//console.log(component.debug());

		expect(component.find('add-icon').length).toBe(1);
		component.find('add-icon').simulate('click');

		expect(addDetail.mock.calls.length).toEqual(1);
		expect(addDetail).toBeCalledWith('', file);
		expect(Alert.info).not.toBeCalled();
		expect(component.state().fileUrl).toBe(null);
		expect(component.state().file).toBe(null);

		//jest.useFakeTimers();
		//setTimeout(() => {
			//component.update();
		//}, 500);
		//jest.runAllTimers();

	});

	it('should remove chosen file and dont add detail after that', () => {
		expect(component.find('input').length).toBe(1);

		component.find('input').simulate('change', {target: {files: [file]}});

		expect(component.find('img').length).toBe(1);
		expect(component.find('img').prop('src')).toBe(fileUrl);

		expect(component.find('remove-icon').length).toBe(1);
		component.find('remove-icon').simulate('click');

		expect(component.find('img').length).toBe(0);
		expect(component.find('input').length).toBe(1);
		expect(component.state().file).toBe(null);

		expect(component.find('add-icon').length).toBe(1);
		component.find('add-icon').simulate('click');

		expect(addDetail.mock.calls.length).toEqual(0);
		expect(Alert.info).toBeCalled();
	});

	it('should show alert if image can not be loaded by url', () => {
		component.instance().reader = {
			readAsDataURL: () => component.instance().reader.onerror()
		}
		expect(component.find('input').length).toBe(1);

		component.find('input').simulate('change', {target: {files: [file]}});
		expect(Alert.error).toBeCalled();
	});
});

xdescribe('FileWithDescriptionItem match snapshot', () => {
	it('should render correctly', () => {
		const output = shallow(
			<FileWithDescription/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});