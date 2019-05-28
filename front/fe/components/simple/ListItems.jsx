import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from '../styled/icons.jsx';
import PropTypes from 'prop-types';
import '../../web-components/components/list-items.js';

const Item = styled.div`
    list-style-type: none;
    font-style: italic;
    font-weight: bold;
    display: flex;
    align-items:center;
    margin: 0.5rem;
`
// todo: pass function with how to combine props to use as item name via event
// const ListItems = ({items, onButtonClick, className}) => {
//     return items && items.length != 0 ? (
//         <recipe-list-items items={JSON.stringify(items)} item-prop="name"/>
//     ) : null;
// }

export default class ListItems extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.r.items = this.props.items;
        this.r.renderItem = (item) => {
            return item.name + '<div style="color:red">----</div>' + item.name;
        }
        this.r.removeItem = this.props.onButtonClick;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items != this.props.items) {
            this.r.items = nextProps.items;
        }
    }

    render() {
        const {items, onButtonClick, className} = this.props;
        return <recipe-list-items ref={r => this.r = r} class={className}/>;
    }
}

// const ListItems = ({items, onButtonClick, className}) => {
//     return items && items.length != 0 ? (
//             <div className={className}>
//                 {items.map((item, index) => <Item key={index}>
//                     <div>{item.name}</div>
//                     {onButtonClick && <RemoveIcon onClick={onButtonClick.bind(null, item)}/>}
//                 </Item>)}
//             </div>
//         ) : null;
// }

// ListItems.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.oneOfType(PropTypes.string, PropTypes.object)
//         })
//     ),
//     buttonText: PropTypes.string,
//     onButtonClick: PropTypes.func
// }

// export default ListItems;