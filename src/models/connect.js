import { createConnection } from "mysql2/promise";
export const connection = async () => {
    try {
      const mysqlConnection= createConnection({
        host: process.env.NEXT_PUBLIC_MYSQL_HOST,
        port: process.env.NEXT_PUBLIC_MYSQL_PORT,
        user: process.env.NEXT_PUBLIC_MYSQL_USER,
        password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
      });
      console.log("db connected");
      return mysqlConnection;
    } catch (error) {
      console.log(error);
    }
  };
