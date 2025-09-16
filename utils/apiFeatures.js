class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Extracting Query
    const queryObj = { ...this.queryString }; //need the query object untouched so we create a new temp object.
    const excludedFiles = ['page', 'sort', 'limit', 'fields'];
    excludedFiles.forEach((element) => {
      delete queryObj[element];
    });

    // Further quering for MongoDB query operators($lte, $gte etc...)
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(queryString));
    // Returning the object for chaining purpose.
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const field = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(field);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const totalDocs = await Class.countDocuments();
    //   if (skip >= totalDocs)
    //     throw new Error('This page does not exists');
    // }
    return this;
  }
}

module.exports = ApiFeatures;
