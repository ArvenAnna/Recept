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
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img {
        display: inline-block;
        box-sizing: border-box;
        width: 600px;
    }
`

const ReceiptCaption = styled.div`
    text-align: center;
    font-size: 1.6rem;
    width: 100%;
    background-color: ${props => props.theme.content};
    margin: 0 0 20px 0;
    box-shadow: 0px 0px 3px 3px ${props => props.theme.shadow};
    color: ${props => props.theme.text};
`

const ReceptDescription = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, 1fr);
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
        let columns = 0;
        if (recept.proportions) {
            columns++;
        }
        if (recept.refs) {
            columns++;
        }
        if (recept.details) {
            columns++;
        }
        return (
            <Receipt>
                <ReceiptCaption>{recept.name}</ReceiptCaption>
                {recept.imgPath
                    ? <img src={recept.imgPath}/>
                    : <NoImgIcon/>}
                {recept.text && <Description>{recept.text}</Description>}
                <ReceptDescription columns={columns}>
                    <Proportions>
                        <ProportionsList items={recept.proportions}/>
                    </Proportions>
                    {recept.refs && <RefList>
                        {recept.refs.map(ref => <ReceptItem key={ref.id} item={ref}/>)}
                    </RefList>}
                    {recept.details && <DetailList>
                        {recept.details.map(detail => <DetailItem key={detail.id} item={detail}/>)}
                    </DetailList>}
                </ReceptDescription>
            </Receipt>
        );
    }
}

export default ReceptPage;