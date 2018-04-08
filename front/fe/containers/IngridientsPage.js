import React from "react";
import connect from 'redux-connect-decorator';
import InputWithButtonForm from "../components/forms/InputWithButtonForm.tsx";
import {addIngridient} from "../actions/IngridientActions";
import Error from "../components/simple/BackendError.jsx";
import styled from 'styled-components';

const Wrapper = styled.div`
    .ingridients_input {
        margin-bottom: 0.5rem;
    }
`

const Item = styled.div`
    font-style: italic;
    font-weight: bold;
    margin: 0 1rem;
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
            <Wrapper>
                <InputWithButtonForm placeholder='новый ингридиент'
                                     className='ingridients_input'
                                     onButtonClick={addIngridient}/>
                <Error message={error}/>
                {ingridients.map(ing => <Item key={ing.id}>{ing.name}</Item>)}
            </Wrapper>
        );
    }
}

export default IngridientsPage;