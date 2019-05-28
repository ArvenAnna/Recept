import App from '../app';
import RecipePageRenderer from '../recipe-page-renderer';

export const getHash = (url) => {
    return url.split('#')[1];
}

const route = (e) => {
    const url = getHash(e.newURL);
    //const component = resolveComponent(url);
    if (url.startsWith('/recipe/') && !document.querySelector('recipe-app')) {
        const template = document.querySelector('.web-c').content.cloneNode(true);
        document.querySelector('#mount').innerHTML = '';
        document.querySelector('#mount').appendChild(template);
    }
}

window.addEventListener('hashchange', route);

window.onload = () => {
    const url = getHash(window.location.hash);
    if (url.startsWith('/recipe/')) {
        const template = document.querySelector('.web-c').content.cloneNode(true);
        document.querySelector('#mount').innerHTML = '';
        document.querySelector('#mount').appendChild(template);
    }
}