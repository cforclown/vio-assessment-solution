import { Router } from 'express';
import { RequestHandler, validateBody, validateParams } from 'cexpress-utils/lib';
import { createServiceReqSchema, updateServiceReqSchema } from 'vio-assessment-solution.contracts';
import { ServicesController } from '..';
import { idSchema } from '../../schemas';

export const SERVICES_ROUTER_INSTANCE_NAME = 'servicesRouter';
export const SERVICES_BASE_API_PATH = 'services';

export function servicesRouter (servicesController: ServicesController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/v1/services/{id}:
   *      get:
   *          tags:
   *              - Services
   *          description: Get channel details
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Channel id
   *                  required: true
   */
  router.get('/:id', validateParams(idSchema), RequestHandler(servicesController.get));

  /**
   * @swagger
   * /api/v1/services:
   *      get:
   *          tags:
   *              - Services
   *          description: Get all services
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   */
  router.get('/', RequestHandler(servicesController.getAll));

  /**
   * @swagger
   * /api/v1/services:
   *      post:
   *          tags:
   *              - Services
   *          description: Create service
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   */
  router.get('/', validateBody(createServiceReqSchema), RequestHandler(servicesController.create));

  /**
   * @swagger
   * /api/v1/services:
   *      put:
   *          tags:
   *              - Services
   *          description: Update service
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   */
  router.put('/', validateBody(updateServiceReqSchema), RequestHandler(servicesController.update));

  /**
   * @swagger
   * /api/v1/services/{id}:
   *      delete:
   *          tags:
   *              - Services
   *          description: Delete channel
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  required: true
   */
  router.delete('/:id', validateParams(idSchema), RequestHandler(servicesController.delete));

  return router;
}
