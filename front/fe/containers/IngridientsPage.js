import React from "react";
import connect from 'redux-connect-decorator';
import InputWithButtonForm from "../components/forms/InputWithButtonForm.tsx";
import {addIngridient} from "../actions/IngridientActions";
import Error from "../components/simple/BackendError.jsx";
import styled from 'styled-components';
import {ERROR_SHOWING_TIME} from "../constants/appConstants";

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
}), {
    addIngridient
})

class IngridientsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    submit = (ing) => {
        this.props.addIngridient(ing)
            .catch(error => {
                this.setState({error: error.response.data.message})
                setTimeout(() => {
                    this.setState({error: null})
                }, ERROR_SHOWING_TIME);
        });
    }

    render() {
        const {ingridients} = this.props;
        const {error} = this.state;
        return (
            <Wrapper>
                <InputWithButtonForm placeholder='новый ингридиент'
                                     className='ingridients_input'
                                     onButtonClick={this.submit}/>
                <Error message={error}/>
                {ingridients.map(ing => <Item key={ing.id}>{ing.name}</Item>)}
            </Wrapper>
        );
    }
}

export default IngridientsPage;