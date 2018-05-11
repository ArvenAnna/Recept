import React from 'react';
import connect from 'redux-connect-decorator';
import {copyReceptToNew} from '../actions/EditActions';

import ProportionsList from '../components/specific/ProportionList.jsx';
import ReceptItem from '../components/simple/ReceptItem.jsx';
import {addHeaderButton, removeHeaderButton} from '../actions/CommonActions';
import {NoImgIcon} from '../components/styled/icons.jsx';
import '../styles/_recept_page.less';

@connect(store => ({
    recept: store.chosenRecept
}), {
    editRecept: copyReceptToNew,
    addHeaderButton: addHeaderButton,
    removeHeaderButton: removeHeaderButton
})

class ReceptPage extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.recept && nextProps.recept.id && nextProps.recept != this.props.recept) {
            nextProps.addHeaderButton({name: "Редактировать", to: '/editRecept', id: 3, onClick: () => nextProps.editRecept(nextProps.recept)});
        }
    }

    componentWillUnmount() {
        this.props.removeHeaderButton({name: "Редактировать"})
    }

    render() {
        const {recept} = this.props;
        if (!recept.id) {
            return null;
        }
        return (
            <div className='recept_page'>
                <div className='recept_page_caption'>{recept.name}</div>
                <div className='recept_page_proportions'>
                    <ProportionsList items={recept.proportions}/>
                </div>
                {recept.imgPath
                    ? <img src={recept.imgPath} className='recept_page_main_foto'/>
                    : <NoImgIcon className='recept_page_main_foto'/>}
                {recept.text && <div className='recept_page_description'>{recept.text}</div>}
                {recept.refs && <div className='recept_page_refs'>
                    {recept.refs.map(ref => <ReceptItem key={ref.id} item={ref}/>)}
                </div>}
                {recept.details && <div className='recept_page_details'>
                    {recept.details.map(detail => [<img src={detail.filePath} key={`img${detail.id}`}/>,
                    <div key={`desc${detail.id}`}>{detail.description}</div>])}
                </div>}
            </div>
        );
    }
}

export default ReceptPage;