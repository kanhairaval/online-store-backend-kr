const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const shoppingCategories = await Category.findAll({
  // be sure to include its associated Products
      include: [{ model: Product}],
    });
    res.status(200).json(shoppingCategories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const shoppingCategories = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
  include: [{ model: Product }],
    });

    if (!shoppingCategories) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(shoppingCategories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const shoppingCategories = await Category.create(req.body);
    res.status(200).json(shoppingCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const shoppingCategories = await Category.update(req.body, {
      where: { id: req.params.id, }
    });
    res.status(200).json(shoppingCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const shoppingCategories = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(shoppingCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

// {
//   "category_name": "E-Sports"
// } 