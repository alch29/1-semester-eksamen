// const { image } = require('./models');
// const { Op } = require('sequelize');
// const fs = require('fs');
// const path = require('path');


// const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
// const imageDir = path.join(__dirname, 'public/uploads'); // mappe med billeder
// //Tjekker om billeder er mere end 30 dage gamle og sletter dem:

// function deleteOldImagesFromDisk() {
//   const now = Date.now();

//   fs.readdir(imageDir, (err, files) => {
//     if (err) {
//       console.error('Fejl ved læsning af mappe:', err);
//       return;
//     }

//     files.forEach(file => {
//       const filePath = path.join(imageDir, file);

//       fs.stat(filePath, (err, stats) => {
//         if (err) return;

//         const age = now - stats.mtimeMs;

//         if (age > thirtyDaysAgo) {
//           fs.unlink(filePath, err => {
//             if (!err) {
//               console.log('Slettet:', file);
//             }
//           });
//         }
//       });
//     });
//   });
// }

// async function deleteOldImagesFromDatabase() {
//   try {

//     const deletedCount = await image.destroy({
//       where: {
//         createdAt: {
//           [Op.lt]: thirtyDaysAgo
//         }
//       }
//     });

//     console.log(`Deleted ${deletedCount} old images`);
//   } catch (err) {
//     console.error('Error deleting old images:', err);
//   }
// }

// module.exports = deleteOldImages;