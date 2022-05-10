const MongoClient = require('mongodb').MongoClient;


let db = null;

const connectSync = (ip, port, dbName) => new Promise((res) => {
	if (db !== null) {
		res(db);
	}
	const url = `mongodb+srv://yugan:yugan@cluster1.haiqs.mongodb.net`;
    MongoClient.connect(url, (err, client) => {
        console.log(err)
		if (client == null) {
			throw err;
		}
		const dbConnection = client.db(dbName);
        db = dbConnection;
		res(db);
	});
});

function connectDB(ip = '', port = '', dbName = '') {
	if (db !== null) {
		console.log('already db connected');
		return db;
	}
	return connectSync(ip, port, dbName);
};

module.exports = connectDB;