const dbConnection = require('./db');
let db = null;

dbConnection('', '', 'raj').then((res) => {
    db = res;
})


class Model {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	insert(data) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.insertOne(data)
				.then((res) => {
					resolve(res);
				})
				.catch((e) => {
					console.log({
						func: 'insert',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				});
		});
	}

	update(filter, newData, option) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.update(filter, newData, option)
				.then((res) => {
					resolve(res);
				})
				.catch((e) => {
					console.log({
						func: 'update',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				});
		});
	}

	remove(data) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.remove(data)
				.then((res) => {
					resolve(res);
				})
				.catch((e) => {
					console.log({
						func: 'remove',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				});
		});
	}

	find(filter, option = {}, sort = {}) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.find(filter, option).sort(sort).toArray((e, res) => {
				if (e) {
					console.log({
						func: 'find',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				}
				resolve(res);
			});
		});
	}

	findOne(filter) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.findOne(filter, (e, res) => {
				if (e) {
					console.log({
						func: 'findOne',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				}
				resolve(res);
			});
		});
	}
	aggregate(filter) {
		const collection = db.collection(this.collectionName);
		return new Promise((resolve, reject) => {
			collection.aggregate(filter).toArray((e, res) => {
				if (e) {
					console.log({
						func: 'aggregate',
						mesg: e
					});
					const error = new Error(e);
					reject(error);
				}
				resolve(res);
			});
		});
	}
}
module.exports = Model;