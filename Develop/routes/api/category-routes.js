const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: {model: Product},
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    //can also be findbyPk but then take out the where because that is the primary key
    const categoryData = await Category.findOne({
      where: {id: req.params.id},
      include: {model: Product},
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Category) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        CategoryTag.findAll({
          where: { category_id: req.params.id }
        }).then((categoryTags) => {
          // create filtered list of new tag_ids
          const categoryTagIds = categoryTags.map(({ tag_id }) => tag_id);
          const newCategoryTags = req.body.tagIds
            .filter((tag_id) => !categoryTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                category_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const categoryTagsToRemove = categoryTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            CategoryTag.destroy({ where: { id: categoryTagsToRemove } }),
            CategoryTag.bulkCreate(newCategoryTags),
          ]);
        });
      }

      return res.json(Category);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No catagory found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
