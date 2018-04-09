import React from 'react';
import connect from 'redux-connect-decorator';
import ControlPanel from '../components/simple/ControlPanel.jsx';
import {fetchDepartments} from '../actions/SidebarActions';
import VerticalMenuButton from '../components/simple/VerticalMenuButton';

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
        const {className, departments} = this.props;
        return <div className={`vertical_menu ${className ? className : ''}`}>
            {departments.map(item => <VerticalMenuButton
                key={item.id}
                text={item.name}
                to={item.to}/>)}
        </div>
    }

}

export default Sidebar;