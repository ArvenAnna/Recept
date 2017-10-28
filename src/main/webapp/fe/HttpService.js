import axios from 'axios';

class HttpService {
    constructor() {
        this.http = axios.create({
            headers: {"Content-Type": "application/json"},
            responseType: 'json'
        });
    }

    doGet(route, transformResponse) {
        return this.http
            .get(route)
            .then(result => {
                if (transformResponse) {
                    return transformResponse(result.data)
                }
                return result.data
            });
    }

    doPost(route, request) {
        return this.http
            .post(route, JSON.stringify(request))
            .then(result => result.data);
    }

    sendFile(route, file) {
        let fd = new FormData();
        fd.append('file', file);
        //fd.append('receptId', receptId);
        return this.http
            .post(route, fd, {
                headers: {'Content-Type': undefined}
            })
            .then(result => result.data);
    }
}

export default new HttpService();