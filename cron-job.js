const { image } = require('./models');
const { Op } = require('sequelize');

async function deleteOldImages() {
  try {
    const thirtyDaysAgo = 30 * 24 * 60 * 60 * 1000;
    const deletedCount = await image.destroy({
      where: {
        createdAt: {
          [Op.lt]: thirtyDaysAgo
        }
      }
    });

    console.log(`Deleted ${deletedCount} old images`);
  } catch (err) {
    console.error('Error deleting old images:', err);
  }
}

module.exports = deleteOldImages();