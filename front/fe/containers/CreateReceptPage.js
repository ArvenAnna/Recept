import React from "react";
import connect from 'redux-connect-decorator'
import {
    addProportion,
    createRecept,
    removeProportion,
    setReceptDepartment,
    setReceptName,
    setReceptText,
    fetchTags,
    addTag,
    removeTag,
    addRef,
    removeRef,
    setCreatedRecept,
    uploadFile, addDetail, removeDetail, removeReceptFoto
} from "../actions/CreateReceptActions";
import {copyReceptToNew} from '../actions/EditActions';
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
import styled from 'styled-components';

import {withRouter} from 'react-router';
import FileWithDescription from "../components/forms/FileWithDescription.jsx";
import DetailItem from "../components/simple/DetailItem.jsx";
import {RemoveIcon} from "../components/styled/icons.jsx";
import {SaveButton} from "../components/styled/buttons.jsx";
import ReceptDropdown from "../components/forms/ReceptDropdown.jsx";

const ImageWrapper = styled.section`
    display: flex;
    align-items: center;
`

@withRouter
@connect(store => ({
    recept: store.newRecept,
    departments: store.departments,
    ingridients: store.ingridients,
    tags: store.tags,
    recepts: store.receptList,
    error: store.error || null,
    isCreated: store.successfullyCreatedRecept,
    chosenRecept: store.chosenRecept,
    successfullyCreatedRecept: store.successfullyCreatedRecept
}), {
    copyReceptToNew,
    setReceptName,
    setReceptDepartment,
    setReceptText,
    addProportion,
    removeProportion,
    fetchIngridients,
    createRecept,
    fetchTags,
    addTag,
    removeTag,
    fetchReceptsByDepart,
    addRef,
    removeRef,
    setCreatedRecept,
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
    }

    componentWillReceiveProps(nextProps) {
        this.refers = nextProps.recepts;
        if (nextProps.recept && nextProps.recept.id && nextProps.recepts &&
            nextProps.recept != this.props.recept &&
            nextProps.recepts != this.props.recepts) {
            this.refers = nextProps.recepts.filter(item => {
                item.id != nextProps.recept.id
            });
        }
        const id = nextProps.successfullyCreatedRecept;
        if (id && id != 0) {
            this.props.setCreatedRecept(0);
            this.props.history.push('/recept/' + id);
        }
    }

    render() {
        const {setReceptName, setReceptDepartment, setReceptText, addProportion, removeProportion,
            addTag, removeTag, addRef, removeRef, createRecept, addDetail, removeDetail, removeReceptFoto,
            uploadFile, recept, departments, ingridients, tags, error} = this.props;
        return <div className='create_receipt_page'>
                <ReceptInput placeholder='Название рецепта'
                             className='receipt_name'
                             onChangeInput={setReceptName}
                             initialValue={recept.name}/>
                <ReceptDropdown items={departments}
                                onChangeDropdown={setReceptDepartment}
                                className='receipt_depart'
                                selectedItemIndex={0}/>
                {recept.imgPath
                    ? <Image src={recept.imgPath} onRemove={removeReceptFoto} className='receipt_main_foto'/>
                    : <ReceptFileInput onChangeInput={uploadFile} className='receipt_main_foto'/>}

                <TwoInputsWithButtonForm placeholderOne='ингридиент'
                                         placeholderTwo='норма'
                                         className='receipt_proportions_field'
                                         suggestions={ingridients}
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
                                     suggestions={this.refers}
                                     suggestionExcludes={recept.refs}
                                     onButtonClick={addRef}/>
                <ListItems items={recept.refs}
                           className='receipt_refs_list'
                           onButtonClick={removeRef}/>


                <FileWithDescription addDetail={addDetail} className='recept_details_field'/>
                {recept.details && recept.details.map(detail => <div key={detail.filePath} className='recept_details_list'>
                    <DetailItem item={detail} small={true}/>
                    <RemoveIcon onClick={() => removeDetail(detail)} />
                </div>)}


                <SaveButton onClick={() => createRecept(recept)} className='receipt_save_button'>Готово</SaveButton>
                <Error message={error} className='receipt_error'/>

                <ReceptTextarea placeholder='Описание рецепта'
                                className='receipt_description_field'
                                onChangeTextarea={setReceptText}
                                initialValue={recept.text}/>

        </div>;
    }
}

export default CreateReceptPage;