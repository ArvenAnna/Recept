import React from "react";
import styled from 'styled-components';
import {RemoveIcon} from "../styled/icons.jsx";

const List = styled.ul`
    padding: 5px;
    margin: 10px;
`

const Item = styled.li`
    list-style-type: none;
    font-style: italic;
    font-weight: bold;
    margin: 5px 0 5px 0;
    
    & > * {
        display: inline-block;
        vertical-align: middle;
    }
`

const ListItems = ({items, onButtonClick}) => {
    return (items && items.length)
        ? (
            <List>
                {items.map((item, index) => <Item key={index}>
                    <div>{item.name}</div>
                    {onButtonClick ?
                        <RemoveIcon onClick={onButtonClick.bind(null, item)}/> : null}
                </Item>)}
            </List>
        )
        : null;
}

// ListItems.propTypes = {
//     items: React.PropTypes.arrayOf(
//         React.PropTypes.shape({
//             id: React.PropTypes.number,
//             name: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
//         })
//     ),
//     buttonText: React.PropTypes.string,
//     onButtonClick: React.PropTypes.func
// }
//
// ListItems.defaultProps = {
//     buttonText: 'delete'
// }

export default ListItems;