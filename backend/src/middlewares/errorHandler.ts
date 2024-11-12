import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    const statusCode = err.status || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({ message })
}
