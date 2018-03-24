import React from 'react'
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import {withRouter} from 'react-router';

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


@withRouter
@connect(store => ({
    headerButtons: store.headerButtons
}))
class App extends React.Component {
    render() {
        const {headerButtons} = this.props;
        return (
            <React.Fragment>
                <ControlPanel items={headerButtons}/>
                <div className='.app_container'>
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
                </div>
            </React.Fragment>
        );
    }
}

export default App;