import React from "react";
import styled from 'styled-components';
import {TextField} from "../styled/textFields.jsx";
import {AddIcon} from "../styled/icons.jsx";

const TwoFieldsAndButton = styled.div`
    margin: 5px 5px 5px 0;
`

class TwoInputsWithButtonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: ''
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    onChangeInput(property, {target}) {
        this.setState({
            ['' + property]: target.value
        });
    }

    getValues() {
        const {onButtonClick, suggestions} = this.props;
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

    render() {
        const {placeholderOne, placeholderTwo, suggestions} = this.props;
        const {first, second} = this.state;
        return <TwoFieldsAndButton className={this.props.className}>
            <TextField list={placeholderOne + placeholderTwo}
                   placeholder={placeholderOne}
                   value={first}
                   onChange={this.onChangeInput.bind(this, 'first')}/>
            <datalist id={placeholderOne + placeholderTwo}>
                {suggestions.map(item => <option key={item.id}>{item.name}</option>)}
            </datalist>
            <TextField placeholder={placeholderTwo}
                   value={second}
                   onChange={this.onChangeInput.bind(this, 'second')}/>
            <AddIcon onClick={this.getValues}/>
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