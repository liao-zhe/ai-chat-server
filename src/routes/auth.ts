import Router from 'koa-router'
import { register, login } from '../controllers/auth'

const router = new Router({
  prefix: '/api/auth'
})

// 注册路由
router.post('/register', register)
// 登录路由
router.post('/login', login)

export default router
