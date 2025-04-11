import mongoose, { ObjectId, Schema } from 'mongoose';
const validator = require('validator');

const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

//static function to create a category
categorySchema.statics.createCategory = async function (
  name: string,
  userId: string
) {
  //validation
  if (!name) {
    throw new Error('name not provided');
  }
  if (!userId) {
    throw new Error('userId not provided');
  }
  if (!validator.isAlphanumeric(name)) {
    throw new Error('name can only contain alphanumeric values');
  }

  const category = await this.create({
    name,
    userId,
  });

  return category;
};

//static function to modify a category
categorySchema.statics.modifyCategory = async function (
  id: ObjectId,
  name: string,
  userId: string
) {
  //validation
  if (!name) {
    throw new Error('name not provided');
  }
  if (!userId || !id) {
    throw new Error('userId or categoryId not provided');
  }
  if (!validator.isAlphanumeric(name)) {
    throw new Error('name can only contain alphanumeric values');
  }

  const category = await this.findByIdAndUpdate(id, {
    $set: { name: name, updatedAt: new Date() },
  });

  const updatedCategory = await this.findById(id);
  return { category, updatedCategory };
};

//static function to delete a category
categorySchema.statics.deleteCategory = async function (id: ObjectId) {
  //validator
  if (!id) {
    throw new Error('categoryid not provided');
  }

  const category = await this.findByIdAndDelete(id);

  return category;
};

//static function to get a single category
categorySchema.statics.getCategory = async function (id: ObjectId) {
  //validator
  if (!id) {
    throw new Error('categoryid not provided');
  }

  const category = await this.findById(id).populate('userId', '_id username');

  return category;
};

//static function to get all the categories
categorySchema.statics.getAllCategories = async function (userId: ObjectId) {
  //validator
  if (!userId) {
    throw new Error('userId not provided');
  }

  const categories = await this.find({ userId: userId }).populate(
    'userId',
    '_id username'
  );

  return categories;
};

module.exports = mongoose.model('Category', categorySchema);
