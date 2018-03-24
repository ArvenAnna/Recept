import React from "react";
import connect from 'redux-connect-decorator';
import InputWithButtonForm from "../components/forms/InputWithButtonForm.tsx";
import {addIngridient} from "../actions/IngridientActions";
import Error from "../components/simple/BackendError.jsx";
import styled from 'styled-components';

const Item = styled.div`
    font-style: italic;
    font-weight: bold;
    margin: 5px 0 5px 0;s
`

@connect(store => ({
    ingridients: store.ingridients,
    error: store.error
}), {
    addIngridient
})

class IngridientsPage extends React.Component {
    render() {
        const {error, addIngridient, ingridients} = this.props;
        return (
            <div>
                <InputWithButtonForm placeholder='новый ингридиент'
                                     onButtonClick={addIngridient}/>
                <Error message={error}/>
                {ingridients.map(ing => <Item key={ing.id}>{ing.name}</Item>)}
            </div>
        );
    }
}

export default IngridientsPage;