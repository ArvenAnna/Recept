import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReceptFileInput from './ReceptFileInput.jsx';
import {AddIcon} from '../styled/icons.jsx';
import {Text} from '../styled/textFields.jsx';
import Image from '../simple/Image';
import Alert from 'react-s-alert';

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
        this.state = {
            file: null,
            text: '',
            fileUrl: null
        };
        this.reader = new FileReader();
    }

    onChangeText = ({target}) => {
        this.setState({text: target.value});
    }

    getFileUrl = (file) => {
		this.reader.onload = (e) =>
            this.reader && this.setState({fileUrl: e.target.result, file});
		this.reader.onerror = () => Alert.error('К сожалению, файл не может быть загружен', {});
        this.reader.readAsDataURL(file);
    }

    componentWillUnmount() {
        this.reader = null;
    }

    add = () => {
        if (this.state.file) {
            this.props.addDetail(this.state.text, this.state.file);
            this.setState({
                file: null,
                text: '',
                fileUrl: null
            });
        } else {
			Alert.info('Выберите фото', {});
        }
    }

    render() {
        const {fileUrl, file, text} = this.state;
        const {className, placeholder} = this.props;
        return <Section className={className}>
            {fileUrl
                ? <Image src={fileUrl}
                         className='description_file_field'
                         onRemove={() => this.setState({fileUrl: null, file: null})}/>
                : <ReceptFileInput onChangeInput={this.getFileUrl}
                         className='description_file_field'
                         title='Добавить фото'
                         clean={!file}/>}
            <FlexWrapper>
                <Text value={text}
                      size='1'
                      className='description_field'
                      placeholder={placeholder}
                      onChange={this.onChangeText}/>
                <AddIcon onClick={this.add}/>
            </FlexWrapper>
        </Section>;
    }
}

FileWithDescription.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
	addDetail: PropTypes.func
}

export default FileWithDescription;