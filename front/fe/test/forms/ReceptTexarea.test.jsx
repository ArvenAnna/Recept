import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

//jest.mock('../../components/styled/textFields', () => ({Text: 'textarea'}));

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

	it('should auto grow when a lot of text entered', () => {
		const onChangeTextarea = jest.fn();
		//const initialValue = 'text';
		const component = mount(
			<ReceptTextarea onChangeTextarea={onChangeTextarea}/>
		);
		//component.instance().text = mount(<textarea/>).instance();
		const target = component.instance().text;
		//console.log(target.style.height);
		//target.scrollHeight = 24;
		target.style.height = (parseInt(target.scrollHeight) - 2) + 'px';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		component.find('textarea').simulate('keyup', {target});
		expect(component.instance().text.style.height).toBe(target.scrollHeight);
		// component.setState({value: 'another text'});
		// component.setProps({initialValue, onChangeTextarea});
		// expect(component.state().value).toBe(initialValue);
		// expect(onChangeTextarea.mock.calls.length).toBe(0);
	});

	it('should auto shrink when less text entered', () => {
		const onChangeTextarea = jest.fn();
		const initialValue = 'text';
		const component = mount(
			<ReceptTextarea onChangeTextarea={onChangeTextarea}/>
		);
		// component.setState({value: 'another text'});
		// component.setProps({initialValue, onChangeTextarea});
		// expect(component.state().value).toBe(initialValue);
		// expect(onChangeTextarea.mock.calls.length).toBe(0);
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