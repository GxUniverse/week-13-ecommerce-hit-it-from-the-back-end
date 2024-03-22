const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll ({
      include: [{model: Product, as: "tag_id"}, {model: ProductTag}],
    });
  res.status(200).json(tagData);
} catch (err) {
  console.log(err)
  res.status(500).json(err);
}
// be sure to include its associated Products
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findbyPk(req.params.id, {
      include: [{model: Product}, {model: ProductTag}],
    })
    res.status(200).json(tagData);
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
  // update tag data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        TagTag.findAll({
          where: { product_id: req.params.id }
        }).then((tag_id) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const TagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            Tag.destroy({ where: { id: productTagsToRemove } }),
            Tag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(tag);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
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
