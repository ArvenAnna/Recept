import React from "react";
import {TextField} from "../styled/textFields.jsx";

class ReceptInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue || ''
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {initialValue: prevInitialValue} = this.props;
        const {initialValue: nextInitialValue} = nextProps;
        if (prevInitialValue != nextInitialValue) {
            this.setState({
                value: nextInitialValue
            });
        }
    }

    onChange({target}) {
        this.setState({
            value: target.value
        });
        this.props.onChangeInput(target.value);
    }

    render() {
        return (
            <TextField value={this.state.value}
                       placeholder={this.props.placeholder}
                       className={this.props.className}
                       onChange={this.onChange}/>
        );
    }
}

// ReceptInput.propTypes = {
//     placeholder: React.PropTypes.string,
//     onChangeInput: React.PropTypes.func,
//     initialValue: React.PropTypes.string
// }
//
// ReceptInput.defaultProps = {
//     placeholder: 'enter text',
//     initialValue: ''
// }
export default ReceptInput;