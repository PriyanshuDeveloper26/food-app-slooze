import express from 'express';
import {
  getRestaurants,
  getRestaurant,
  getRestaurantMenu
} from '../controllers/restaurantController.js';
import { protect, restrictToCountry } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictToCountry);

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.get('/:id/menu', getRestaurantMenu);

export default router;
