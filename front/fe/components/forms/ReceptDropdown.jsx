import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Dropdown} from '../styled/textFields.jsx';
import {ArrowUp, ArrowDown} from '../styled/icons.jsx';

const DropdownList = styled.div`
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
    padding: 0 0.5rem;
    cursor: pointer;
    box-shadow: ${props => props.theme.fieldShadow};
    position: absolute;
    font-size: ${props => props.theme.fieldFontSize};
`

class ReceptDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            selectedItemIndex: props.selectedItemIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedItemIndex != this.props.selectedItemIndex) {
            this.setState({selectedItemIndex: nextProps.selectedItemIndex});
        }
    }

    componentDidMount() {
        // svg tag has null parentNode, it is not detected as descendant of container
        // to avoid this we need to set capture phase true in order this event handler will be overriden by onClick on container's element
        document.addEventListener('click', (e) => this.clickOutside(e), true)
    }

    clickOutside(e) {
        if (!this.isDescendantOf(e.target, this.container)) {
            this.setState({opened: false});
        }
    }

    isDescendantOf(element, parent) {
        let node = element;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    onSelect(item) {
        const {items} = this.props;
        this.setState({selectedItemIndex: items.indexOf(item)},
            () => this.props.onChangeDropdown(item));
    }

    render() {
        const {items, className} = this.props;
        const {selectedItemIndex} = this.state;

        return <div className={className}>
            <Dropdown ref={r => this.container = r} onClick={() => this.setState({opened: !this.state.opened})}>
                <div>
                    {selectedItemIndex != -1 ? items[selectedItemIndex].name + ' ' : ' '}
                    {this.state.opened ? <ArrowUp/> : <ArrowDown/>}
                </div>
            </Dropdown>
            {this.state.opened && <DropdownList>
                {items.map((item, index) =>
                    <div key={index} onClick={() => this.onSelect(item)}>{item.name}</div>)}
            </DropdownList>}
        </div>;
    }
}

ReceptDropdown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    onChangeDropdown: PropTypes.func,
    selectedItemIndex: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
}

export default ReceptDropdown;