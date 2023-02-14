const { readFileSync } = require("fs");
const path = require("path");
const { connection, query } = require("./db");

const checkUsername = async (req, res) => {
  const username = req.params.username;
  const Q = "SELECT * FROM Customers WHERE username = ?";
  const [rows] = await query(Q, [username]);
  if (rows.length > 0) {
    res.status(200).send({ available: false });
  } else {
    res.status(200).send({ available: true });
  }
};

const registration = (req, res) => {
  //validate body exists
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }
  //pull data from body to JSON
  const newCustomer = {
    username: req.body.regUserName,
    password: req.body.regPassword,
    firstName: req.body.regFirstName,
    lastName: req.body.regLastName,
    birthday: req.body.regBirthdate,
    email: req.body.regEmail,
    phone: req.body.regPhone,
    gender: req.body.regGender,
  };
  const Q1 =
    "INSERT INTO customers (username,password,firstName,lastName,birthday,phone,email,gender,joinDate) VALUES (?, ?, ?,?,?, ?,?,?,? )";
  connection.query(
    Q1,
    [
      newCustomer.username,
      newCustomer.password,
      newCustomer.firstName,
      newCustomer.lastName,
      new Date(newCustomer.birthday)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      newCustomer.phone,
      newCustomer.email,
      newCustomer.gender,
      new Date().toISOString().slice(0, 19).replace("T", " "),
    ],
    (err, mysqlres) => {
      if (err) {
        console.log("error", err);
        res.status(400).send({ message: "error in creating" + err });
        return;
      }
      console.log("new customer created");
      const newMeasure = {
        username: req.body.regUserName,
        height: req.body.regHeight,
        weight: req.body.regWeight,
      };
      //run query

      const Q2 =
        "INSERT INTO measures(measureDate, username, weight, height, waist, arms, chest) VALUES (?,?,?,?,?,?,?)";

      connection.query(
        Q2,
        [
          new Date().toISOString().slice(0, 19).replace("T", " "),
          newMeasure.username,
          newMeasure.weight,
          newMeasure.height,
          0,
          0,
          0,
        ],
        (err, mysqlres) => {
          if (err) {
            console.log("error", err);
            res.status(400).send({ message: "error in creating" + err });
            return;
          }

          const Q3 = "SELECT * FROM Customers WHERE username=?";
          connection.query(Q3, [newMeasure.username], (err, user) => {
            if (err) {
              console.log("error", err);
              return;
            }
            req.session.user = user[0];

            return res.redirect("/plans?message=successful-registration");
          });
        }
      );
    }
  );
};

const login = (req, res) => {
  //validate body exists
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }
  const { username, password, from } = req.body;
  //run query
  const Q1 = "SELECT * FROM Customers WHERE username=? AND password=?";
  connection.query(Q1, [username, password], (err, user) => {
    if (err) {
      console.log("error", err);
      res.status(400).send({ message: "error in creating" + err });
      return;
    }
    if (user.length) {
      req.session.user = user[0];
      // login succesfull
      if (from === "profile") {
        res.redirect("/profile");
      } else if (from === "calculator") {
        res.redirect("/calculators");
      } else if (from === "progress") {
        res.redirect("/progress");
      } else if (from === "plans") {
        res.redirect("/plans");
      } else {
        res.redirect("/home");
      }
    } else {
      res.redirect("/login?incorrect=true");
    }
  });
};

const getUserMeasurements = async (username) => {
  const q = "SELECT * FROM measures WHERE userName=?;";
  const [result] = await query(q, [username]);
  return result;
};

const addMeasure = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { username, weight, height, waist, chest, arms } = req.body;
    const values = [getToday(), username, weight, height, waist, chest, arms];
    const q = `INSERT INTO measures ${columns.measures} VALUES (${values
      .map(() => "?")
      .join(",")});`;
    await query(q, values);
    res.status(200).send({ message: "success" });
  } catch (e) {
    console.log(e.message);
    if (e.message.includes("Duplicate entry")) {
      return res.send({ message: "Only 1 measurement per user, per day" });
    }
    return res.status(500).send({ message: "error" });
  }
};

const deleteMeasure = async (req, res) => {
  const username = req.session.user?.username;
  if (!username) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const q = `DELETE FROM measures
    where username = ? 
    ORDER BY measureDate 
    DESC LIMIT 1`;
    await query(q, username);
    res.json({ message: "נמחק בהצלחה" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "שגיאה במחיקה" });
  }
};

