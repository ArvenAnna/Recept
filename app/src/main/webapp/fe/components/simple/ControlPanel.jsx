import React from 'react';
import HorizontalMenuButton from './HorizontalMenuButton.tsx';
import VerticalMenuButton from './VerticalMenuButton.jsx';

const ControlPanel = ({vertical, items}) => {
        const Button = vertical ? VerticalMenuButton : HorizontalMenuButton;
        return <div>
            {items.map(item => <Button
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