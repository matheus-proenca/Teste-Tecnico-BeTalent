import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')

router.post('/singup', [UsersController, 'singup'])
router.post('/login', [UsersController, 'login'])

router
  .group(() => {
    router.resource('/client', 'ClienteController')
    router.resource('/sell', 'SellsController')
    router.post('/product', 'ProductsController.store')
  })
  .use(middleware.auth())
