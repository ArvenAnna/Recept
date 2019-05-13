import React from 'react';
import {copyReceptToNew} from '../actions/CreateReceptActions';
import {addHeaderButton, removeHeaderButton} from '../actions/CommonActions';
import connect from 'redux-connect-decorator';
import ReceptPage from './ReceptPage';

@connect(store => ({
    recept: store.chosenRecept
}), {
    // editRecept: copyReceptToNew,
    addHeaderButton: addHeaderButton,
    removeHeaderButton: removeHeaderButton
})
class ReceptPageConnect extends React.Component {
    render() {
        const {recept, editRecept, addHeaderButton, removeHeaderButton} = this.props;
        return <ReceptPage recept={recept}
                           addHeaderButton={addHeaderButton}
                           removeHeaderButton={removeHeaderButton}
                           editRecept={editRecept} />
    }
}

export default ReceptPageConnect;
