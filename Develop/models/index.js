// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Catagories.hasMany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tag_name',
  foreignKey: 'tag_id',
});
// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Product, {
  through: ProductTag,
  as: 'tags_name',
  foreignKey: 'tag_id',
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
