const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "taskmanagerdb",
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/users", (req, res) => {
   const query = "SELECT * FROM users;";

   const values = [req.body.email];

   db.query(query, [values], (err, result) => {
      if (err) throw err;
      return res.json(result);
   });
});

app.post("/login", (req, res) => {
   const query = "SELECT * FROM users WHERE email = ? AND password = ?;";

   const values = [req.body.email, req.body.password];

   db.query(query, values, (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
         const userData = {
            userId: result[0].user_id,
            email: result[0].email,
            username: result[0].username,
         };

         res.cookie("userData", userData, { maxAge: 90000, httpOnly: true });
         return res.json(userData);
      } else {
         return res.status(401).json({ message: "Wrong credentials" });
      }
   });
});

app.post("/register", (req, res) => {
   const query = "INSERT INTO users (email, password, username) VALUES (?);";

   const { email, password, username } = req.body;

   if (email === "" || password === "" || username === "") {
      return res.status(400).json({ message: "Fields cannot be empty" });
   } else {
      const values = [email, password, username];
   
      db.query(query, [values], (err, data) => {
         if (err) {
            res.send(err);
         } else {
            res.send({ message: "User registered!" });
         }
      });
   }
});

app.get("/tasks", (req, res) => {
   const query = "SELECT * FROM tasks";

   const values = [req.body.title, req.body.description];

   db.query(query, [values], (err, result) => {
      if (err) throw err;
      return res.json(result);
   });
});

app.post("/tasks", (req, res) => {
   const userId = req.body.userId;

   if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
   }

   const query =
      "INSERT INTO tasks (`title`, `description`, `priority`, `status`, `users_user_id`) VALUES (?)";

   const values = [
      req.body.title,
      req.body.description,
      req.body.priority,
      req.body.status,
      userId,
   ];

   db.query(query, [values], (err, result) => {
      if (err) return res.json(err);

      const insertedTaskId = result.insertId;

      return res.json({
         message: "Task has been created successfully.",
         taskId: insertedTaskId,
      });
   });
});

app.post("/taskdata", (req, res) => {
   const userId = req.body.userId;
   const query = "SELECT * FROM tasks WHERE users_user_id = ?;";

   db.query(query, [userId], (err, result) => {
      if (err) {
         console.error("Error executing SQL query:", err);
         return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length > 0) {
         console.log("Task data sent to client:", result);
         return res.json(result);
      } else {
         return res.status(401).json({ message: "Wrong credentials" });
      }
   });
});

app.post("/roles", (req, res) => {
   const userId = req.body.userId;
   const query =
      "SELECT name FROM roles INNER JOIN users_role ON roles.role_id = users_role.roles_role_id WHERE users_role.users_user_id = ?;";

   db.query(query, [userId], (err, result) => {
      if (err) {
         console.error("Error executing SQL query:", err);
         return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length > 0) {
         const role = result[0].name;
         console.log("User role sent to client:", role);
         return res.json(role);
      } else {
         return res.status(404).json({ message: "User not found" });
      }
   });
});

app.delete("/delete/:id", (req, res) => {
   const query = "DELETE FROM tasks WHERE task_id = ?";
   const id = req.params.id;

   db.query(query, [id], (err, result) => {
      if (err) return res.json(err);
      console.log("Task has been deleted");
      return res.json(result);
   });
});

app.put("/update/:id", (req, res) => {
   const query =
      "UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE task_id = ?";
   const id = req.params.id;

   const values = [
      req.body.title,
      req.body.description,
      req.body.priority,
      req.body.status,
   ];

   db.query(query, [...values, id], (err, result) => {
      if (err) return res.json(err);
      console.log("Updated");
      return res.json(result);
   });
});

app.listen(3001, () => {
   console.log("connected to backend");
});
