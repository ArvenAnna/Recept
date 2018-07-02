import React from "react";
import connect from 'redux-connect-decorator'
import {
    copyReceptToNew,
    addProportion,
    removeProportion,
    setReceptDepartment,
    setReceptName,
    setReceptText,
    fetchTags,
    addTag,
    removeTag,
    addRef,
    removeRef,
    uploadFile, addDetail, removeDetail, removeReceptFoto
} from "../actions/CreateReceptActions";
import {fetchIngridients} from '../actions/IngridientActions';
import {fetchAllRecepts, fetchReceptsByDepart} from '../actions/MainActions';
import TwoInputsWithButtonForm from "../components/forms/TwoInputsWithButtonForm.jsx";
import ReceptInput from "../components/forms/ReceptInput.jsx";
import ReceptTextarea from "../components/forms/ReceptTextarea.jsx";

import ProportionList from "../components/specific/ProportionList.jsx";
import ReceptFileInput from '../components/forms/ReceptFileInput.jsx';
import InputWithButtonForm from '../components/forms/InputWithButtonForm.tsx';
import ListItems from '../components/simple/ListItems.jsx';
import Error from '../components/simple/BackendError.jsx';
import Image from '../components/simple/Image.jsx';

import {withRouter} from 'react-router';
import FileWithDescription from "../components/forms/FileWithDescription.jsx";
import {SaveButton} from "../components/styled/buttons.jsx";
import ReceptDropdown from "../components/forms/ReceptDropdown.jsx";
import FileWithDescriptionItem from '../components/simple/FileWithDescriptionItem';

import http from '../utils/HttpService';
import routes from "../constants/Routes";
import {ERROR_SHOWING_TIME} from "../constants/appConstants";

@withRouter
@connect(store => ({
    recept: store.newRecept,
    departments: store.departments,
    ingridients: store.ingridients,
    tags: store.tags,
    recepts: store.receptList,
    chosenRecept: store.chosenRecept,
}), {
    copyReceptToNew,
    setReceptName,
    setReceptDepartment,
    setReceptText,
    addProportion,
    removeProportion,
    fetchIngridients,
    fetchTags,
    addTag,
    removeTag,
    fetchReceptsByDepart,
    addRef,
    removeRef,
    uploadFile,
    addDetail,
    removeDetail,
    removeReceptFoto
})
class CreateReceptPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchIngridients();
        this.props.fetchTags();
        this.props.fetchReceptsByDepart(-1);
        this.refers = this.props.recepts;

        this.state = {
            error: null,
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id && nextProps.chosenRecept && nextProps.chosenRecept != this.props.chosenRecept) {
            nextProps.copyReceptToNew(nextProps.chosenRecept);
        }
        if ((this.props.match.params.id != nextProps.match.params.id) && !nextProps.match.params.id) {
            nextProps.copyReceptToNew({});
        }
    }

    preProcessRecept(recept) {
        const cutRecept = {};
        cutRecept.name = recept.name;
        cutRecept.id = recept.id;
        cutRecept.imgPath = recept.imgPath;
        cutRecept.text = recept.text;
        cutRecept.department = {id: recept.department.id};
        cutRecept.refs = [];
        recept.refs && recept.refs.forEach(ref => cutRecept.refs.push({id: ref.id}));
        cutRecept.tags = [];
        recept.tags && recept.tags.forEach(tag => cutRecept.tags.push({id: tag.id}));
        cutRecept.proportions = [];
        recept.proportions && recept.proportions.forEach(proportion => cutRecept.proportions.push(
            {ingridient: {id: proportion.ingridient.id}, norma: proportion.norma}));
        cutRecept.details = recept.details;
        return cutRecept;
    }

    submitForm = () => {
        const proccessedRecept = this.preProcessRecept(this.props.recept);
        this.setState({loading: true});
        return http
            .doPost(routes.POST_CREATE_RECEPT, proccessedRecept)
            .then(id => this.props.history.push(`/recept/${id}`))
            .catch(error => {
                this.setState({error: error
                        ? (error.response && error.response.data ? error.response.data.message : error.message)
                        : 'Unknown error', loading: false});
                setTimeout(() => {
                    this.setState({error: null});
                }, ERROR_SHOWING_TIME);
            });
    }

    render() {
        const {
            setReceptName, setReceptDepartment, setReceptText, addProportion, removeProportion,
            addTag, removeTag, addRef, removeRef, addDetail, removeDetail, removeReceptFoto,
            uploadFile, recept, departments, ingridients, tags, recepts
        } = this.props;
        const {error, loading} = this.state;
        return <div className='create_receipt_page'>
            <ReceptInput placeholder='Название рецепта'
                         className='receipt_name'
                         onChangeInput={setReceptName}
                         initialValue={recept.name || ''}/>
            <ReceptDropdown items={departments}
                            onChangeDropdown={setReceptDepartment}
                            className='receipt_depart'
                            selectedItemIndex={0}/>
            {recept.imgPath
                ? <div className='receipt_main_foto'>
                    <Image src={recept.imgPath.startsWith(routes.TEMP_CATALOG.slice(1)) ? recept.imgPath : routes.IMAGE_CATALOG + recept.imgPath}
                           onRemove={removeReceptFoto}/>
                </div>
                : <ReceptFileInput onChangeInput={uploadFile}
                                   title='Главное фото'
                                   className='receipt_main_foto'/>}

            <TwoInputsWithButtonForm placeholderOne='ингридиент'
                                     placeholderTwo='норма'
                                     className='receipt_proportions_field'
                                     firstInputClassName='firstInput'
                                     secondInputClassName='secondInput'
                                     inputWithButtonClassName='inputWithButton'
                                     suggestions={ingridients}
                                     suggestionExcludes={recept.proportions ? recept.proportions.map(p => p.ingridient) : []}
                                     onButtonClick={addProportion}/>
            <ProportionList items={recept.proportions}
                            className='receipt_proportions_list'
                            onButtonClick={removeProportion} buttonText="Удалить"/>
            <InputWithButtonForm placeholder='тэг'
                                 className='receipt_tags_field'
                                 suggestionsRequired={true}
                                 suggestions={tags}
                                 suggestionExcludes={recept.tags}
                                 onButtonClick={addTag}/>
            <ListItems items={recept.tags}
                       className='receipt_tags_list'
                       onButtonClick={removeTag}/>
            <InputWithButtonForm placeholder='ссылка'
                                 className='receipt_refs_field'
                                 suggestionsRequired={true}
                                 suggestions={recepts}
                                 suggestionExcludes={recept.refs
                                     ? [ ...recept.refs, {name: recept.name}]
                                     : [{name: recept.name}]}
                                 onButtonClick={addRef}/>
            <ListItems items={recept.refs}
                       className='receipt_refs_list'
                       onButtonClick={removeRef}/>


            <FileWithDescription addDetail={addDetail}
                                 placeholder='Комментарий'
                                 className='recept_details_field'/>
            {recept.details && <div className='recept_details_list'>
                {recept.details.map(detail =>
                    <FileWithDescriptionItem key={detail.filePath}
                                             detail={detail}
                                             removeDetail={() => removeDetail(detail)}/>)}
            </div>}


            <SaveButton onClick={this.submitForm} className='receipt_save_button' disabled={loading}>Готово</SaveButton>
            <Error message={error} className='receipt_error'/>

            <ReceptTextarea placeholder='Описание рецепта'
                            className='receipt_description_field'
                            onChangeTextarea={setReceptText}
                            initialValue={recept.text}/>

        </div>;
    }
}

export default CreateReceptPage;