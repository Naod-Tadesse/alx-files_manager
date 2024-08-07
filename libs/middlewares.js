import express from 'express';

/**
 * add middle ware with file limit.
 * @param {express.Express} express api
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

export default injectMiddlewares;
