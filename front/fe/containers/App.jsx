import React from 'react'
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import {withRouter} from 'react-router';

import Sidebar from './Sidebar';
import IngridientsPage from './IngridientsPage';
import ReceptListPage from './ReceptList.jsx';
import ReceptPage from './ReceptPage';
import EditReceptPage from './CreateReceptPage';
import HorizontalMenuButton from '../components/simple/HorizontalMenuButton.tsx';

import {copyReceptToNew} from '../actions/EditActions';
import MyRoute from "./MyRoute.jsx";
import {fetchRecept, fetchReceptsByDepart} from "../actions/MainActions";
import {fetchIngridients} from "../actions/IngridientActions";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import Alert from 'react-s-alert';

@withRouter
@connect(store => ({
    headerButtons: store.headerButtons
}))
class App extends React.Component {
    render() {
        const {headerButtons} = this.props;
        return ([
            <div className='app_container'>
                <div className='horizontal_menu nav_menu'>
                    {headerButtons.map(item => <HorizontalMenuButton
                        key={item.id}
                        text={item.name}
                        to={item.to}
                        onClick={item.onClick}/>)}
                </div>
                <div className='app_body'>
                    <div className='app_body_content'>
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
                    </div>
                    <Sidebar className='side_menu'/>
                </div>
            </div>,
			<Alert stack={{limit: 6}}
				   key='alert'
				   effect='genie'
				   timeout={5000}
				   position='bottom-right'
			/>
        ]);
    }
}

export default App;