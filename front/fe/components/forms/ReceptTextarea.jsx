import React from 'react';
import {Text} from '../styled/textFields.jsx';
import PropTypes from 'prop-types';
import {minTextareaHeight} from '../../constants/themes';

class ReceptTextarea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {initialValue: prevInitialValue} = this.props;
        const {initialValue: nextInitialValue} = nextProps;
        if (prevInitialValue != nextInitialValue) {
            this.setState({
                value: nextInitialValue
            });
        }
    }

    onChange({target}) {
        this.setState({
            value: target.value
        });
        this.props.onChangeTextarea(target.value);
    }

    /**
     * Make textarea height adjustable to the content height up to the minimum height value, which set from constant.
     * Method relies on overflow=hidden of target textarea,
     *  in other case we can see scroll blink at moving to the new line during the typing;
     * Cases with boxSizing of target textarea different from the 'content-box' or 'border-box' not supported
     * @param e - onKeyUp event on textarea
     */
    autoGrow(e) {
        const minHeight = minTextareaHeight;
        const element = e.target;

        const style = element.currentStyle || window.getComputedStyle(element);

        const rect = element.getBoundingClientRect();

        if (rect.height < element.scrollHeight || rect.height > minHeight) {
            if (style.boxSizing === 'content-box') {
                element.style.height = minHeight + 'px';
                element.style.height = (element.scrollHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom)) + 'px';
            }

            if (style.boxSizing === 'border-box') {
                element.style.height = minHeight + 'px';
                element.style.height = (element.scrollHeight) + 'px';
            }
        }

    }

    render() {
        return <Text value={this.state.value}
                     innerRef={r => this.text = r}
                     size='1'
                     className={this.props.className}
                     onKeyUp={this.autoGrow}
                     placeholder={this.props.placeholder}
                     onChange={this.onChange}/>;
    }
}

ReceptTextarea.propTypes = {
    placeholder: PropTypes.string,
    onChangeTextarea: PropTypes.func,
    initialValue: PropTypes.string
}

export default ReceptTextarea;