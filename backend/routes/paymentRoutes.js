import express from 'express';
import {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPaymentMethods)
  .post(authorize('admin'), addPaymentMethod);

router.route('/:id')
  .put(authorize('admin'), updatePaymentMethod)
  .delete(authorize('admin'), deletePaymentMethod);

export default router;
