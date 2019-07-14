import routerContext from './router-context';

const supportedAttributes = {
    PATH: 'path',
    COMPONENT: 'component'
}

const getHash = (url) => {
    return url.split('#')[1] || '';
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
        this.renderRouteContent = this.renderRouteContent.bind(this);

        this.innerHTML = '';
        this.renderRouteContent(window.location.hash);
    }

    updateRoute(e) {
        this.renderRouteContent(e.newURL);
    }

    renderRouteContent(newURL) {

        const path = this.getAttribute(supportedAttributes.PATH);
        const url = getHash(newURL);

        if (this.matches(path, url)) {

            //set object with route info into router context object
            // reset context anyway
            routerContext.context = this.getRouteContextInfo(path, url);

            // if route was already rendered do nothing
            if (this.innerHTML) {

            } else {
                const component = this.getAttribute(supportedAttributes.COMPONENT);
                const template = document.createElement('template');
                template.innerHTML = `
                <${component}></${component}>
            `;


                this.appendChild(template.content.cloneNode(true));
            }


        } else {
            // otherwise don't render children
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

        let matches = true;

        url.split('/').forEach((part, i) => {

            if (part != fullPathParts[i] && !fullPathParts[i].startsWith(':')) {
                matches = false;
            }
        });
        return matches;
    }

    connectedCallback() {
        window.addEventListener('hashchange', this.updateRoute);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.updateRoute);
    }

}

customElements.define('recipe-route', RecipeRoute);
