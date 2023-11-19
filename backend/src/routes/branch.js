const express = require('express');
const router = express.Router();
const mysql = require('mysql');
require('dotenv').config(); // Cargar las variables de entorno desde .env

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err);
		return;
	}
	console.log('Conexión exitosa a la base de datos "encomienda"');
});

router.post('/login', (request, response) => {
	response.send('login');
});
router.post('/register', (request, response) => {

});
router.get('/list', (request, response) => {
	connection.query('SELECT * FROM encomienda.branch', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router.get('/listTransport', (request, response) => {
	connection.query('SELECT * FROM encomienda.transport', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router.post('/new', (req, res) => {
	const { name, address, location } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	const insertQuery = 'INSERT INTO branch (name, address, location) VALUES (?, ?, ?)';
	connection.query(insertQuery, [name, address, location], (err, result) => {
		if (err) {
			console.error('Error al insertar en la base de datos:', err);
			res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
		} else {
			const id_branch = result.insertId;
			const insertQuery2 = 'INSERT INTO point (id_point, demand) VALUES (?, ?)';
			connection.query(insertQuery2, [id_branch, 0], (err2, result2) => {
				if (err2) {
					res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
				} else {
					res.json({ message: 'Sucursal ingresada correctamente!' });
				}
			});
		}
	});
});

router.post('/newPointsNear', (req, res) => {
	const { points } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	points.forEach(point => {
		const insertQuery = 'INSERT INTO point_near (id_point_near, origin, destiny, distance, active, time) VALUES (?, ?, ?, ?, ?, ?)';
		connection.query(insertQuery, [point.id_point_near, point.origin, point.destiny, point.distance, point.active, point.time], (err, result) => {
			if (err) {
				console.error('Error al insertar en la base de datos:', err);
				res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
			}
		});
		res.json({ message: 'Conexiones ingresadas correctamente!' });
	});

});

router.post('/newPaymentMaintenance', (req, res) => {
	const { payment, special, transport } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	const insertQuery = 'INSERT INTO payment (type_payment, date, amount) VALUES (?, ?, ?)';
	connection.query(insertQuery, [payment.type, payment.date, payment.amount], (err, result) => {
		if (err) {
			console.error('Error al insertar en la base de datos:', err);
			res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
		} else {
			const paymentId = result.insertId;
			const insertQuery2 = 'INSERT INTO payment_special (id_payment, name, description) VALUES (?, ?, ?)';
			connection.query(insertQuery2, [paymentId, special.name, special.description], (err2, result2) => {
				if (err2) {
					console.error('Error al insertar en la base de datos:', err2);
					res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
				} else {
					changeMaintenance(false, transport, res);
				}
			});
		}
	});
});

router.post('/maintenance', (req, res) => {
	const { transport } = req.body;
	changeMaintenance(true, transport, res);
});

function changeMaintenance(maintenanceValue, transport, res) {
	const updateTransportQuery = 'UPDATE transport SET maintenance = ? WHERE id_transport = ?';
	connection.query(updateTransportQuery, [maintenanceValue, transport], (err, updateResult) => {
		if (err) {
			console.error('Error al actualizar el campo maintenance:', err);
			res.status(500).json({ error: 'Ocurrió un error al actualizar el campo maintenance' });
		} else {
			console.log('Registros insertados y actualizados exitosamente');
			res.json({ message: 'Registros insertados y actualizados exitosamente' });
		}
	});
}

router.post('/newTransport', (req, res) => {
	const { id_transport, tonnage, branch, active } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	const insertQuery = 'INSERT INTO transport ( id_transport, tonnage, branch, active) VALUES (?, ?, ?, ?)';
	connection.query(insertQuery, [id_transport, tonnage, branch, active], (err, result) => {
		if (err) {
			res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
		} else {
			res.json({ message: 'Registro insertado exitosamente' });
		}
	});
});

module.exports = router;