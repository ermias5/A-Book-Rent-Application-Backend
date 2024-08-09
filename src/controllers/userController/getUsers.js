import pool from "../../../db.js";

const getUsers = async (req, res) => {
  //   try {
  //     res.send("using api route");
  //   } catch (err) {
  //     console.log(err);
  //   }
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default getUsers;
