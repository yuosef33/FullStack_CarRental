const Car = require('../models/Car');

// إضافة سيارة جديدة
const addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllCars = async (req, res) => {
  const page = parseInt(req.query.page) || 1;     // الصفحة المطلوبة
  const limit = parseInt(req.query.limit) || 15;  // عدد السيارات في كل صفحة
  const skip = (page - 1) * limit;

  try {
    const total = await Car.countDocuments(); // إجمالي عدد العربيات
    const cars = await Car.find().skip(skip).limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      carsReturned: cars.length,
      cars
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// جلب كل السيارات حسب النوع
const getCarsByType = async (req, res) => {
  const type = req.params.type;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  try {
    const total = await Car.countDocuments({ type });
    const cars = await Car.find({ type }).skip(skip).limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      cars
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const addMultipleCars = async (req, res) => {
  try {
    const cars = req.body; 
    if (!Array.isArray(cars) || cars.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of cars.' });
    }

    const insertedCars = await Car.insertMany(cars);
    res.status(201).json(insertedCars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
 
const deleteAllCars = async (req, res) => {
  try {
    await Car.deleteMany({});
    res.status(200).json({ message: 'All cars have been deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCarByBrand = async (req, res) => {

  const brand = req.params.brand;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  try {
    const total = await Car.countDocuments({ brand });
    const cars = await Car.find({ brand }).skip(skip).limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      cars
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


module.exports = {
  addCar,
  getAllCars,
  getCarsByType,
  addMultipleCars,
  deleteAllCars,
  getCarByBrand
};