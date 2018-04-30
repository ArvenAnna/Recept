import * as React from 'react';
import styled from 'styled-components';
import {ChangeEvent} from 'react';
import {AddIcon} from '../styled/icons.jsx';
import {TextField, DropdownList} from '../styled/textFields.jsx';
import {isDescendantOf} from '../../utils/domUtils';

//noinspection TypeScriptUnresolvedVariable
const FieldAndButton = styled.div`
    display: flex;
    align-items: center;
    
    .flex_input {
        flex: 1;
    }
`
//noinspection TypeScriptUnresolvedVariable
const Container = styled.div`
    .outlined {
        color: ${props => props.theme.button};
        font-weight: 600;
    }
`

interface Suggestion {
    id: number;
    name: string;
}

export interface InputWithButtonFormProps {
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
    outlined: number;
}

interface InputWithButtonFormI {
    container: any;
}

class InputWithButtonForm extends React.Component<InputWithButtonFormProps, InputWithButtonFormState> implements InputWithButtonFormI {

    container: any = null;

    constructor(props: InputWithButtonFormProps) {
        super(props);
        this.state = {
            value: '',
            opened: false,
            outlined: 0
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', (e: Event) => this.clickOutside(e));
        document.addEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.clickOutside(e));
        document.removeEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    onKeyPress(key: string) {
        if (this.state.opened) {
            const suggestions = this.filterSuggestions();
            const {outlined} = this.state;
            if (key == 'ArrowDown') {
                if(outlined == suggestions.length - 1) {
                    this.setState({outlined: 0});
                } else {
                    this.setState({outlined: outlined + 1});
                }
            }
            if (key == 'ArrowUp') {
                if(outlined == 0) {
                    this.setState({outlined: suggestions.length - 1});
                } else {
                    this.setState({outlined: outlined - 1});
                }
            }
            if (key == 'Enter') {
                this.setState({value: suggestions[outlined].name, opened: false})
            }
        }
    }

    onSelect(item: Suggestion, index: number) {
        this.setState({value: item.name, outlined: index});
    }

    onChangeInput(value: string) {
        this.setState({value});
    }

    clearInput() {
        this.setState({value: ''});
    }

    getValue() {
        const {suggestions, onButtonClick, suggestionsRequired} = this.props;
        const {value} = this.state;
        if (value) {
            console.log(suggestions);
            const sendingValue = (!suggestions || !suggestions.length)
                ? (suggestionsRequired ? null : value)
                : this.filterSuggestions().find((item: Suggestion) => item.name == value);
            if (sendingValue) {
                onButtonClick(sendingValue);
            }
            this.clearInput();
        }
    }

    filterSuggestions() {
        const {suggestionExcludes, suggestions} = this.props;
        if (suggestionExcludes && suggestionExcludes.length) {
            return suggestions.filter((sug: Suggestion, i) =>  !suggestionExcludes.find(s => s.name == sug.name));
        }
        return suggestions;
    }

    clickOutside(e: Event) {
        if (isDescendantOf(e.target, this.container)) {
            this.setState({opened: !this.state.opened});
        } else {
            this.setState({opened: false});
        }
    }

    render() {
        const {placeholder, className} = this.props;
        const {value, opened, outlined} = this.state;
        const suggestions = this.filterSuggestions();
        return (
            <Container className={className}>
                <FieldAndButton>
                    <TextField className='flex_input' innerRef={(r: any) => this.container = r}
                       placeholder={placeholder || 'enter text'}
                       value={value}
                       size={1}
                       onChange={(e:ChangeEvent<HTMLInputElement>) => this.onChangeInput(e.target.value)}/>
                    <AddIcon onClick={this.getValue}/>
                </FieldAndButton>
                {suggestions && suggestions.length != 0 && opened &&
                <DropdownList>
                    {this.filterSuggestions().map((item, index) =>
                        <div key={item.id}
                             onClick={() => this.onSelect(item, index)}
                             className={outlined == index ? 'outlined' : ''}>{item.name}</div>)}
                </DropdownList>
                }
            </Container>
        );
    }
}

export default InputWithButtonForm;