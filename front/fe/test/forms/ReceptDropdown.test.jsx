import * as React from 'react';
import { shallowToJson } from 'enzyme-to-json';

//const isDescendantOf = jest.fn().mockReturnValue(true);

jest.mock('../../components/styled/icons', () => ({ArrowUp: 'arrow-up-icon', ArrowDown: 'arrow-down-icon'}));
// jest.mock('../../utils/domUtils', () => ({isDescendantOf: jest.fn().mockReturnValue(true)}));

import ReceptDropdown from '../../components/forms/ReceptDropdown';

describe('ReceptDropdown', () => {

    it('should call onChange when one of item selected', () => {
        const onChangeDropdown = jest.fn();
        const items = [{name: 'one'}, {name: 'two'}];
        const component = mount(<ReceptDropdown items={items}
                                                selectedItemIndex={0}
                                                onChangeDropdown={onChangeDropdown}/>);
        component.setState({opened: true});
        console.log(component.debug());

        expect(component.find('.outlined').length).toBe(1);
        expect(component.find('.outlined').text()).toBe(items[0].name);

        component.find('.outlined').simulate('click');
        expect(onChangeDropdown).toHaveBeenCalledWith(items[0]);
    });

});

describe('ReceptDropdown should match snapshot', () => {
    it('should render correctly', () => {
		const onChangeDropdown = jest.fn();
        const items = [{name: 'one'}, {name: 'two'}];
        const output = mount(<ReceptDropdown items={items}
											 onChangeDropdown={onChangeDropdown}
                                             selectedItemIndex={0}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});