import React from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from 'styled-components';

import AppContainer from './containers/App.jsx';
import green from './constants/themes';
import './main.less';
import store from './Store.js';

ReactDOM.render(
    <ThemeProvider theme={green}>
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('mount')
)