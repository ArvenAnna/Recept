import React from 'react';
import connect from 'redux-connect-decorator';
import ControlPanel from '../components/simple/ControlPanel.jsx';
import {fetchDepartments} from '../actions/SidebarActions';

@connect(store => ({
    departments: store.departments
}), {
    fetchDepartments
})

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchDepartments();
    }

    render() {
        return <ControlPanel items={this.props.departments} vertical={true} className={this.props.className}/>;
    }

}

export default Sidebar;