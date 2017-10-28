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
    uploadFile
} from "../actions/CreateReceptActions";
import {copyReceptToNew} from '../actions/EditActions';
import {fetchIngridients} from '../actions/IngridientActions';
import {fetchAllRecepts, fetchReceptsByDepart} from '../actions/MainActions';
import ReceptSelect from "../components/forms/ReceptSelect.jsx";
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
import {ActionButton} from "../components/styled/buttons.jsx";

import {withRouter} from 'react-router';

const CreateRecept = styled.div`
`

const Column = styled.div`
    display: inline-block;
    width: 50%;
    vertical-align: top;
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
    uploadFile
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
            addTag, removeTag, addRef, removeRef, createRecept,
            uploadFile, recept, departments, ingridients, tags, error} = this.props;
        return <CreateRecept>
            <Column>
                <ReceptInput placeholder='Название рецепта'
                             onChangeInput={setReceptName}
                             initialValue={recept.name}/>
                <ReceptSelect items={departments}
                              onChangeSelect={setReceptDepartment}
                              initialValue={recept.department}/>
                <ReceptFileInput onChangeInput={uploadFile}/>
                {recept.imgPath && <Image src={recept.imgPath}/>}

                <TwoInputsWithButtonForm placeholderOne='ингридиент'
                                         placeholderTwo='норма'
                                         suggestions={ingridients}
                                         onButtonClick={addProportion}/>
                <ProportionList items={recept.proportions} onButtonClick={removeProportion} buttonText="Удалить"/>
                <InputWithButtonForm placeholder='тэг'
                                     suggestions={tags}
                                     suggestionExcludes={recept.tags}
                                     onButtonClick={addTag}/>
                <ListItems items={recept.tags}
                           onButtonClick={removeTag}/>
                <InputWithButtonForm placeholder='ссылка'
                                     suggestions={this.refers}
                                     suggestionExcludes={recept.refs}
                                     onButtonClick={addRef}/>
                <ListItems items={recept.refs}
                           onButtonClick={removeRef}/>

// Create new component to load detail and delete button for all images
                {/*<ReceptInput placeholder='Описание'*/}
                             {/*onChangeInput={setReceptName}/>*/}
                {/*<ReceptFileInput onChangeInput={uploadFile.bind(null, true)}/>*/}
                {/*{recept.details.map(detail => <Image src={detail.imgPath}/>)}*/}

                <ActionButton onClick={createRecept.bind(null, recept)}>Готово</ActionButton>
                <Error message={error}/>
            </Column>
            <Column>
                <ReceptTextarea placeholder='Описание рецепта'
                                onChangeTextarea={setReceptText}
                                initialValue={recept.text}/>
            </Column>
        </CreateRecept>;
    }
}

export default CreateReceptPage;