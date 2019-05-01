class HttpError extends Error {
    constructor (error) {
        super('custom http error: backend call failed')
        this.error = error
    }
}

export default HttpError
