import React from 'react';
import connect from 'redux-connect-decorator';
import {Route} from 'react-router-dom';

@connect(store => ({}))
export default class MyRoute extends Route{

    render() {
        const {args, dispatch, action, computedMatch} = this.props;

        const actionArgs = args && args.map(arg => arg.router
            ? computedMatch.params[arg.router]
            : arg.arg);

        dispatch(action.apply(null, actionArgs));
        return <this.props.component {...this.props} />
    }
}