import React from 'react';
import NavLink from 'react-router-dom';
import PropTypes from 'prop-types';

const NavButton = ({item}) => <NavLink to={item.to} className='nav_button'>
                {item.name}
            </NavLink>

NavButton.propTypes = {
    item: PropTypes.shape({
        to: PropTypes.string.required,
        name: PropTypes.string
    })
}

export default NavButton;