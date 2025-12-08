const { user, role } = require('../models');
const { hashPassword, comparePassword } = require('../bcrypt');

exports.index = (req, res) => {
  res.render("home/index", {
    title: 'Login',
  });
};

//____________________________________________________________________

//Opret ny bruger, som er staff og hash password i database:

//Oprettelsesformular:
exports.getRegister = (req, res) => {
  res.render("home/register", {
    title: 'Register',
    error: req.session.error || "Fejl med registrering, prøv igen."
  });
  delete req.session.error;
};

//Opret bruger og hash:
exports.postRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    

    //  Validering
    if (!email || !password || !name) {
      req.session.error = 'Alle felter skal udfyldes';
      return res.redirect('/register'); 
    }
    
    if (password.length < 6) {
      req.session.error = 'Password skal være mindst 6 tegn';
      return res.redirect('/register');
    }
    
    // Tjek om email allerede eksisterer
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      req.session.error = 'Email eksisterer allerede';
      return res.redirect('/register');
    }


    //find staff:
    const staffRole = await role.findOne({
      where: { is_admin: false }
    });
    
    if (!staffRole) {
      return res.status(500).send('Staff role not found in database');
    }
    
    const hashedPassword = await hashPassword(password);
    
    //Lav ny bruger med hashet password:
    const newUser = await user.create({
      email: email,
      password: hashedPassword,
      name: name,
      role_id: staffRole.id
    });

    // Log automatisk ind efter registrering (laver en session)
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      is_admin: false // Staff bruger
    };
    
    // console.log('User created successfully as staff');
    res.redirect('/'); //omdiriger til login-siden
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Registration failed');
  }
};

//____________________________________________________________________

//kode til login og samligning passwords:

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validering
    if (!email || !password) {
      req.session.error = 'Email og password skal udfyldes';
      return res.redirect('/'); // ÆNDRE SENEREE TIL RIGTIG VEIW
    }

    //finder bruger baseret på mail og inkluderer rolle fra role model
    const foundUser = await user.findOne({ 
      where: { email: email },
      include: [{
        model: role,
        attributes: ['is_admin']
      }]
    });
    
    if (!foundUser) {
      return res.render('home/index', {
        title: 'Login',
        error: 'Invalid email or password'
      });
    }
    
    //sammenlign passwords:
    const isMatch = await comparePassword(password, foundUser.password);
    
    if (isMatch) {

      // gem brugerdata i session
      req.session.user = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        is_admin: foundUser.role.is_admin
      };

      //Hvis kode er korrekt, tjekker om det er admin eller staff
      if (foundUser.role.is_admin === true) {
        console.log('Admin login successful!');
        res.redirect('/admin');
      } else {
        // console.log('Staff login successful!');
        res.redirect('/staff/stations');
      }
    } else {
      res.render('home/index', {
        title: 'Login',
        error: 'Invalid email or password'
      });
    }
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Login failed');
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
};