const getMeasurementsByQuery = async (req, res) => {
  const username = req.session.user?.username;
  if (!username) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const parameters = req.body;
  console.log("parameters", parameters);

  const q = `SELECT * FROM measures WHERE username=? AND measureDate > ? AND measureDate < ?;`;
  const [result] = await query(q, [
    username,
    parameters.fromDate,
    parameters.toDate,
  ]);

  console.log(result);
  res.json(result);
};

const getProfilePage = async (req, res) => {
  if (!req.session?.user) {
    return res.redirect("/login?from=profile");
  }
  const measurements = await getUserMeasurements(req.session.user.username);
  res.render(path.join(__dirname, "views/profile.html"), {
    user: JSON.stringify(req.session?.user || null),
    measurements: JSON.stringify(measurements),
  });
};

const getProgressPage = async (req, res) => {
  if (!req.session?.user) {
    return res.redirect("/login?from=progress");
  }
  const measurements = await getUserMeasurements(req.session.user.username);
  res.render(path.join(__dirname, "views/progress.html"), {
    user: JSON.stringify(req.session?.user || null),
    measurements: JSON.stringify(measurements),
  });
};
const getCalculatorPage = async (req, res) => {
  if (!req.session?.user) {
    return res.redirect("/login?from=calculator");
  }

  const measurements = await getUserMeasurements(req.session.user.username);
  res.render(path.join(__dirname, "views/calculators.html"), {
    user: JSON.stringify(req.session?.user || null),
    measurements: JSON.stringify(measurements),
  });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, birthday, phone, email, gender, username } =
    req.body;
  console.log(req.body);
  const q =
    "UPDATE customers SET firstName=?, lastName=?, birthday=?, phone=?, email=?, gender=? WHERE username = ? ";
  const [result] = await query(q, [
    firstName,
    lastName,
    birthday,
    phone,
    email,
    gender,
    username,
  ]);
  req.session.user = { ...req.session.user, ...req.body };

  res.json({ message: "Updated successfully" });
};

const choosePlan = async (req, res) => {
  const username = req.session.user?.username;
  if (!username) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  console.log(username);
  console.log(req.body);

  const q = "SELECT * from packages WHERE packageID=?";
  const [[packageData]] = await query(q, [req.body.packageID]);
  console.log("packageData", packageData);

  const payment = {
    paymentMethod: req.body.paymentMethod,
    packageID: req.body.packageID,
    customer: username,
    payDate: getToday(),
    discount: req.body.discount,
    totalPrice: packageData.price * (1 - req.body.discount),
  };

  const Q2 = `INSERT INTO payments (customer, packageID, payDate, discount, totalPrice, paymentMethod) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  await query(Q2, [
    payment.customer,
    payment.packageID,
    payment.payDate,
    payment.discount,
    payment.totalPrice,
    payment.paymentMethod,
  ]);

  res.json({ message: "Payment successful" });
};

const columns = {
  customers:
    "(username, password, firstName, lastName, birthday, phone, email, gender, joinDate)",
  measures: "(measureDate, username, weight, height, waist, chest, arms)",
  packages: "(packageID,  packageName,  price)",
  payments:
    "(customer, packageID, payDate, discount, totalPrice, paymentMethod)",
  contact_forms: "(email, name, phone, topic, content)",
};

//DROPS IF EXISTS AND CREATES DB
const createDb = async (req, res) => {
  const queries = readFileSync("./SQL_SCRIPT.txt", "utf8")
    .replace(/\r?\n/g, "")
    .split(";");
  for (const q of queries) {
    const trimmed = q.trim();
    if (!trimmed) continue;
    try {
      await query(q);
    } catch (err) {
      console.log(q);
      console.log(err);
    }
  }
  console.log("DB created");
  res.send("Created tables successfully");
};
// ALL QUERIES FOR CREATING TABLES
const createQuery = {
  customers: `CREATE TABLE \`customers\` (
      \`username\` varchar(50) NOT NULL,
      \`password\` varchar(50) NOT NULL,
      \`firstName\` varchar(20) NOT NULL,
      \`lastName\` varchar(20) NOT NULL,
      \`birthday\` datetime NOT NULL,
      \`phone\` varchar(16) NOT NULL,
      \`email\` varchar(50) NOT NULL,
      \`gender\` varchar(10) NOT NULL,
      \`joinDate\` datetime NOT NULL,
      PRIMARY KEY (\`username\`)
    );`,
  measures: `CREATE TABLE \`measures\` (
    \`measureDate\` datetime NOT NULL,
    \`username\` varchar(40) NOT NULL,
    \`weight\` double DEFAULT NULL,
    \`height\` double DEFAULT NULL,
    \`waist\` double DEFAULT NULL,
    \`chest\` double DEFAULT NULL,
    \`arms\` double DEFAULT NULL,
    PRIMARY KEY (\`measureDate\`,\`username\`),
    KEY \`FK_CUSTOMER2\` (\`userName\`)
    FOREIGN KEY (\`username\`)
    REFERENCES \`web\`.\`customers\` (\`username\`)
  );
  `,
  packages: `CREATE TABLE \`packages\` (
    \`packageID\` int NOT NULL,
    \`packageName\` varchar(50) NOT NULL,
    \`price\` double NOT NULL,
    PRIMARY KEY (\`packageID\`)
  );`,
  payments: `CREATE TABLE \`payments\` (
      \`customer\` varchar(50) NOT NULL,
      \`packageID\` int NOT NULL,
      \`payDate\` datetime NOT NULL,
      \`discount\` double NOT NULL,
      \`totalPrice\` double NOT NULL,
      \`paymentMethod\` varchar(50) NOT NULL,
      PRIMARY KEY (\`customer\`,\`packageID\`,\`payDate\`),
      KEY \`FK_package\` (\`packageID\`),
      CONSTRAINT \`FK_customer1\` FOREIGN KEY (\`customer\`) REFERENCES \`customers\` (\`username\`),
      CONSTRAINT \`FK_package\` FOREIGN KEY (\`packageID\`) REFERENCES \`packages\` (\`packageID\`)
    ) ;`,
  contact_forms: `CREATE TABLE \`contact_forms\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`email\` VARCHAR(2000) NULL,
    \`name\` VARCHAR(2000) NULL,
    \`phone\` VARCHAR(2000) NULL,
    \`topic\` VARCHAR(2000) NULL,
    \`content\` VARCHAR(2000) NULL,
    PRIMARY KEY (\`id\`));`,
};

