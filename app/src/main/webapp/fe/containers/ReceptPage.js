import React from 'react';
import connect from 'redux-connect-decorator';
import {copyReceptToNew} from '../actions/EditActions';

import ProportionsList from '../components/specific/ProportionList.jsx';
import ReceptItem from '../components/simple/ReceptItem.jsx';
import DetailItem from '../components/simple/DetailItem.jsx';
import styled from 'styled-components';
import {addHeaderButton, removeHeaderButton} from "../actions/CommonActions";
import {NoImgIcon} from "../components/styled/icons.jsx";

const Receipt = styled.div`
    & > img {
        display: inline-block;
        box-sizing: border-box;
        width: 600px;
    }
`

const ReceiptCaption = styled.div`
    text-align: center;
    font-size: 1.6rem;
    background-color: ${props => props.theme.content};
    width: 70%;
    margin: 0 0 20px 0;
    box-shadow: 0px 0px 3px 3px ${props => props.theme.shadow};
    color: ${props => props.theme.text};
`

const Proportions = styled.div`
    display: inline-block;
    box-sizing: border-box;
    margin-left: 100px;
    vertical-align: top;
`

const RefList = styled.div`
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;

`


const Description = styled.div`
    padding: 10px;
    background-color: ${props => props.theme.border_2};
    margin: 10px;
    font-size: 1.1rem;
    text-align: justify;
`

const DetailList = styled.div`
    padding: 5px;
    margin: 10px;
`

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
            nextProps.addHeaderButton({name:"Редактировать", to: '/editRecept', id: 3, onClick: () => nextProps.editRecept(nextProps.recept)});
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
            <Receipt>
                <ReceiptCaption>{recept.name}</ReceiptCaption>
                {recept.imgPath
                    ? <img src={recept.imgPath}/>
                    : <NoImgIcon/>}
                <Proportions>
                    <ProportionsList items={recept.proportions}/>
                </Proportions>
                {recept.refs && <RefList>
                    {recept.refs.map(ref => <ReceptItem key={ref.id} item={ref}/>)}
                </RefList>}
                {recept.text && <Description>{recept.text}</Description>}
                {recept.details && <DetailList>
                    {recept.details.map(detail => <DetailItem key={detail.id} item={detail}/>)}
                </DetailList>}
            </Receipt>
        );
    }
}

export default ReceptPage;