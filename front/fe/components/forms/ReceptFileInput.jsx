import React from 'react';
import styled from 'styled-components';
import {SearchIcon} from "../styled/icons.jsx";

const FileChooser = styled.div`
     margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
     padding: 0.5rem;
     position: relative;
     box-shadow: ${props => props.theme.buttonShadow};
     display: flex;
     align-items: center;
 
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
        this.state = {name: "Файл не выбран"};
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
        return <FileChooser className={this.props.className}>
            <SearchIcon/>
            <input type='file' onChange={this.onChange}/>
            <div>{this.state.name}</div>
        </FileChooser>;
    }
}
//
// ReceptFileInput.propTypes = {
//     onChangeInput: React.PropTypes.func
// }

export default ReceptFileInput;