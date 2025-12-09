const { station, product, measurement, image, task, task_product, user } = require('../models');

//Til public route hvor stationsejer kan se task details:
exports.viewTaskByLink = async (req, res) => {
    try {
      const linkKey = req.params.linkKey;
  
      //Find task baseret på UUID:
      const currentTask = await task.findOne({
        where: { link_key: linkKey },
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
              attributes: ['name'],
              include: [{
                model: measurement,
                as: 'measurement',
                attributes: ['measurement_symbol']
              }]
            }]
          },
          {
            model: image,
            as: 'images',
            attributes: ['id', 'filename', 'mimetype', 'data']
          }
        ]
      });
    
      const taskData = currentTask.get({ plain: true });
      //konvertere data til plain object, som skulle gøre det nemmere for handlebars at arbejde med relateret/nested data. i modsætning til når man bruger raw.
    
      if (taskData.images) {
        taskData.images = taskData.images.map(img => ({
          ...img,
          dataUrl: `data:${img.mimetype};base64,${img.data.toString('base64')}`
        }));
      }
      //base64 konverterer binær data til string, så dataen kan hentes og bruges over text-baseret systemer.
    
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
      //formater datoen for hver task
      const date = new Date(taskData.completed_date);
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
    
      const currentDate = `${day} ${month}, ${year}`;

      //Gør så at siden ikke bliver vist efter 24 timer:
      if (taskData.expires_at < new Date()) {
        return res.status(410).render('error', {
          message: 'Link has expired'
        });
      }
  
      //vis en version af task view (uden navigation til andre sider):
      res.render('public/task-details', {
        title: `Task ${currentTask.id}`,
        task: taskData,
        date: currentDate
      });
  
    } catch (err) {
      console.error('Error fetching task by link:', err);
      res.status(500).send('Error loading task');
    }
  };