import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
//import Alert from 'react-s-alert';

jest.mock('../../components/styled/icons', () => ({SearchIcon: 'search-icon'}));

// jest.mock('react-s-alert', () => {
//     const RealModule = require.requireActual('react-s-alert');
//     const MyModule = {
//        // RealThing: RealModule.RealThing,
//     info: mockAlert
// };
//     return MyModule;
// 	//{Alert: {info: mockAlert}}
// });

//jest.mock('react-s-alert');

import ReceptFileInput from '../../components/forms/ReceptFileInput';

 describe('ReceptFileInput', () => {

	it('should render title', () => {
		const title = 'title';

		const component = mount(
			 <ReceptFileInput title={title}/>
		);

		expect(component.filterWhere(item => item.text() == title).length).toBe(1);
	});

	it('should call onChangeInput when file is chosen', () => {
		const onChange = jest.fn();
		const fileName = 'myFile';
		const file = new File([], fileName);

		const component = mount(
			<ReceptFileInput onChangeInput={onChange}/>
		);

		component.find('input').simulate('change', {target: {files: [file]}});

		expect(component.state().name).toBe(fileName);
		expect(onChange.mock.calls.length).toEqual(1);
		expect(onChange).toBeCalledWith(file);

	});

	 it('should clean file name', () => {
		 const fileName = 'myFile';

		 const component = mount(
			 <ReceptFileInput />
		 );

		 component.setState({ name: fileName });
		 component.setProps({clean: true});

		 expect(component.state().name).not.toBe(fileName);
	 });

 });

describe('ReceptFileInput match snapshot', () => {
	it('should render correctly', () => {
		const output = shallow(
			<ReceptFileInput/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});