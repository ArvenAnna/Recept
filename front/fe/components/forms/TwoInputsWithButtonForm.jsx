import React from "react";
import styled from 'styled-components';
import {TextField} from "../styled/textFields.jsx";
import {AddIcon} from "../styled/icons.jsx";
import {DropdownList} from '../styled/textFields';
import {isDescendantOf} from '../../utils/domUtils';

const TwoFieldsAndButton = styled.div`
    .outlined {
        color: ${props => props.theme.button};
        font-weight: 600;
    }
    
    .first_input {
        width: 100%;
    }
`

const FlexWpapper = styled.div`
    display: flex;
`

class TwoInputsWithButtonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: '',
            opened: false,
            outlined: 0
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', (e) => this.clickOutside(e));
        document.addEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.clickOutside(e));
        document.removeEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    onKeyPress(key) {
        if(this.state.opened) {
            const {suggestions} = this.props;
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
                this.setState({first: suggestions[outlined].name, opened: false})
            }
        }
    }

    onSelect(item, index) {
        this.setState({first: item.name, outlined: 0});
    }

    onChangeInput(property, {target}) {
        this.setState({
            ['' + property]: target.value
        });
    }

    getValues() {
        const {onButtonClick} = this.props;
        const suggestions = this.filterSuggestions();
        const {first, second} = this.state;
        if (first) {
            suggestions.forEach(item => {
                if(item.name == first) {
                    onButtonClick(item, second);
                    this.clearInputs();
                }
            })
        }
    }

    clearInputs() {
        this.setState({
            first: '',
            second: ''
        });
    }

    clickOutside(e) {
        if (isDescendantOf(e.target, this.container)) {
            this.setState({opened: !this.state.opened});
        } else {
            this.setState({opened: false});
        }
    }

    filterSuggestions() {
        const {suggestionExcludes, suggestions} = this.props;
        if (suggestionExcludes && suggestionExcludes.length) {
            return suggestions.filter((sug) => !suggestionExcludes.includes(sug));
        }
        return suggestions;
    }

    render() {
        const {placeholderOne, placeholderTwo, className,
            firstInputClassName, secondInputClassName, inputWithButtonClassName} = this.props;
        const suggestions = this.filterSuggestions();
        const {first, second, opened, outlined} = this.state;
        return <TwoFieldsAndButton className={className ? className : ''}>
            <div className={firstInputClassName ? firstInputClassName : ''}>
                <FlexWpapper>
                    <TextField innerRef={r => this.container = r}
                   size='1'
                   placeholder={placeholderOne}
                   value={first}
                   className='first_input'
                   onChange={this.onChangeInput.bind(this, 'first')}/></FlexWpapper>
                {opened && suggestions && suggestions.length != 0 && <DropdownList>
                    {suggestions.map((item, index) => <div
                        className={outlined == index ? 'outlined' : ''}
                        onClick={() => this.onSelect(item, index)}
                        key={item.id}>{item.name}</div>)}
                </DropdownList>}
            </div>
            <div className={inputWithButtonClassName ? inputWithButtonClassName : ''}>
                <TextField placeholder={placeholderTwo}
                           size='1'
                           className={secondInputClassName ? secondInputClassName : ''}
                           value={second}
                           onChange={this.onChangeInput.bind(this, 'second')}/>
                <AddIcon onClick={this.getValues}/>
            </div>
        </TwoFieldsAndButton>;
    }
}

// TwoInputsWithButtonForm.propTypes = {
//     placeholderOne: React.PropTypes.string,
//     placeholderTwo: React.PropTypes.string,
//     buttonText: React.PropTypes.string,
//     onButtonClick: React.PropTypes.func,
//     suggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
//         id: React.PropTypes.number,
//         name: React.PropTypes.string
//     }))
// }
//
// TwoInputsWithButtonForm.defaultProps = {
//     placeholderOne: 'enter text',
//     placeholderTwo: 'enter text',
//     buttonText: 'button',
//     suggestions: []
// }
export default TwoInputsWithButtonForm;