import React from 'react';
import {Link} from 'react-router-dom';

import ProportionsList from '../components/specific/ProportionList.jsx';
import { NoImgIcon } from '../components/styled/icons.jsx';
import '../styles/_recept_page.less';
import routes from "../constants/Routes";


class ReceptPage extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.recept && nextProps.recept.id && nextProps.recept != this.props.recept) {
            nextProps.addHeaderButton({name: "Редактировать", to: `/recept/${nextProps.recept.id}/edit`, id: 3});
        }
        if (nextProps.recept != this.props.recept) {
            this.r.recipe = nextProps.recept;
        }
    }

    componentDidMount() {
        this.r.recipe = this.props.recept;
    }

    componentWillUnmount() {
        this.props.removeHeaderButton({name: "Редактировать"})
    }

    render() {
        return (
            <recipe-page ref={r => this.r = r}/>
            // <div className='recept_page'>
            //     <div className='recept_page_caption'>{recept.name}</div>
            //     <div className='recept_page_proportions'>
            //         <ProportionsList items={recept.proportions}/>
            //     </div>
            //     {recept.imgPath
            //         ? <img src={routes.IMAGE_CATALOG + recept.imgPath} className='recept_page_main_foto'/>
            //         : <NoImgIcon className='recept_page_main_foto'/>}
            //     {recept.text && <div className='recept_page_description'>{recept.text}</div>}
            //     {recept.refs && <div className='recept_page_refs'>
            //         {recept.refs.map(item => <Link to={`/recept/${item.id}`} key={item.id}>
            //             {item.imgPath
            //                 ? <img src={routes.IMAGE_CATALOG + item.imgPath}/>
            //                 : <NoImgIcon/>}
            //             <div className='recept_page_refs_name'>{item.name}</div>
            //         </Link>)}
            //     </div>}
            //     {recept.details && <div className='recept_page_details'>
            //         {recept.details.map(detail => [<img src={routes.IMAGE_CATALOG + detail.filePath} key={`img${detail.id}`}/>,
            //         <div key={`desc${detail.id}`} className='recept_page_details_description'>{detail.description}</div>])}
            //     </div>}
            // </div>
        );
    }
}

export default ReceptPage;