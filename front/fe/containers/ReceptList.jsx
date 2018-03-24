import React from 'react';
import connect from 'redux-connect-decorator';
import ReceptItem from '../components/simple/ReceptItem.jsx';

@connect(store => ({
    receptList: store.receptList
}))

class ReceptListPage extends React.Component {

    render() {
        return <div>
            {this.props.receptList.map(item => <ReceptItem key={item.id} item={item}/>)}
        </div>;
    }
}

export default ReceptListPage;