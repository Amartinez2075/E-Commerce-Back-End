const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  category.findall({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  findone({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  create({
    category_name: req.body.category_name,
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }
  );

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
    where: {
      id: req.params.id,
    },
  }
  )
  .then((dbCategoryData) => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  }
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }
  );

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  destroy({
    where: {
      id: req.params.id,
    },
  }
  )
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  }
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }
  );
});

module.exports = router;


//The insomnia route is localhost:3001/api/categories