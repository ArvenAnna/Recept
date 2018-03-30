import React from 'react';
import connect from 'redux-connect-decorator';
import ReceptItem from '../components/simple/ReceptItem.jsx';

@connect(store => ({
    receptList: store.receptList
}))

class ReceptListPage extends React.Component {
    render() {
        return this.props.receptList.map(item => <ReceptItem key={item.id} item={item}/>)

    }
}

export default ReceptListPage;