const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT');



/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users managment api
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *      tags: [Users] 
 *      summary: Login
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json: 
 *                  schema: 
 *                      $ref: '#/components/schemas/LoginDto' 
 *      responses:
 *          200:
 *              description: Login
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginResponse'
 */
router.route('/login')
    .post(authController.login);


/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *      tags: [Users] 
 *      summary: Returns list of all users
 *      responses: 
 *          200:
 *              description: List of the all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.route('/getAllUsers')
    .get(authController.getAllUsers);


router.route('/refresh')
    .get(authController.refresh);


router.route('/logout')
    .post(authController.logout);

router.route('/register')
    .post(authController.register);


module.exports = router;
