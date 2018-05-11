import React from 'react';
import connect from 'redux-connect-decorator';
import {Link} from 'react-router-dom';
import {NoImgIcon} from '../components/styled/icons';
import '../styles/_recept_list_page.less';

@connect(store => ({
    receptList: store.receptList
}))
class ReceptListPage extends React.Component {

    render() {
        return <div className='recept_list_page'>
            {this.props.receptList.map(item =>
                <Link to={item.to} className='recept_list_page_item'>
                    {item.imgPath ? <img src={item.imgPath}/> : <NoImgIcon/>}
                    <div className='recept_list_page_item_name'>{item.name}</div>
                    <div className='recept_list_page_item_divider'/>
                </Link>)}
        </div>
    }
}

export default ReceptListPage;