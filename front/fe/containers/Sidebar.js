import React from 'react';
import connect from 'redux-connect-decorator';
import {fetchDepartments} from '../actions/SidebarActions';
import NavButton from '../components/simple/NavButton';
import {withRouter} from 'react-router-dom';

@withRouter
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
            {departments.map(item => <NavButton key={item.id} item={item}/>)}
        </div>
    }

}

export default Sidebar;