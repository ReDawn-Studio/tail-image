import mysql from "mysql2/promise";

const connectDatabase = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  return connection;
};

const executeSql = async (sql: string, valueList: Array<any>) => {
  const connection = await connectDatabase()
  try {
    const [results] = await connection.execute(sql, valueList);
    connection.end();
    return results;
  } catch (error) {
    throw error;
  }
};

export default executeSql;