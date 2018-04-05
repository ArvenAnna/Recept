import * as React from 'react';
import styled from 'styled-components';
import {ChangeEvent} from 'react';
import {AddIcon} from '../styled/icons.jsx';
import {TextField, DropdownList} from '../styled/textFields.jsx';

//noinspection TypeScriptUnresolvedVariable
const FieldAndButton = styled.div`
    margin: 5px 5px 5px 0;
`

interface Suggestion {
    id: number;
    name: string;
}

interface InputWithButtonFormProps {
    placeholder: string;
    onButtonClick: (value: any) => void;
    suggestions: Array<Suggestion>;
    suggestionExcludes: Array<Suggestion>;
    suggestionsRequired: boolean;
    className: string;
}

interface InputWithButtonFormState {
    value: string;
    opened: boolean;
}

class InputWithButtonForm extends React.Component<InputWithButtonFormProps, InputWithButtonFormState> {
    constructor(props: InputWithButtonFormProps) {
        super(props);
        this.state = {
            value: '',
            opened: false
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    onChangeInput({target}: ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: (target as HTMLInputElement).value
        });
    }

    clearInput() {
        this.setState({
            value: ''
        });
    }

    getValue() {
        const {suggestions, onButtonClick, suggestionsRequired} = this.props;
        const {value} = this.state;
        if (value) {
            const sendingValue = (!suggestions || !suggestions.length)
                ? (suggestionsRequired ? null : value)
                : suggestions.find((item: Suggestion) => item.name == value);
            if (sendingValue) {
                onButtonClick(sendingValue);
            }
            this.clearInput();
        }
    }

    filterSuggestions() {
        const {suggestionExcludes, suggestions} = this.props;
        if (suggestionExcludes && suggestionExcludes.length) {
            return suggestions.filter((sug: Suggestion) => !suggestionExcludes.includes(sug));
        }
        return suggestions;
    }

    componentDidMount() {
        document.addEventListener('click', (e) => this.clickOutside(e), true)
    }

    clickOutside(e: any) {
        if (!this.isDescendantOf(e.target, this.container)) {
            this.setState({opened: false});
        }
    }

    isDescendantOf(element: any, parent: any) {
        let node = element;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    render() {
        const {placeholder, suggestions} = this.props;
        const {value} = this.state;
        return (
            <FieldAndButton className={this.props.className}>
                <TextField
                       placeholder={placeholder || 'enter text'}
                       value={value}
                       onChange={this.onChangeInput}/>
                {suggestions &&
                <DropdownList ref={r => this.container=r}>
                    {this.filterSuggestions().map(item =>
                        <div key={item.id}>{item.name}</div>)}
                </DropdownList>
                }
                <AddIcon onClick={this.getValue}/>
            </FieldAndButton>
        );
    }
}

export default InputWithButtonForm;