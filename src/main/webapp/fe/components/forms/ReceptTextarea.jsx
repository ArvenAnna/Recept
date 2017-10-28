import React from 'react';
import styled from 'styled-components';

const Text = styled.textarea`
        margin: 5px 5px 5px 0;
        margin: 0 5px 0 0;
        background-color: ${props => props.theme.text};
        color: ${props => props.theme.button};
        padding-left: 3px;
        display: inline-block;
        vertical-align: top;
        min-width: 400px;
        min-height: 15rem;
        font-size: 1.3rem;
`

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