import React from 'react';
import styled from 'styled-components';
import ReceptFileInput from "./ReceptFileInput.jsx";
import {AddIcon} from "../styled/icons.jsx";
import {Text} from "../styled/textFields.jsx";
import Image from '../simple/Image';

const Section = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   
   .description_file_field {
        grid-column-start: 1;
        grid-column-end: 2;
        align-self: stretch;
   }
`

const FlexWrapper = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    
    display: flex;
    align-items: center;
    
   
    .description_field {
        flex: 1;
        align-self: stretch;
        justify-self: stretch;
        width: 2px; //just hack for small screens
    }
`

class FileWithDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {file: null, text: '', fileUrl: null};
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.add = this.add.bind(this);
    }

    onChangeText({target}) {
        this.setState({text: target.value});
    }

    onChangeFile(file) {
        this.getFileUrl(file);
    }

    getFileUrl(file) {
        let reader = new FileReader();
        reader.onload = (e) => this.setState({fileUrl: e.target.result, file});
        reader.readAsDataURL(file);
    }

    add() {
        if (this.state.file) {
            this.props.addDetail(this.state.text, this.state.file);
            this.setState({
                file: null,
                text: '',
                fileUrl: null
            });
        }
    }

    render() {
        const {fileUrl, file, text} = this.state;
        return <Section className={this.props.className}>
            {fileUrl
                ? <Image src={fileUrl}
                         className='description_file_field'
                         onRemove={() => this.setState({fileUrl: null})}/>
                : <ReceptFileInput onChangeInput={this.onChangeFile}
                             className='description_file_field'
                             title='Добавить фото'
                             clean={!file}/>}
            <FlexWrapper>
                <Text value={text}
                      size='1'
                       className='description_field'
                       placeholder={this.props.placeholder}
                       onChange={this.onChangeText}/>
                <AddIcon onClick={this.add}/>
            </FlexWrapper>
        </Section>;
    }
}

export default FileWithDescription;