import React from 'react';
import ListItems from '../simple/ListItems.jsx';
import styled from 'styled-components';

const Item = styled.div`
    & > div {
      display: inline-block;
    }
`

const ProportionList = ({items, onButtonClick, className}) => {
        if(!items || !items.length) {
            return null;
        }
        let itemsForList = items.map(item => {
            item.name = (
                <Item>
                    <div key='name'>{item.ingredientName}</div>
                    <div key='separator'>&nbsp;-&nbsp;</div>
                    <div key='norma'>{item.norma}</div>
                </Item>
            );
            return item;
        });
        return <ListItems items={itemsForList}
                          className={className}
                          onButtonClick={onButtonClick}/>;
}

// ProportionList.propTypes = {
//     items: React.PropTypes.arrayOf(
//         React.PropTypes.shape({
//             id: React.PropTypes.number,
//             ingredient: React.PropTypes.shape({
//                 id: React.PropTypes.number,
//                 name: React.PropTypes.string
//             }),
//             norma: React.PropTypes.string
//         })
//     ),
//     onButtonClick: React.PropTypes.func,
//     buttonText: React.PropTypes.string
// }
//
// ProportionList.defaultProps = {
//     buttonText: 'delete'
// }

export default ProportionList;