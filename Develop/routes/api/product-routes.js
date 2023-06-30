const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// get all products
router.get('/', (req, res) => {
  // Find all products and include associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
      },
    ],
  })
    .then((products) => res.status(200).json(products))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // Find a single product by its `id` and include associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
      },
    ],
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  // Create a new product with the given request body
  Product.create(req.body)
    .then((product) => {
      // If there are product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id,
        }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then(() => res.status(200).json({ message: "Product created successfully" }))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // Update product data for the given product id
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => ({
              product_id: req.params.id,
              tag_id,
            }));
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }
      res.json({ message: "Product updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Delete a single product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;