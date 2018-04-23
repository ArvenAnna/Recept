import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('../../components/styled/icons', () => ({SearchIcon: 'search-icon'}));
jest.mock('../../components/styled/textFields', () => ({TextField: 'input'}));

import ReceptInput from '../../components/forms/ReceptInput';

describe('ReceptInput', () => {

	it('should call onChange', () => {
		const onChange = jest.fn();
		const text = 'text';
		const component = mount(
			<ReceptInput onChangeInput={onChange}/>
		);
		component.find('input').simulate('change', {target: {value: text}});
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange).toBeCalledWith(text);
	});

	it('should set initial value', () => {
		const onChange = jest.fn();
		const initialValue = 'text';
		const component = mount(
			<ReceptInput onChangeInput={onChange} initialValue={initialValue}/>
		);
		expect(component.state().value).toBe(initialValue);
	});

	it('should change initial value', () => {
		const onChangeInput = jest.fn();
		const initialValue = 'text';
		const component = mount(
			<ReceptInput onChangeInput={onChangeInput}/>
		);
		component.setState({value: 'another text'});
		component.setProps({initialValue, onChangeInput});
		expect(component.state().value).toBe(initialValue);
		expect(onChangeInput.mock.calls.length).toBe(0);
	});

});

describe('ReceptInput match snapshot', () => {
	it('should render correctly', () => {
		const output = shallow(
			<ReceptInput/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});