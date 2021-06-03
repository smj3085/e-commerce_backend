const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll( {
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Product, through: ProductTag }]
    });

    if (!data) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(
      {
        id: req.body.id,
        tag_name: req.body.tag_name,
      })

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  } 
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
    },
    {
      where: { id: req.params.id },
    });
    if (!updatedTag) {
      res.status(404).json({ message: "No tag found at that Id!" });
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No tag found at that Id!" });
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
