import React from 'react';
import styled from 'styled-components';
import {TextField} from '../styled/textFields.jsx';
import {AddIcon} from '../styled/icons.jsx';
import {DropdownList} from '../styled/textFields';
import {isDescendantOf} from '../../utils/domUtils';
import PropTypes from 'prop-types';

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
    }

    componentDidMount() {
        document.addEventListener('click', (e) => this.clickOutside(e));
        document.addEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.clickOutside(e));
        document.removeEventListener('keydown', (e) => this.onKeyPress(e.key));
        this.onChangeInput = null;
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

    getValues = () => {
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
        const {first} = this.state;
        const filteredSuggestions = suggestionExcludes && suggestionExcludes.length
            ? suggestions.filter(sug => !suggestionExcludes.find(s => s.name == sug.name))
            : suggestions;

        return filteredSuggestions.filter(sug => sug.name.includes(first));
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

TwoInputsWithButtonForm.propTypes = {
    placeholderOne: PropTypes.string,
    placeholderTwo: PropTypes.string,
    firstInputClassName: PropTypes.string,
    secondInputClassName: PropTypes.string,
    inputWithButtonClassName: PropTypes.string,
    className: PropTypes.string,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    suggestionExcludes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
}

export default TwoInputsWithButtonForm;