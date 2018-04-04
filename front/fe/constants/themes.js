const red = {
    light: 'red'
};

//const shadowRadius = '3px';

const greenBase = {
    shadowRadius: '3px',
    buttonColor: '#24ea7b',
    buttonShadowColor: '#0f6b38'
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
    iconHoverColor: '#24ea7b'
};


module.exports = Object.assign({}, greenBase, green);

// export {
//     red,
//     green as default
// }