const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const thirtyDays = 30 * 24 * 60 * 60 * 1000;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// const apiRoutes = require('./routes/apiRoutes');

app.use(bodyParser.json());
app.use(
  cookieSession({
    MaxAge: thirtyDays,
    keys: [keys.cookieKey]
  })
);
// create global req.user.
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
