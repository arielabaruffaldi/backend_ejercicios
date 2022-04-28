import { Request, Response, NextFunction } from 'express';

export const isAdmin = (Request, Response, NextFunction) => {
    const isAdminVal = true
    if (!isAdminVal) {
        Response.status(401).json({ error: 401, message: 'ruta no autorizada' })
    } else {
        NextFunction()
    }
}