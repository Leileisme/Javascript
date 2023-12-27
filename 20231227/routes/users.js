import { Router } from 'express'
import { create, addCart, getId } from '../controllers/users.js'

const router = new Router()

router.post('/', create)
router.post('/:id/cart', addCart)
router.get('/:id', getId)

export default router
