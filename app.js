const express = require('express')
const cors = require('cors')
const app = express()


// USE JSON AND URLENCODED TO APP
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONNECT TO MONGOODB
const db = require('./app/models/')
db.mongoose.
    connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Database Connected!`);
    }).catch((err) => {
        console.log(`Cannot connect to the database`, err);
        process.exit()
    });

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to express"
    })
})

// REGISTER ROUTE ENDPOINT
require('./app/routes/post.route')(app)


//PORT SERVER RUNNING
const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})
