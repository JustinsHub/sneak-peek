class ExpressError extends Error {
    // message: string
    status: number
    constructor(message: string, status: number){
        super()
        this.message = message
        this.status = status
        console.error(this.stack)
    }
}

class ErrorBadRequest extends ExpressError {
    constructor(message:string = "Bad Request"){
        super(message, 400)
    }
}
class ErrorNotAuthorized extends ExpressError {
    constructor(message:string = "Not Authorized"){
        super(message, 401)
    }
}
class ErrorNotFound extends ExpressError {
    constructor(message:string = "Not Found"){
        super(message, 404)
    }
}

export {
    ExpressError,
    ErrorBadRequest,
    ErrorNotAuthorized,
    ErrorNotFound
}