const { user, role, QuestionBank, SecurityQuestion } = require('../models');
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
    error: req.session.error || null,
  });
  delete req.session.error;
};

//Opret bruger og hash:
exports.postRegister = async (req, res) => {
  try {
    const { email, password, name, question_id, question_answer } = req.body;
    
    // Validering
    if (!email || !password || !name) {
      req.session.error = 'All fields are required';
      return res.redirect('/register'); 
    }

    // Validate security question
    if (!question_id || !question_answer) {
      req.session.error = 'Please select and answer a security question';
      return res.redirect('/register');
    }

    if (password.length < 8) {
      req.session.error = 'Password has to be minimum 8 characters long';
      return res.redirect('/register');
    }
    
    // Tjek om email allerede eksisterer
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      req.session.error = 'Email already in use';
      return res.redirect('/register');
    }

    // Find staff role
    const staffRole = await role.findOne({
      where: { is_admin: false }
    });
    
    if (!staffRole) {
      return res.status(500).send('Staff role not found in database');
    }
    
    const hashedPassword = await hashPassword(password);
    
    // Create new user
    const newUser = await user.create({
      email: email,
      password: hashedPassword,
      name: name,
      role_id: staffRole.id
    });

    // Save security question
    const answerHash = await hashPassword(question_answer.toLowerCase().trim());
    
    await SecurityQuestion.create({
      user_id: newUser.id,
      question_id: question_id,
      answer_hash: answerHash
    });

    // Log in automatically after registration
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      is_admin: false
    };
    
    res.redirect('/');
    
  } catch (err) {
    console.error('Registration error:', err);
    req.session.error = 'Registration failed. Please try again.';
    res.redirect('/register');
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









// DENNIS FORBERINGER 
exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuestionBank.findAll({
      attributes: ['id', 'question_text']
    });
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// ===== FORGOT PASSWORD FUNCTIONS =====

// Show forgot password form
exports.getForgotPassword = (req, res) => {
  res.render('home/forgot-password', {
    title: 'Forgot Password',
    error: req.session.error || null
  });
  delete req.session.error;
};

// Verify user and show security question + password reset form
exports.postVerifyUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      req.session.error = 'Email is required';
      return res.redirect('/forgot-password');
    }

    const foundUser = await user.findOne({ where: { email } });
    
    if (!foundUser) {
      req.session.error = 'If this email exists, the security question will be displayed';
      return res.redirect('/forgot-password');
    }

    const securityQuestion = await SecurityQuestion.findOne({
      where: { user_id: foundUser.id },
      include: [{
        model: QuestionBank,
        as: 'question',
        attributes: ['id', 'question_text']
      }]
    });

    if (!securityQuestion) {
      req.session.error = 'No security question found for this account';
      return res.redirect('/forgot-password');
    }

    req.session.resetEmail = email;

    res.render('home/verify-and-reset', {
      title: 'Reset Password',
      email: email,
      question: securityQuestion.question.get({ plain: true }),  // <-- ADD .get({ plain: true })
      error: req.session.error || null
    });
    delete req.session.error;

  } catch (err) {
    console.error('Verify user error:', err);
    req.session.error = 'An error occurred. Please try again.';
    res.redirect('/forgot-password');
  }
};

// Verify answer and reset password
exports.postResetPassword = async (req, res) => {
  try {
    const { email, question_id, answer, newPassword, confirmPassword } = req.body;

    // Validate session
    if (req.session.resetEmail !== email) {
      req.session.error = 'Session expired. Please start over.';
      return res.redirect('/forgot-password');
    }

    // Find user first (we'll need it multiple times)
    const foundUser = await user.findOne({ where: { email } });
    
    if (!foundUser) {
      req.session.error = 'Invalid request';
      return res.redirect('/forgot-password');
    }

    // Get security question for re-rendering on errors
    const securityQuestion = await SecurityQuestion.findOne({
      where: { user_id: foundUser.id, question_id: question_id },
      include: [{ model: QuestionBank, as: 'question' }]
    });

    // Password validation
    if (newPassword !== confirmPassword) {
      req.session.error = 'Passwords do not match';
      return res.render('home/verify-and-reset', {
        title: 'Reset Password',
        email: email,
        question: securityQuestion.question.get({ plain: true }),
        error: req.session.error
      });
    }

    if (newPassword.length < 8) {
      req.session.error = 'Password must be at least 8 characters long';
      return res.render('home/verify-and-reset', {
        title: 'Reset Password',
        email: email,
        question: securityQuestion.question.get({ plain: true }),
        error: req.session.error
      });
    }

    // Verify security answer
    const isMatch = await comparePassword(
      answer.toLowerCase().trim(),
      securityQuestion.answer_hash
    );

    if (!isMatch) {
      req.session.error = 'Incorrect answer to security question';
      return res.render('home/verify-and-reset', {
        title: 'Reset Password',
        email: email,
        question: securityQuestion.question.get({ plain: true }),
        error: req.session.error
      });
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    foundUser.password = hashedPassword;
    await foundUser.save();

    // Clear session
    delete req.session.resetEmail;

    req.session.success = 'Password reset successfully! Please login.';
    res.redirect('/');

  } catch (err) {
    console.error('Reset password error:', err);
    req.session.error = 'An error occurred. Please try again.';
    res.redirect('/forgot-password');
  }
};