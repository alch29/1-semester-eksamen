const app = require("./app");
const { engine } = require("express-handlebars");
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    layoutsDir: "./views/layouts",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views/");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Login",
  });
});

//Staff routes:

app.get("/staff/stations", (req, res) => {
  res.render("staff/staff-stations", {
    title: "Your stations",
  });
});

app.get("/staff/task", (req, res) => {
  res.render("staff/staff-task", {
    title: "Task",
  });
});

app.get("/staff/history", (req, res) => {
  res.render("staff/staff-history", {
    title: "History",
  });
});

//Admin routes:

app.get("/admin", (req, res) => {
  res.render("admin/admin", {
    title: "Menu",
  });
});

//Her starter admin products:

app.get("/admin/products", (req, res) => {
  res.render("admin/products/admin-products", {
    title: "Products",
  });
});

//Her starter admin stations:

app.get("/admin/stations", (req, res) => {
  res.render("admin/stations/admin-stations", {
    title: "Stations",
  });
});

app.get("/admin/stations/info", (req, res) => {
  res.render("admin/stations/admin-station-info", {
    title: "Station info",
  });
});

app.get("/admin/stations/manage", (req, res) => {
  res.render("admin/stations/admin-station-manage", {
    title: "Manage",
  });
});

//Her starter admin staff:

app.get("/admin/staff", (req, res) => {
  res.render("admin/staff/admin-staff", {
    title: "Staff",
  });
});

app.get("/admin/add-staff", (req, res) => {
  res.render("admin/staff/admin-add-staff", {
    title: "Add new staff",
    inputFirstName: "First Name",
    inputLastName: "Last Name",
    inputEmail: "JohnDoe@Example.com",
    addToButton: "+ Add to stations",
    saveButton: "Save Changes",
  });
});

app.get("/admin/add-staff/stations", (req, res) => {
  res.render("admin/staff/admin-add-staff-stations", {
    title: "Add new staff to stations",
  });
});

app.get("/admin/staff-info", (req, res) => {
  res.render("admin/staff/admin-staff-info", {
    title: "Staff info",
    inputFirstName: "First Name",
    inputLastName: "Last Name",
    inputEmail: "JohnDoe@Example.com",
    manageButton: "Manage Stations",
    saveButton: "Save Changes",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
