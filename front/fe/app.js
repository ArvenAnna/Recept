import React from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from "react-router-dom";
import {ThemeProvider} from 'styled-components';
import './web-components/router/router';

import AppContainer from './containers/App.jsx';
const theme = require('./constants/themes');
import './styles/main.less';
import './styles/_create_receipt_page.less'
import store from './Store.js';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <HashRouter>
                <AppContainer/>
            </HashRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('mount')
)