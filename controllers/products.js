import Product from "../models/product.js";

// For Testing
export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const query = {};

  if (featured) {
    query.featured = featured;
  }
  if (company) {
    query.company = company;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };
    const regex = /\b(<|<=|=|>=|>)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        query[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(query);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result.select(fieldList);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);

  const products = await result;
  if (products.length < 1) {
    return res.status(404).json({ msg: "The Product Does Not Exist!" });
  }
  res.status(200).json({ products, nbHits: products.length });
};
