console.log('Running app.js')

const express = require('express');
const app = express();
const PORT = 3000;

// Location for static assets (js, img, css)
app.use(express.static('static'));

// Location for page templates ("views")
app.set('view engine', 'ejs')

// Root route
app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
