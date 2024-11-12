export class CustomError extends Error {
    status?: number

    constructor(message: string, status?: number) {
        super(message)
        if (status) {
            this.status = status
        }
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
