const red = {
    light: 'red'
};

//const shadowRadius = '3px';

const screenParameters = {
    middleWidth: '1100px',
    smallWidth: '750px',
    ultraSmallWidth: '550px'
}

const greenBase = {
    shadowRadius: '3px',
    buttonColor: '#24ea7b',
    buttonShadowColor: '#0f6b38',
    overlayColor: 'rgba(0,0,0,0.7)'
}

const green = {
    border: 'mediumseagreen',
    border_2: '#189e53',
    background: 'mediumspringgreen',
    error_background: '#FFA07A',
    error_text: '#FF4500',
    body: '#2aabd2',
    content: '#17954e',
    recept: 'green',
    button: greenBase.buttonColor,
    text: '#0a2713',
    buttonShadow: `0px 0px ${greenBase.shadowRadius} ${greenBase.shadowRadius} ${greenBase.buttonShadowColor}`,
    fieldShadow: `0px 0px ${greenBase.shadowRadius} ${greenBase.shadowRadius} ${greenBase.buttonColor}`,
    shadow: '#0f6b38',
    fieldHeight: '1.3rem',
    fieldFontSize: '0.8rem',
    iconColor: '#0a2713',
    iconHoverColor: '#24ea7b',
    overlayColor: greenBase.overlayColor,
    overlayShadow: `0px 0px ${greenBase.shadowRadius} ${greenBase.shadowRadius} ${greenBase.overlayColor}`,
    buttonColor: greenBase.buttonColor,
    middleWidth: screenParameters.middleWidth,
    smallWidth: screenParameters.smallWidth,
    ultraSmallWidth: screenParameters.ultraSmallWidth,
    minTextareaHeight: 50
};


module.exports = Object.assign({}, greenBase, green);

// export {
//     red,
//     green as default
// }