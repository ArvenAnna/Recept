import React from 'react';
import ListItems from '../simple/ListItems.jsx';
import styled from 'styled-components';

const Item = styled.div`
    & > div {
      display: inline-block;
    }
`

export default class ProportionList extends React.Component {

    componentDidMount() {
        this.r.items = this.props.items;
        this.r.renderItem = (item) => {
            return `
                <div key='name'>${item.ingredientName}</div>
                <div key='separator'>&nbsp;-&nbsp;</div>
                <div key='norma'>${item.norma || ''}</div>
            `;
        }
        this.r.removeItem = this.props.onButtonClick;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items != this.props.items) {
            this.r.items = nextProps.items;
        }
    }

    render() {
        const {items, className, onButtonClick} = this.props;
        // if(!items || !items.length) {
        //     return null;
        // }
        // let itemsForList = items.map(item => {
        //     item.name = (
        //         <Item>
        //             <div key='name'>{item.ingredientName}</div>
        //             <div key='separator'>&nbsp;-&nbsp;</div>
        //             <div key='norma'>{item.norma}</div>
        //         </Item>
        //     );
        //     return item;
        // });
        // return <ListItems items={itemsForList}
        //                   className={className}
        //                   onButtonClick={onButtonClick}/>;

        return <recipe-list-items ref={r => this.r = r} className={className}/>
    }

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

// export default ProportionList;