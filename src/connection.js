const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

mongoose.connect(`${MONGODB_CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))
