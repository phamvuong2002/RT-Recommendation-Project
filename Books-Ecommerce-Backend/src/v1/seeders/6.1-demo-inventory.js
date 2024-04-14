'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventory', [
      {
        inven_book_id: 1,
        inven_supplierId: 1,
        inven_location: '',
        inven_stock: 100,
        inven_reservations: JSON.stringify([]),
        create_time: new Date(),
        update_time: new Date()
      },
      {
        inven_book_id: 2,
        inven_supplierId: 2,
        inven_location: '',
        inven_stock: 200,
        inven_reservations: JSON.stringify([]),
        create_time: new Date(),
        update_time: new Date()
      },
      {
        inven_book_id: 3,
        inven_supplierId: 3,
        inven_location: '',
        inven_stock: 200,
        inven_reservations: JSON.stringify([]),
        create_time: new Date(),
        update_time: new Date()
      },
      // Add more seed data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventory', null, {});
  }
};
