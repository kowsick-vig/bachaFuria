const Class = require('../models/classModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.aliasCheapClasses = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = 'price';
  req.query.fields = 'name,price,image,difficulty';
  next();
};

exports.getAllClasses = async (req, res) => {
  console.log(req.query);
  try {
    const features = new ApiFeatures(Class.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const classes = await features.query;
    res.status(200).json({
      status: 'success',
      results: classes.length,
      data: {
        classes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getClass = async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        class: singleClass,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        class: newClass,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        class: updatedClass,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getClassStats = async (req, res) => {
  try {
    const stats = await Class.aggregate([
      {
        $match: { price: { $gt: 7 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
