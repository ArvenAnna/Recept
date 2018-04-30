import * as React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import {mount, shallow} from 'enzyme';

//const isDescendantOf = jest.fn().mockReturnValue(true);

jest.mock('../../components/styled/icons', () => ({AddIcon: 'add-icon'}));
// jest.mock('../../utils/domUtils', () => ({isDescendantOf: jest.fn().mockReturnValue(true)}));

import InputWithButtonForm, {InputWithButtonFormProps} from '../../components/forms/InputWithButtonForm';

describe('InputWithButtonForm', () => {

    it('should call onClick if item set from suggestions input', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const component = renderComponent(onButtonClick, suggestions, []);

        component.find('input').simulate('change', {target: {value: suggestions[0].name}});

        expect(component.state().value).toBe(suggestions[0].name);
        component.find('add-icon').simulate('click');
        expect(onButtonClick).toHaveBeenCalledWith(suggestions[0]);
    });

    it('should not call onClick if item set not from suggestions to the first input', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const component = renderComponent(onButtonClick, suggestions, []);

        component.find('input').simulate('change', {target: {value: 'wrong_value'}});

        component.find('add-icon').simulate('click');
        expect(onButtonClick).not.toHaveBeenCalled();
    });

    it('should filter suggestions excludes', () => {
        const onButtonClick = jest.fn();
        const suggestions = [{id: 1, name: 'one'}, {id: 2, name: 'two'}];
        const suggestionExcludes = [{id: 2, name: 'two'}];

        const component = renderComponent(onButtonClick, suggestions, suggestionExcludes);

        component.find('input').simulate('change', {target: {value: suggestions[1].name}});

        component.find('add-icon').simulate('click');
        expect(onButtonClick).not.toHaveBeenCalled();
    });

    it('should call onClick if suggestions are not required', () => {
        const onButtonClick = jest.fn();
        const props:InputWithButtonFormProps = {
            placeholder: 'placeholder',
            onButtonClick: onButtonClick,
            suggestions: [],
            suggestionExcludes: [],
            suggestionsRequired: false,
            className: 'classOfInput'
        }
        const component = mount(
            <InputWithButtonForm {...props}/>
        );

        component.find('input').simulate('change', {target: {value: 'wrong_value'}});

        component.find('add-icon').simulate('click');
        expect(onButtonClick).toHaveBeenCalledWith('wrong_value');
    });

});

describe('TwoInputsWithButtonForm match snapshot', () => {
    it('should render correctly', () => {
        const output = shallowRenderComponent();
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});

const renderComponent = (onButtonClick, suggestions, suggestionExcludes) => {
    const props:InputWithButtonFormProps = {
        placeholder: 'placeholder',
        onButtonClick: onButtonClick,
        suggestions: suggestions,
        suggestionExcludes: suggestionExcludes,
        suggestionsRequired: true,
        className: 'classOfInput'
    }
    return mount(
        <InputWithButtonForm {...props}/>
    );
}

const shallowRenderComponent = () => {
    const props:InputWithButtonFormProps = {
        placeholder: 'placeholder',
        onButtonClick: () => {},
        suggestions: [],
        suggestionExcludes: [],
        suggestionsRequired: true,
        className: 'classOfInput'
    }
    return shallow(
        <InputWithButtonForm {...props}/>
    );
}