"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
    session_key: process.env.DEV_SESSION_KEY_SECRET,
    session_name: process.env.DEV_SESSION_NAME,
    session_db: process.env.DEV_SESSION_DB_NAME,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    username: process.env.DEV_DB_USERNAME || "vuong_dev",
    password: process.env.DEV_DB_PASSWORD || "vuong_dev2002",
  },
  mysql_db_1: {
    alias: process.env.MYSQL_DB_ALIAS_MASTER || "mydb",
    config: {
      host: process.env.MYSQL_DB_HOST_MASTER || "localhost",
      port: process.env.MYSQL_DB_PORT_MASTER || 3306,
      database: process.env.MYSQL_DB_ALIAS_MASTER || "mydb",
      user: process.env.MYSQL_DB_USERNAME_MASTER || "root",
      password: process.env.MYSQL_DB_PASSWORD_MASTER || "vuong",
      connectionLimit: 10,
      multipleStatements: true,
    },
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
    session_key: process.env.PRO_SESSION_KEY_SECRET,
    session_name: process.env.PRO_SESSION_NAME,
    session_db: process.env.PRO_SESSION_DB_NAME,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    username: process.env.PRO_DB_USERNAME || "vuong_dev",
    password: process.env.PRO_DB_PASSWORD || "vuong_dev2002",
  },
  mysql_db_1: {
    alias: process.env.MYSQL_DB_ALIAS_MASTER || "mydb",
    config: {
      host: process.env.MYSQL_DB_HOST_MASTER || "localhost",
      port: process.env.MYSQL_DB_PORT_MASTER || 3306,
      database: process.env.MYSQL_DB_ALIAS_MASTER || "mydb",
      user: process.env.MYSQL_DB_USERNAME_MASTER || "root",
      password: process.env.MYSQL_DB_PASSWORD_MASTER || "vuong",
      connectionLimit: 10,
      multipleStatements: true,
    },
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

console.log(`Running on Environment::${env} \n`, config[env]);
module.exports = config[env];
