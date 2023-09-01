export class RequestError extends Error {
    constructor(error) {
        const { message } = error
        super(message)

        return ({ ...error })
    }
}