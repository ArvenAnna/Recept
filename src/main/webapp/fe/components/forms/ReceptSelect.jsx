import React from "react";
import styled from 'styled-components';

const ReceiptSelect = styled.div`
    display: inline-block;
    border: 2px solid #ccc;
    width: 120px;
    background: ${props => props.theme.text};
    vertical-align: middle;
    
    select {
        padding: 5px 8px;
        width: 120px;
        border: none;
        box-shadow: none;
        background: ${props => props.theme.text};
        background-image: none;
        -webkit-appearance: none;
        color: ${props => props.theme.button};
    }
    
    select:focus {
        outline: none;
    }
`

class ReceptSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.getInitialValue(props)
        };
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialValue != this.props.initialValue) {
            this.setState({
                value: this.getInitialValue(nextProps)
            })
        }
    }

    getInitialValue({initialValue, items}) {
        return (initialValue && items.map(item => item.id).includes(+initialValue.id))
            ? initialValue.id
            : items[0].id;
    }

    onSelect({target}) {
        this.setState({
            value: parseInt(target.value)
        });
        this.props.onChangeSelect(target.value);
    }

    componentDidMount() {
        this.props.onChangeSelect(this.state.value);
    }

    render() {
        return <ReceiptSelect>
            <select value={this.state.value}
                    onChange={this.onSelect}>
                {this.props.items.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
        </ReceiptSelect>;
    }
}

// ReceptSelect.propTypes = {
//     items: React.PropTypes.arrayOf(React.PropTypes.shape({
//         id: React.PropTypes.number.isRequired
//     })).isRequired,
//     onChangeSelect: React.PropTypes.func,
//     initialValue: React.PropTypes.shape({
//         id: React.PropTypes.number.isRequired
//     })
// }

export default ReceptSelect;