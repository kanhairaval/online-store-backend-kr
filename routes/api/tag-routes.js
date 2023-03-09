const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const shoppingTags = await Tag.findAll({
  // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(shoppingTags)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const shoppingTags = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
  include: [{ model: Product }],
    });

    if (!shoppingTags) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(shoppingTags)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const shoppingTags = await Tag.create(req.body);
    res.status(200).json(shoppingTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const shoppingTags = await Tag.update(req.body, {
      where: { id: req.params.id, }
    });
    res.status(200).json(shoppingTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const shoppingTags = await Tag.destroy({
      where: { id: req.params.id, }
    });
    res.status(200).json(shoppingTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

// {
//   "tag_name": "Video Games"
// }