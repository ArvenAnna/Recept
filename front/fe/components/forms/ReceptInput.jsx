import React from 'react';
import {TextField} from '../styled/textFields.jsx';
import PropTypes from 'prop-types';

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
                       onChange={this.onChange} size='1'/>
        );
    }
}

ReceptInput.propTypes = {
    placeholder: PropTypes.string,
    onChangeInput: PropTypes.func,
    initialValue: PropTypes.string
}

export default ReceptInput;