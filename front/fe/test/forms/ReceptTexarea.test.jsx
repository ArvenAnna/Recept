import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import ReceptTextarea from '../../components/forms/ReceptTextarea';

describe('ReceptTextarea', () => {
	it('should call onChange', () => {
		const onChange = jest.fn();
		const text = 'text';
		const component = mount(
			<ReceptTextarea onChangeTextarea={onChange}/>
		);
		component.find('textarea').simulate('change', {target: {value: text}});
		expect(onChange.mock.calls.length).toBe(1);
		expect(onChange).toBeCalledWith(text);
	});

	it('should set initial value', () => {
		const onChange = jest.fn();
		const initialValue = 'text';
		const component = mount(
			<ReceptTextarea onChangeTextarea={onChange} initialValue={initialValue}/>
		);
		expect(component.state().value).toBe(initialValue);
	});

	it('should change initial value', () => {
		const onChangeTextarea = jest.fn();
		const initialValue = 'text';
		const component = mount(
			<ReceptTextarea onChangeTextarea={onChangeTextarea}/>
		);
		component.setState({value: 'another text'});
		component.setProps({initialValue, onChangeTextarea});
		expect(component.state().value).toBe(initialValue);
		expect(onChangeTextarea.mock.calls.length).toBe(0);
	});
});

describe('ReceptTextarea match snapshot', () => {
	it('should render correctly', () => {
		const output = shallow(
			<ReceptTextarea/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});