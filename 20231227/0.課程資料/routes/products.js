import { Router } from 'express'
import { create, getId, getAll } from '../controllers/products.js'

const router = new Router()

router.post('/', create)
router.get('/:id', getId)
router.get('/', getAll)

export default router
