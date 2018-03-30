import React from 'react';
import styled from 'styled-components';
import {SearchIcon} from "../styled/icons.jsx";

const FileChooser = styled.div`
     margin: 5px 5px 5px 0;
     
     position: relative;
     overflow: hidden;
     display: inline-block;
     vertical-align: middle;
    
    svg {
        display: inline-block;
        vertical-align: middle;
    }
    
    div {
        display: inline-block;
        vertical-align: middle;
    }
     
     input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scale(20);
        letter-spacing: 10em;     /* IE 9 fix */
        -ms-transform: scale(20); /* IE 9 fix */
        opacity: 0;
        cursor: pointer
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