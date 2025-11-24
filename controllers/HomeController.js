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
  });
};

//Opret bruger og hash:
exports.postRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    //find staff:
    const role = await role.findOne({
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
      role_id: role.id
    });
    
    console.log('User created successfully as staff');
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
      //Hvis kode er korrekt, tjekker om det er admin eller staff
      if (foundUser.role.is_admin === true) {
        console.log('Admin login successful!');
        res.redirect('/admin/admin');
      } else {
        console.log('Staff login successful!');
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