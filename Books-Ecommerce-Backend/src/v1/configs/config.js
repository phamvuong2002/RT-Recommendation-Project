"use strict";

const development = {
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
  payment: {
    paypal_data: {
      clientId: process.env.DEV_PAYMENT_PAYPAL_CLIENT_ID,
      clientSecret: process.env.DEV_PAYMENT_PAYPAL_CLIENT_SECRET,
    },
    vnpay_data: {
      clientId: process.env.DEV_PAYMENT_VNPAY_CLIENT_ID,
      clientSecret: process.env.DEV_PAYMENT_VNPAY_CLIENT_SECRET,
      apiHost: process.env.DEV_PAYMENT_VNPAY_API_HOST,
    },
  },
};

const production = {
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
  payment: {
    paypal: {
      clientId: process.env.PRO_PAYMENT_PAYPAL_CLIENT_ID,
      clientSecret: process.env.PRO_PAYMENT_PAYPAL_CLIENT_SECRET,
    },
    vnpay: {
      clientId: process.env.PRO_PAYMENT_VNPAY_CLIENT_ID,
      clientSecret: process.env.PRO_PAYMENT_VNPAY_CLIENT_SECRET,
      apiHost: process.env.PRO_PAYMENT_VNPAY_API_HOST,
    },
  },
};

const config = { development, production };
const env = process.env.NODE_ENV || "dev";

console.log(`Running on Environment::${env} \n`, config[env]);
module.exports = config[env];
