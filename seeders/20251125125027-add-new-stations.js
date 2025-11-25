'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stations', [
      {
        name: 'Shell Station',
        address: 'Broadway 5, 2000 City',
        email: 'shell@station.com',
        phone: '22233344',
        user_id: 2,
        cleaning_of_forecourt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Statoil',
        address: 'Highway 10, 3000 City',
        email: 'statoil@station.com',
        phone: '55566677',
        user_id: 3,
        cleaning_of_forecourt: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Esso',
        address: 'Maple Street 12, 1100 City',
        email: 'esso@station.com',
        phone: '11122233',
        user_id: 2,
        cleaning_of_forecourt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BP',
        address: 'Oak Avenue 7, 1200 City',
        email: 'bp@station.com',
        phone: '44455566',
        user_id: 3,
        cleaning_of_forecourt: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Circle K Downtown',
        address: 'Center St 9, 1300 City',
        email: 'circlekd@station.com',
        phone: '77788899',
        user_id: 2,
        cleaning_of_forecourt: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '7-Eleven Uptown',
        address: 'North St 15, 1400 City',
        email: '7eleven@station.com',
        phone: '12131415',
        user_id: 3,
        cleaning_of_forecourt: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Q8',
        address: 'South Road 22, 1500 City',
        email: 'q8@station.com',
        phone: '16171819',
        user_id: 2,
        cleaning_of_forecourt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Texaco',
        address: 'West Lane 30, 1600 City',
        email: 'texaco@station.com',
        phone: '20212223',
        user_id: 3,
        cleaning_of_forecourt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stations', {
      name: [
        'Shell Station', 'Statoil', 'Esso', 'BP',
        'Circle K Downtown', '7-Eleven Uptown', 'Q8', 'Texaco'
      ]
    });
  }
};
