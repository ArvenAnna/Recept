import React from 'react';
import styled from 'styled-components';
import {SearchIcon} from '../styled/icons.jsx';
import PropTypes from 'prop-types';

const FileChooser = styled.div`
     margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
     padding: 0.5rem;
     position: relative;
     box-shadow: ${props => props.theme.buttonShadow};
     display: flex;
     align-items: center;
     justify-content: center;
 
     input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
     }
`

class ReceptFileInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: "Главное фото"};
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clean !== this.props.clean && nextProps.clean) {
            this.cleanFile();
        }
    }

    cleanFile() {
        this.setState({
            name: "Файл не выбран"
        })
    }

    onChange({target}) {
        this.setState({
            name: target.files[0].name
        })
        this.props.onChangeInput(target.files[0]);
    }

    render() {
        const {className, title} = this.props;
        return <FileChooser className={className}>
            <SearchIcon/>
            <input type='file' onChange={this.onChange}/>
            <div>{title ? title : this.state.name}</div>
        </FileChooser>;
    }
}

ReceptFileInput.propTypes = {
    onChangeInput: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string
}

export default ReceptFileInput;