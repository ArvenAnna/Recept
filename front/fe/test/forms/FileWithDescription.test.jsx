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

describe('FileWithDescription', () => {

	let component;

	afterEach(() => {
		component.unmount();
	});

	xit('should not call add detail and show alert if file is not chosen', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);

		expect(component.find('text').length).toBe(1);
        component.find('text').simulate('change', 'someText');

        //console.log(component.debug());

        expect(component.find('add-icon').length).toBe(1);
        component.find('add-icon').simulate('click');
        expect(addDetail.mock.calls.length).toEqual(0);
        expect(Alert.info).toBeCalled();
        //expect(Alert.info.mock.calls.length).toEqual(1);
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

        expect(component.find('add-icon').length).toBe(1);
        component.find('add-icon').simulate('click');
        expect(component.find('input').length).toBe(1);

        const fileUrl = 'myFile';

        const readerOnLoadPromise = Promise.resolve({target: {result: fileUrl}});
        component.reader = {
            onload: readerOnLoadPromise,
            readAsDataURL: data => {}
		}

		const file = new File([], 'myFile');


        component.find('input').simulate('change', {target: {files: [file]}});

        return readerOnLoadPromise.then(() => {

            expect(component.find('add-icon').length).toBe(1);
            component.find('add-icon').simulate('click');


            console.log(component.state());
            expect(component.state().fileUrl).toBe(fileUrl);
			//expect(addDetail.mock.calls.length).toEqual(1);
			//expect(Alert.info).not.toBeCalled();


            console.log(component.debug())

            expect(component.state()).to.have.property('fileUrl', true);
		})

	});

    xit('should load multiple files', () => {
        const addDetail = jest.fn();
        component = mount(
			<FileWithDescription addDetail={addDetail}/>
        );
    });

	xit('should show correct image after it was loaded', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
	});

	xit('should show alert if image can not be loaded by url', () => {
		const addDetail = jest.fn();
		component = mount(
			<FileWithDescription addDetail={addDetail}/>
		);
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