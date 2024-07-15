import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsController = () => import('#controllers/products_controller')
const SellsController = () => import('#controllers/sells_controller')
const UsersController = () => import('#controllers/users_controller')

router.post('/singup', [UsersController, 'singup'])
router.post('/login', [UsersController, 'login'])

router
  .group(() => {
    router.resource('/client', 'ClienteController')
    router.resource('/product', ProductsController).except(['create', 'edit'])
    router.post('/sell', [SellsController, 'store'])
  })
  .use(middleware.auth())
