import React from 'react';
import HorizontalMenuButton from './HorizontalMenuButton.tsx';

const ControlPanel = ({items, className}) => {
        return <div className={`horizontal_menu ${className ? className : ''}`}>
            {items.map(item => <HorizontalMenuButton
                key={item.id}
                text={item.name}
                to={item.to}
                onClick={item.onClick}/>)}
        </div>;
}

// ControlPanel.propTypes = {
//     vertical: React.PropTypes.bool,
//     items: React.PropTypes.arrayOf(
//         React.PropTypes.shape({
//             id: React.PropTypes.number,
//             name: React.PropTypes.string,
//             to: React.PropTypes.string,
//             onClick: React.PropTypes.func
//         })
//     )
// }
//
// ControlPanel.defaultProps = {
//     vertical: false
// }

export default ControlPanel;