import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsController = () => import('#controllers/products_controller')
const SellsController = () => import('#controllers/sells_controller')
const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('#controllers/clients_controller')

router
  .group(() => {
    router.post('/signup', [UsersController, 'signup'])
    router.post('/login', [UsersController, 'login'])
  })
  .prefix('/user')

router
  .group(() => {
    router.resource('/client', ClientsController).except(['create', 'edit'])
    router.resource('/product', ProductsController).except(['create', 'edit'])
    router.post('/sell', [SellsController, 'store'])
  })
  .use(middleware.auth())
