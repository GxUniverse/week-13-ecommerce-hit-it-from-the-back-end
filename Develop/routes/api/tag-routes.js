const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findall ({
      include: [{model: Product}, {model: ProductTag}],
    });
  res.status(200).json(locationData);
} catch (err) {
  res.status(500).json(err);
}
// be sure to include its associated Products
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const locationData = await Tag.findbyPk(req.params.id, {
      include: [{model: Product}, {model: ProductTag}],
    })
    res.status(200).json(driverData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create({
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
  // delete on tag by its `id` value

if (!TagData) {
  res.status(404).json({ message: 'No Product Found With That ID!' });
  return;
}
res.status(200).json(productData);
} catch (err) {
res.status(500).json(err);
}
});

module.exports = router;
