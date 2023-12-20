import { Router } from 'express';
import { RequestHandler, validateBody, validateParams } from 'cexpress-utils/lib';
import { UpdateUserPayloadSchema, UsersController } from '.';
import { idSchema } from '../../schemas';

export const USERS_ROUTER_INSTANCE_NAME = 'usersRouter';
export const USERS_BASE_API_PATH = 'users';

export function UsersRouter (usersController:UsersController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/v1/users/{id}:
   *      get:
   *          tags:
   *              - Users
   *          description: Get user
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  required: true
   */
  router.get('/:id', validateParams(idSchema), RequestHandler(usersController.get));

  /**
   * @swagger
   * /api/v1/users:
   *      get:
   *          tags:
   *              - Users
   *          description: Get all users
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   */
  router.get('/', RequestHandler(usersController.getAll));

  /**
   * @swagger
   * /api/v1/users:
   *      patch:
   *          tags:
   *              - Users
   *          description: Update user
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          requestBody:
   *              description: "Update user payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/updateUser'
   */
  router.patch('/', validateBody(UpdateUserPayloadSchema), RequestHandler(usersController.update));

  /**
   * @swagger
   * /api/v1/users:
   *      delete:
   *          tags:
   *              - Users
   *          description: Delete user
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  required: true
   */
  router.delete('/:id', RequestHandler(usersController.delete));

  return router;
}
