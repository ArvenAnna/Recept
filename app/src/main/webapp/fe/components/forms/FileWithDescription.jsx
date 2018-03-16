import React from 'react';
import styled from 'styled-components';
import ReceptFileInput from "./ReceptFileInput.jsx";
import {AddIcon} from "../styled/icons.jsx";
import {SmallText} from "../styled/textFields.jsx";

const Section = styled.div`
    display: inline-block;
    margin: 5px 0;
`

class FileWithDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {file: null, text: ''};
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.add = this.add.bind(this);
    }

    onChangeText({target}) {
        this.setState({
            text: target.value
        });
    }

    onChangeFile(file) {
        this.setState({
            file
        });
    }

    add() {
        if (this.state.file) {
            this.props.addDetail(this.state.text, this.state.file);
            this.setState({
                file: null,
                text: ''
            });
        }
    }

    render() {
        return <Section>
            <SmallText value={this.state.text}
                      placeholder={this.props.placeholder}
                      onChange={this.onChangeText}/>
            <ReceptFileInput onChangeInput={this.onChangeFile}/>
            <AddIcon onClick={this.add}/>
        </Section>;
    }
}

export default FileWithDescription;