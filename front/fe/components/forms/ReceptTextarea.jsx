import React from 'react';
import {Text} from '../styled/textFields.jsx';
import PropTypes from 'prop-types';

class ReceptTextarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue
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
        this.props.onChangeTextarea(target.value);
    }

    render() {
        return <Text value={this.state.value}
                     size='1'
                     className={this.props.className}
                      placeholder={this.props.placeholder}
                      onChange={this.onChange}/>;
    }
}

ReceptTextarea.propTypes = {
    placeholder: PropTypes.string,
    onChangeTextarea: PropTypes.func,
    initialValue: PropTypes.string
}

export default ReceptTextarea;