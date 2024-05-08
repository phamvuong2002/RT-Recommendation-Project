"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("discount", [
      {
        discount_supplierId: 1,
        discount_name: "Discount 1",
        discount_des: "Description for Discount 1",
        discount_type: "fixed_amount",
        discount_value: 10000,
        discount_code: "A123456",
        discount_start_date: new Date(),
        discount_end_date: new Date("2024-04-30"),
        discount_max_uses: 100,
        discount_max_uses_per_user: 1,
        discount_min_order_value: 0,
        discount_is_active: true,
        discount_apply_to: "all",
        discount_product_ids: JSON.stringify([]),
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        discount_supplierId: 2,
        discount_name: "Discount 2",
        discount_des: "Description for Discount 2",
        discount_type: "percentage",
        discount_value: 10,
        discount_code: "GOC-1234",
        discount_start_date: new Date(),
        discount_end_date: new Date("2024-04-30"),
        discount_max_uses: 50,
        discount_max_uses_per_user: 1,
        discount_min_order_value: 20000,
        discount_is_active: true,
        discount_apply_to: "specific",
        discount_product_ids: JSON.stringify([2]),
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        discount_supplierId: 1,
        discount_name: "Discount 3",
        discount_des: "Description for Discount 3",
        discount_type: "fixed_amount",
        discount_value: 150000,
        discount_code: "ABC-1234",
        discount_start_date: new Date(),
        discount_end_date: new Date("2024-04-30"),
        discount_max_uses: 4,
        discount_max_uses_per_user: 1,
        discount_min_order_value: 200000,
        discount_is_active: true,
        discount_apply_to: "specific",
        discount_product_ids: JSON.stringify([2]),
        create_time: new Date(),
        update_time: new Date(),
      },
      // Add more seed data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("discount", null, {});
  },
};
