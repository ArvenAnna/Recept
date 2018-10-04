import axios from 'axios';

class HttpService {
    constructor() {
        this.http = axios.create({
            headers: {"Content-Type": "application/json"},
            responseType: 'json',
            transformFromResponse: [result =>  result.data],
            transformRequest: [(data, headers) => {
                return data instanceof FormData ? data : JSON.stringify(data);
            }]
        });
    }

    doGet(route, transformResponse) {
        return this.http
            .get(route)
            .then(result =>  transformResponse ? transformResponse(result.data) : result.data);
    }

    doDelete(route, transformResponse) {
        return this.http
            .delete(route)
            .then(result =>  transformResponse ? transformResponse(result.data) : result.data);
    }

    doPost(route, request, transformResponse) {
        return this.http.post(route, request)
            .then(result =>  transformResponse ? transformResponse(result.data) : result.data);
    }

    doPut(route, request, transformResponse) {
        return this.http.put(route, request)
            .then(result =>  transformResponse ? transformResponse(result.data) : result.data);
    }

    sendFile(route, file) {
        let fd = new FormData();
        fd.append('file', file);
        //fd.append('receptId', receptId);
        return this.http
            .post(route, fd, {
                headers: {'Content-Type': undefined}
            }).then(response => response.data);
    }
}

export default new HttpService();