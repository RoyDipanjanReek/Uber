export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? 'fail' : 'error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export const catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, nexr).catch(next)
    }
}

//handle jwt
export const handleJwtError = () => {
    new ApiError("Invalid token. Please login again", 401)
}