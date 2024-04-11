"use strict";

const databaseService = require("../dbs/init.mysql");
const {
  mysql_db_1,
  // name_database_02
} = require("../configs/config");

// Create connection pools for each database
try {
  databaseService.createPool(mysql_db_1.alias, mysql_db_1.config);
  
} catch (error) {
  console.error(
    `Failed to create connection pool for ${mysql_db_1.alias}:`,
    error
  );
}

// try {
//     databaseService.createPool(name_database_02.alias, name_database_02.config);
// } catch (error) {
//     console.error(`Failed to create connection pool for ${name_database_02.alias}:`, error);
// }

// Access the connection pools in another module
const bookDB_master = databaseService.getPool(mysql_db_1.alias);
// const db02 = databaseService.getPool(name_database_02.alias);

module.exports = {
    bookDB_master,
    // db02
}