// controllers/staffController.js
const crypto = require('crypto');
const { station, product, measurement, image, task, task_product } = require('../models');

exports.getStaffStations = async (req, res) => {
  try {
    const stations = await station.findAll({ raw: true });

    res.render('staff/staff-stations', {
      title: 'Your stations',
      stations: stations,
    });
  } catch (err) {
    console.error('Database error in getStaffStations:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.getStaffTask = async (req, res) => {
  try {
    const stationId = parseInt(req.params.id);
    const currentStation = await station.findByPk(stationId, { raw: true });

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let date = new Date();
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    let currentDate = `${month} ${day}, ${year}`;

    if (!currentStation) {
      return res.status(404).render('error', {
        message: `Station med id ${stationId} blev ikke fundet`
      });
    }

    const products = await product.findAll({
      raw: true,
      //inkludere measurements tabellen, så den kan tage navnet fra products tabel og tage symbolet fra measurements tabel.
      include: [
        {
          model: measurement,
          as: 'measurement',
          attributes: ['measurement_symbol']
        }
      ]
    });

    res.render('staff/staff-task', {
      title: currentStation.name,
      station: currentStation,
      products: products,
      date: currentDate
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

exports.finishStaffTask = async (req, res) => {
  try {
    const user_id = 1;
    const { station_id, date, products } = req.body;

    //tjekker om filer er blevet uploadet:
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No images uploaded');
    }

    //bruger crypto pakke fra node.js til at generere et UUID til link_key:
    const linkKey = crypto.randomUUID();

    //opretter ny task:
    const newTask = await task.create({
      user_id: user_id,
      stations_id: station_id,
      completed_date: date,
      link_key: linkKey
    });

    console.log(`Task created with ID: ${newTask.id}`);

    //gemmer produkter til task_produkt, hvis amount som bruger har skrevet ind er mere end 0:
    if (products) {
      const productEntries = Object.entries(products);
      
      for (const [product_id, amount] of productEntries) {
        if (amount && parseInt(amount) > 0) {
          await task_product.create({
            task_id: newTask.id,
            product_id: parseInt(product_id),
            amount: parseInt(amount)
          });
        }
      }
      console.log('Products saved to task_product table');
    }

    //gemmer billeder i image tabellen:
    const savedImages = await Promise.all(
      req.files.map(file => 
        image.create({
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          data: file.buffer,
          user_id: user_id,
          task_id: newTask.id
        })
      )
    );

    console.log(`Saved ${savedImages.length} images to database`);

    //omdirigerer staff til staff-stations siden:
    res.redirect('/staff/stations');

  } catch (err) {
    console.error('Error saving task:', err);
    res.status(500).send('Error saving task');
  }
};

exports.getStaffHistory = async (req, res) => {
  try {
    const user_id = 1;

    const userTasks = await task.findAll({
      raw: true,
      where: { user_id: user_id },
      include: [
        {
          model: station,
          as: 'station',
          attributes: ['name', 'address']
        }
      ],
      order: [['completed_date', 'DESC']]
    });

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //formater datoen for hver task
    const formattedDate = userTasks.map(task => {
      const date = new Date(task.completed_date);
      const weekday = weekdays[date.getDay()];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      
      return {
        ...task,
        formattedDate: `${weekday}, ${month} ${day}, ${year}`
      };
    });

    res.render('staff/staff-history', {
      title: 'View history',
      tasks: formattedDate
  });

  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).send('Error loading history');
  };
};

exports.getStaffHistoryTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const currentTask = await task.findByPk(taskId, { 
    raw: true,
    include: [
      {
        model: station,
        as: 'station',
        attributes: ['name', 'address']
      },
      {
        model: task_product,
        as: 'taskProducts',
        include: [{
          model: product,
          as: 'product',
          attributes: ['name']
        }]
      },
      {
        model: image,
        as: 'images',
        attributes: ['id', 'filename']
      }
    ]
  });
  
  res.render('staff/staff-history-task', {
    title: currentTask.id,
    tasks: currentTask
  })
}