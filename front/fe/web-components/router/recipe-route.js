import { getHash } from './router';
import routerContext from './router-context';

const template = document.createElement('template');
template.innerHTML = `
  <content/>
`;

const supportedAttributes = {
    PATH: 'path'
}

class RecipeRoute extends HTMLElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    constructor() {
        super();
        this.matches = this.matches.bind(this);
        this.getRouteContextInfo = this.getRouteContextInfo.bind(this);
        this.updateRoute = this.updateRoute.bind(this);

        const path = this.getAttribute(supportedAttributes.PATH);
        const url = getHash(window.location.hash);
        if (this.matches(path, url)) {
            this.appendChild(template.content.cloneNode(true));

            //set object with route info to first child (can be set to every child)
            //initially fill private field because of constructor is not called yet: TODO: think how to do it normally
            routerContext.context = this.getRouteContextInfo(path, url);
            //this.children[0]._context = this.getRouteContextInfo(path, url);
        } else {
            // otherwise don't render children
            this.innerHTML = '';
        }
    }

    updateRoute(e) {

        const path = this.getAttribute(supportedAttributes.PATH);
        const url = getHash(e.newURL);

        if (this.matches(path, url)) {

            // if route was already rendered do nothing
            if (this.innerHTML) {

            } else {
                this.appendChild(template.content.cloneNode(true));
            }

            // reset context anyway
            // this.children[0].context = this.getRouteContextInfo(path, url);
            routerContext.context = this.getRouteContextInfo(path, url);
        } else {
            // check if this route stays active, if no - kill it
            this.innerHTML = '';
        }
    }

    getRouteContextInfo(route, url) {
        //todo: set params including parents
        const routeParts = route.split('/');

        const context = {
            url,
            pathVariables: {

            }
        };

        url.split('/').forEach((part, i) => {
            if (routeParts[i].startsWith(':')) {
                const variableName = routeParts[i].substr(1);
                context.pathVariables[variableName] = part;
            }
        });

        return context;
    }

    matches(route, url) {
        //with support of variable path parameters and not full path for supporting nested routes:
        // /recipe/1/user/4/part/3 == /recipe/:id/user/:userId and /part/:partId

        //find full path - search up to document for such Route objects and concat path

        let fullPathFragments = [route];
        let el = this;
        while(el.parentElement.closest('recipe-route')) {
            fullPathFragments.push(el.parentElement.closest('recipe-route').getAttribute('path'));
        }
        const fullPath = fullPathFragments.reverse().join();


        //analyze url:
        const fullPathParts = fullPath.split('/');

        if(url.split('/').length !== fullPathParts.length) {
            return false;
        }

        url.split('/').forEach((part, i) => {

            if (part != fullPathParts[i] && !fullPathParts[i].startsWith(':')) {
                return false;
            }
        });
        return true;
    }

    connectedCallback() {
        window.addEventListener('hashchange', this.updateRoute);
        // const path = this.getAttribute(supportedAttributes.PATH);
        // const url = getHash(window.location.hash);
        // this.children[0].context = this.getRouteContextInfo(path, url);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.updateRoute);
    }

}

customElements.define('recipe-route', RecipeRoute);