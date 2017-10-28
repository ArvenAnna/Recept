import React from 'react'
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import {withRouter} from 'react-router';
import styled from 'styled-components';

import ControlPanel from '../components/simple/ControlPanel.jsx';
import Sidebar from './Sidebar';
import IngridientsPage from './IngridientsPage';
import ReceptListPage from './ReceptList.jsx';
import ReceptPage from './ReceptPage';
import EditReceptPage from './CreateReceptPage';

import {copyReceptToNew} from '../actions/EditActions';
import MyRoute from "./MyRoute.jsx";
import {fetchRecept, fetchReceptsByDepart} from "../actions/MainActions";
import {fetchIngridients} from "../actions/IngridientActions";


const Content = styled.div`
    padding: 20px;
    background-color: ${props => props.theme.content};
    margin-top: 20px;
    box-shadow: 0px 0px 5px 5px ${props => props.theme.border_2};

    & > div {
        box-sizing: border-box;
        display: inline-block;
    }
    
    & > div:nth-child(1) {
        width: 85%;
    }
    
    & > div:nth-child(2) {
        width: 15%;
        vertical-align: top;
    }
`
@withRouter
@connect(store => ({
    headerButtons: store.headerButtons
}))
class App extends React.Component {
    render() {
        const {headerButtons} = this.props;
        return (
            <div>
                <ControlPanel items={headerButtons}/>
                <Content>
                    <Switch>
                        <MyRoute exact path='/'
                                 component={ReceptListPage}
                                 action={fetchReceptsByDepart}
                                 args={[{arg: '-1'}, {arg: true}]}/>
                        <MyRoute path='/ingridients'
                                 component={IngridientsPage}
                                 action={fetchIngridients}/>
                        <MyRoute path='/newRecept'
                                 component={EditReceptPage}
                                 action={copyReceptToNew}
                                 args={[{arg: {}}]}/>
                        <Route path='/editRecept' component={EditReceptPage}/>
                        <MyRoute path='/recept/:id'
                                 component={ReceptPage}
                                 action={fetchRecept}
                                 args={[{router: 'id'}]}/>
                        <MyRoute path='/receptList/:department'
                                 component={ReceptListPage}
                                 action={fetchReceptsByDepart}
                                 args={[{router: 'department'}]}/>
                    </Switch>
                    <Sidebar/>
                </Content>
            </div>
        );
    }
}

export default App;