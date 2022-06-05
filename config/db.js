const mongoose = require("mongoose")


const connectDB = () => {
	try {
		mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log("connected to db")
	} catch (error) {
		// handleError(error)
        console.log(error)
        // add functionality to write logs in a file
	}
}

module.exports = connectDB