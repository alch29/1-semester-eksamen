// Middleware til at beskytte routes der kræver login
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); // Bruger er logget ind, fortsæt
  }
  // Ikke logget ind - redirect til login
  res.redirect('/');
};

// Middleware til at tjekke om bruger er admin
exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.is_admin === true) {
    return next(); // Bruger er admin, fortsæt
  }
  // Ikke admin - redirect eller send fejl
  res.status(403).send('Access denied. Admin only.');
};

// Middleware til at forhindre loggede brugere i at tilgå login/register
exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return next(); // Ikke logget ind, fortsæt
  }
  // Allerede logget ind - redirect baseret på rolle
  if (req.session.user.is_admin) {
    res.redirect('/admin/admin');
  } else {
    res.redirect('/staff/stations');
  }
};