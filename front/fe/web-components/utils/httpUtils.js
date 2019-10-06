import mSpinner from '../model/spinner';
import mNotification from '../model/notification';

export const getResponse = (response) => {
    if (!response.ok) {
         return response.json().then(json => {
             throw new Error(json.message);
         });
    }
    return response.json();
}

export const processResponse = (promise) => {
    mSpinner.loading = true;
    return promise
        .then(getResponse)
        .catch(e => {
            mNotification.message = e.message;
            console.error(e);
        })
        .finally(() => mSpinner.loading = false);
}

export const doJsonRequest = (route, method, body) => {
    return processResponse(fetch(route,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }));
}
