const express = require('express');
const router = express.Router();
const {
  addCar,
  getAllCars,
  getCarsByType,
  addMultipleCars,
  deleteAllCars,
  getCarByBrand
} = require('../controllers/carController');

router.post('/', addCar);

router.post('/bulk', addMultipleCars);

router.get('/', getAllCars);

router.get('/type/:type', getCarsByType);

router.delete('/', deleteAllCars);
 
router.get('/brand/:brand', getCarByBrand);

module.exports = router;
