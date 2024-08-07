/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * error 
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

/**
 * basic error implementation.
 * @param {Error} err object
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
export const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
