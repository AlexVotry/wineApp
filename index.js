const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// const apiRoutes = require('./routes/apiRoutes');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

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
