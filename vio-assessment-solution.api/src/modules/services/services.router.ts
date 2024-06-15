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
   *          description: Get service details
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Service id
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
   *          requestBody:
   *              description: "Create service payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/createService'
   */
  router.post('/', validateBody(createServiceReqSchema), RequestHandler(servicesController.create));

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
   *          requestBody:
   *              description: "Create service payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/updateService'
   */
  router.put('/', validateBody(updateServiceReqSchema), RequestHandler(servicesController.update));

  /**
   * @swagger
   * /api/v1/services/{id}/start:
   *      put:
   *          tags:
   *              - Services
   *          description: Start service
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Service id
   *                  required: true
   */
  router.put('/:id/start', validateParams(idSchema), RequestHandler(servicesController.start));

  /**
   * @swagger
   * /api/v1/services/{id}/stop:
   *      put:
   *          tags:
   *              - Services
   *          description: Stop service
   *          security:
   *              - Bearer: []
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Service id
   *                  required: true
   */
  router.put('/:id/stop', validateParams(idSchema), RequestHandler(servicesController.stop));

  /**
   * @swagger
   * /api/v1/services/{id}:
   *      delete:
   *          tags:
   *              - Services
   *          description: Delete service
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
