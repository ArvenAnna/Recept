import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

//const isDescendantOf = jest.fn().mockReturnValue(true);

jest.mock('../../components/styled/icons', () => ({AddIcon: 'add-icon'}));
jest.mock('../../utils/domUtils', () => ({isDescendantOf: jest.fn().mockReturnValue(true)}));

import TwoInputsWithButtonForm from '../../components/forms/TwoInputsWithButtonForm';

describe('TwoInputsWithButtonForm', () => {

    it('should call onClick if item set from suggestions to the first input', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const firstInputClassName = 'fi';
        const secondInputClassName = 'si';
        const secondInputValue = 'si value';
        const component = mount(
            <TwoInputsWithButtonForm onButtonClick={onButtonClick}
                                     suggestions={suggestions}
                                     firstInputClassName={firstInputClassName}
                                     secondInputClassName={secondInputClassName}/>
        );

        component.find(`.${firstInputClassName}`).find('input').simulate('change', {target: {value: suggestions[0].name}});
        component.find(`.${secondInputClassName}`).find('input').simulate('change', {target: {value: secondInputValue}});

        expect(component.state().first).toBe(suggestions[0].name);
        component.find('add-icon').simulate('click');
        expect(onButtonClick).toHaveBeenCalledWith(suggestions[0], secondInputValue);
    });

    it('should not call onClick if item set not from suggestions to the first input', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const firstInputClassName = 'fi';

        const component = mount(
            <TwoInputsWithButtonForm onButtonClick={onButtonClick}
                                     suggestions={suggestions}
                                     firstInputClassName={firstInputClassName}/>
        );

        component.find(`.${firstInputClassName}`).find('input').simulate('change', {target: {value: 'wrong_value'}});

        component.find('add-icon').simulate('click');
        expect(onButtonClick).not.toHaveBeenCalled();
    });

    it('should filter suggestions excludes', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const suggestionExcludes = [{id: 2, name: 'two'}];
        const firstInputClassName = 'fi';

        const component = mount(
            <TwoInputsWithButtonForm onButtonClick={onButtonClick}
                                     suggestions={suggestions}
                                     suggestionExcludes = {suggestionExcludes}
                                     firstInputClassName={firstInputClassName}/>
        );

        component.find(`.${firstInputClassName}`).find('input').simulate('change', {target: {value: suggestions[1].name}});

        component.find('add-icon').simulate('click');
        expect(onButtonClick).not.toHaveBeenCalled();
    });

});

describe('TwoInputsWithButtonForm match snapshot', () => {
    it('should render correctly', () => {
        const output = shallow(
            <TwoInputsWithButtonForm/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});