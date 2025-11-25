import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  checkoutOrder,
  cancelOrder
} from '../controllers/orderController.js';
import { protect, authorize, restrictToCountry } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictToCountry);

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.get('/:id', getOrder);

// Only Admin and Manager can checkout
router.put('/:id/checkout', authorize('admin', 'manager'), checkoutOrder);

// Only Admin and Manager can cancel
router.put('/:id/cancel', authorize('admin', 'manager'), cancelOrder);

export default router;
