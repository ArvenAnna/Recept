import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from '../styled/icons.jsx';
import PropTypes from 'prop-types';

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
            <div className={className}>
                {items.map((item, index) => <Item key={index}>
                    <div>{item.name}</div>
                    {onButtonClick && <RemoveIcon onClick={onButtonClick.bind(null, item)}/>}
                </Item>)}
            </div>
        ) : null;
}

ListItems.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
    ),
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func
}

export default ListItems;