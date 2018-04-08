import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from '../styled/textFields.jsx';
import {ArrowUp, ArrowDown} from '../styled/icons.jsx';
import {DropdownList} from '../styled/textFields';
import styled from 'styled-components';
import {isDescendantOf} from '../../utils/domUtils';

const DropdownContainer = styled.div`
    
    .outlined {
        color: ${props => props.theme.button};
        font-weight: 600;
    }
`

class ReceptDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            outlined: props.selectedItemIndex,
            selectedItemIndex: props.selectedItemIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedItemIndex != this.props.selectedItemIndex) {
            this.setState({selectedItemIndex: nextProps.selectedItemIndex});
        }
    }

    componentDidMount() {
        document.addEventListener('click', (e) => this.clickOutside(e));
        document.addEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.clickOutside(e));
        document.removeEventListener('keydown', (e) => this.onKeyPress(e.key));
    }

    onKeyPress(key) {
        if(this.state.opened) {
            const {items} = this.props;
            const {outlined} = this.state;
            if (key == 'ArrowDown') {
                if(outlined == items.length - 1) {
                    this.setState({outlined: 0});
                } else {
                    this.setState({outlined: outlined + 1});
                }
            }
            if (key == 'ArrowUp') {
                if(outlined == 0) {
                    this.setState({outlined: items.length - 1});
                } else {
                    this.setState({outlined: outlined - 1});
                }
            }
            if (key == 'Enter') {
                this.onSelect(items[outlined], outlined);
            }
        }
    }

    clickOutside(e) {
        if (isDescendantOf(e.target, this.container)) {
            this.setState({opened: !this.state.opened});
        } else {
            this.setState({opened: false});
        }
    }

    onSelect(item, index) {
        const {items} = this.props;
        this.setState({selectedItemIndex: items.indexOf(item), outlined: index},
            () => this.props.onChangeDropdown(item));
    }

    render() {
        const {items, className} = this.props;
        const {selectedItemIndex, outlined} = this.state;

        if (!items || items.length == 0) {
            return null;
        }

        return <DropdownContainer className={className}>
            <Dropdown innerRef={r => this.container = r}>
                <div>
                    {selectedItemIndex != -1 ? items[selectedItemIndex].name + ' ' : ' '}
                    {this.state.opened ? <ArrowUp className='ArrowUp'/> : <ArrowDown className='ArrowDown'/>}
                </div>
            </Dropdown>
            {this.state.opened && <DropdownList>
                {items.map((item, index) =>
                    <div key={index}
                         className={outlined == index ? 'outlined' : ''}
                         onClick={() => this.onSelect(item, index)}>{item.name}</div>)}
            </DropdownList>}
        </DropdownContainer>;
    }
}

ReceptDropdown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    onChangeDropdown: PropTypes.func,
    selectedItemIndex: PropTypes.number.isRequired,
    className: PropTypes.string
}

export default ReceptDropdown;