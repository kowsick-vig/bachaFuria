const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Class = require('../models/classModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const classes = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf8'),
);

const importData = async () => {
  try {
    await Class.create(classes);
    console.log('Data Successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Class.deleteMany();
    console.log('Data Successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection is successful'));

console.log(process.argv);

if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  importData();
}
