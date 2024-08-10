import mysql from "mysql2/promise";

const connectDatabase = async () => {
 //  console.log( process.env.DB_HOST,process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD);
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
  const connection = await connectDatabase();
  // console.log('链接数据库', connection,process.env.DB_HOST);
  try {
    const [results] = await connection.execute(sql, valueList);
    connection.end();
    return results;
  } catch (error) {
    throw error;
  }
};

export default executeSql;
