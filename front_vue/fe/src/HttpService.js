import HttpError from './utils/HttpError'

class HttpService {
    doGet (route) {
        return this.processResponse(route, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    doDelete (route) {
        return this.processResponse(route, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    doPost (route, request) {
        return this.processResponse(route, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    doPut (route, request) {
        return this.processResponse(route, {
            method: 'PUT',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    sendFile (route, file) {
        let fd = new FormData()
        fd.append('file', file)

        return this.processResponse(route, {
            method: 'POST',
            body: fd,
            headers: {
                'Content-Type': undefined
            }
        })
    }

    processResponse (route, config) {
        return fetch(route, config)
            .then(response => ({
                response: response.json(),
                failed: response.status !== 200 }))
            .then(responseObj => {
                if (responseObj.failed) {
                    return responseObj.response
                        .then(result => {
                            throw new HttpError(result)
                        })
                }
                return responseObj.response
            })
    }
}

export default new HttpService()
