import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

jest.mock('../../components/styled/icons', () => ({RemoveIcon: 'remove-icon'}));

import ListItems from '../../components/simple/ListItems';

describe('ListItems', () => {

	let component;
	const items = [{name: 'name'}];

	afterEach(() => {
		component.unmount();
	});

	it('should render list items with remove icon', () => {
		const onRemove = () => {};
		component = mount(
			<ListItems onButtonClick={onRemove} items={items}/>
		);

		expect(component.filterWhere(item => item.text() == items[0].name).length).toBe(1);
		expect(component.find('remove-icon').length).toEqual(1);
	});

	it('should call onClick when click remove icon', () => {
		const onRemove = jest.fn();

		component = mount(
			<ListItems onButtonClick={onRemove} items={items}/>
		);

		expect(component.find('remove-icon').length).toEqual(1);

		component.find('remove-icon').simulate('click');

		expect(onRemove.mock.calls.length).toEqual(1);

	});

	it('should render item without remove icon', () => {
		component = mount(
			<ListItems items={items}/>
		);

		expect(component.find('remove-icon').length).toEqual(0);
	});
});

describe('ListItems match snapshot', () => {
	it('should render correctly', () => {
		const items = [{name: 'name'}];
		const output = shallow(
			<ListItems items={items}/>
		);
		expect(shallowToJson(output)).toMatchSnapshot();
	});
});