//drops all tables
const dropAll = async (req, res) => {
  try {
    const q1 = `DROP TABLE IF EXISTS \`measures\`,\`packages\`,\`payments\`,\`customers\`, \`contact_forms\` `;
    await query(q1);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Error: ${err.message}`);
    return;
  }
  console.log("Tables dropped.");
  res.send(`All tables have been dropped if existed :)`);
};
//function for view, select, create, delete,
const handleTable = async (req, res) => {
  const { tableName, action } = req.params;
  const availableTables = Object.keys(columns);
  if (!availableTables.includes(tableName)) {
    res.status(404).send({
      message: "No such table. Available tables: " + availableTables.join(", "),
    });
    return;
  }
  try {
    if (action === "view") {
      const q = `SELECT * FROM ${tableName}`;
      const [data] = await query(q);
      console.log(data);
      res.render(path.join(__dirname, "views/view-table.ejs"), { data });
      return;
    }

    if (action === "add") {
      const tableRows = readFileSync(
        path.join(__dirname, "table-data", `${tableName}.csv`),
        "utf8"
      ).split(/\r?\n/);

      for (const row of tableRows) {
        const tableData = row.split(",").map((x) => x.trim());
        const values = new Array(tableData.length).fill("?").join(", ");
        const q = `INSERT INTO ${tableName} ${columns[tableName]} VALUES (${values});`;
        await query(q, [...tableData]);
      }
      res.send(`Added to table ${tableName} successfully`);
    } else if (action === "delete") {
      const q = `DELETE FROM ${tableName} `;
      await query(q, [req.body.value]);
      res.send(`Deleted table ${tableName} successfully`);
    } else if (action === "drop") {
      const q = `DROP TABLE ${tableName}`;
      await query(q);
      res.send(`Dropped table ${tableName} successfully`);
    } else if (action === "create") {
      const q = createQuery[tableName];
      await query(q);
      res.send(`Created table ${tableName} successfully`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(`Error: ${err.message}
    <br><br><br>
    \nif you got "Duplicate entry" make sure to delete the table first.
    \nif you got "foreign key" error make sure to drop the refrenced table first.
    `);
  }
};

async function contact(req, res) {
  console.log(req.body);
  const q = `INSERT INTO contact_forms (name, email, content, topic, phone) VALUES (?, ?, ?, ?, ?)`;
  await query(q, [
    req.body.name,
    req.body.email,
    req.body.content,
    req.body.topic,
    req.body.phone,
  ]);
  res.redirect("/contact?success=true");
}
function getToday() {
  return new Date().toISOString().slice(0, 10).replace("T", " ");
}

module.exports = {
  registration,
  choosePlan,
  addMeasure,
  deleteMeasure,
  login,
  checkUsername,
  getUserMeasurements,
  getProfilePage,
  updateUser,
  getProgressPage,
  getCalculatorPage,
  getMeasurementsByQuery,
  handleTable,
  contact,
  createDb,
  dropAll,
};
