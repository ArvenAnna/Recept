import React from "react";
import styled from 'styled-components';
import {RemoveIcon} from "../styled/icons.jsx";

const List = styled.section`
   
`

const Item = styled.div`
    list-style-type: none;
    font-style: italic;
    font-weight: bold;
    display: flex;
    align-items:center;
    margin: 0.5rem;
`

const ListItems = ({items, onButtonClick, className}) => {
    return items && items.length != 0 ? (
            <List className={className}>
                {items.map((item, index) => <Item key={index}>
                    <div>{item.name}</div>
                    {onButtonClick &&
                        <RemoveIcon onClick={onButtonClick.bind(null, item)}/>}
                </Item>)}
            </List>
        ) : null;
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