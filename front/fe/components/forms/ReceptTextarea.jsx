import React from 'react';
import styled from 'styled-components';
import {Text} from "../styled/textFields.jsx";

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
                     className={this.props.className}
                      placeholder={this.props.placeholder}
                      onChange={this.onChange}/>;
    }
}

// ReceptTextarea.propTypes = {
//     placeholder: React.PropTypes.string,
//     onChangeTextarea: React.PropTypes.func,
//     initialValue: React.PropTypes.string
// }
//
// ReceptTextarea.defaultProps = {
//     placeholder: 'enter text',
//     initialValue: ''
// }

export default ReceptTextarea;