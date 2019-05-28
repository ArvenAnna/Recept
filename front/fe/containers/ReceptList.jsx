import React from 'react';
import connect from 'redux-connect-decorator';
import {Link} from 'react-router-dom';
import {NoImgIcon} from '../components/styled/icons';
import '../styles/_recept_list_page.less';
import routes from "../constants/Routes";

import '../web-components/components/list-items.js';


@connect(store => ({
    receptList: store.receptList
}))
class ReceptListPage extends React.Component {

    render() {
        return <div className='recept_list_page'>
            {this.props.receptList.map(item =>
                <Link to={`/recept/${item.id}`} className='recept_list_page_item' key={item.id}>
                    {item.imgPath ? <img src={routes.IMAGE_CATALOG + item.imgPath}/> : <NoImgIcon/>}
                    <div className='recept_list_page_item_name'>{item.name}</div>
                    <div className='recept_list_page_item_divider'/>
                </Link>)}
        </div>
    }
}

export default ReceptListPage;