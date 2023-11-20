import { Router } from 'express';
import mysql from 'mysql';
const router1 = Router();
import { config } from "dotenv";
import bcrypt from 'bcrypt';
config();// Cargar las variables de entorno desde .env

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

router1.post('/register', (request, response) => {

});
router1.get('/list', (request, response) => {
	connection.query('SELECT * FROM encomienda.branch', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router1.get('/listTransport', (request, response) => {


	connection.query('SELECT * FROM encomienda.transport', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router1.get('/listPointsNear', (request, response) => {
	connection.query('SELECT * FROM encomienda.point_near', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router1.post('/new', (req, res) => {
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

router1.post('/newPointsNear', (req, res) => {
	const { points } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	points.forEach(point => {
		const insertQuery = 'INSERT INTO point_near (id_point_near, origin, destiny, distance, active, time) VALUES (?, ?, ?, ?, ?, ?)';
		connection.query(insertQuery, [point.id_point_near, point.origin, point.destiny, point.distance, point.active, point.time], (err, result) => {
			if (err) {
				if (err.code === 'ER_DUP_ENTRY') {
					res.status(400).json({ error: 'Ya existe una conexión con estos datos.' });
				} else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
					res.status(400).json({ error: 'Uno o más puntos no existen en la base de datos.' });
				} else {
					res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
				}
			} else {
				res.json({ message: 'Conexiones ingresadas correctamente!' });
			}
		});
	});

});

router1.post('/newPaymentMaintenance', (req, res) => {
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

router1.post('/maintenance', (req, res) => {
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

router1.post('/newTransport', (req, res) => {
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

router1.post('/newShipment', (req, res) => {
	const { origin, destiny, weight, volume, max_time, payment, status, date } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	const insertQuery = 'INSERT INTO shipment ( origin, destiny, weight, volume, max_time, payment, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
	connection.query(insertQuery, [origin, destiny, weight, volume, max_time, payment, status, date], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
		} else {
			res.json({ message: 'Registro insertado exitosamente', id: result.insertId });
		}
	});
});

router1.post('/newPointAssignment', (req, res) => {
	const { pointAssignments, route } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud como JSON

	const insertQuery = 'INSERT INTO route (name, steps) VALUES (?, ?)';
	connection.query(insertQuery, [route.name, route.steps], (err, result) => {
		if (err) {
			console.log(err);
			if (err.code === 'ER_DUP_ENTRY') {
				res.status(400).json({ error: 'Ya existe una conexión con estos datos.' });
			} else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
				res.status(400).json({ error: 'Uno o más puntos no existen en la base de datos.' });
			} else {
				res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
			}
		} else {
			const id_route = result.insertId;
			pointAssignments.forEach(point => {
				const insertQuery2 = 'INSERT INTO point_assignment (id_point, id_route, sequence, start_origin) VALUES (?, ?, ?, ?)';
				connection.query(insertQuery2, [point.id_point, id_route, point.sequence, point.start_origin], (err2, result2) => {
					if (err2) {
						console.log(err2);
						if (err2.code === 'ER_DUP_ENTRY') {
							res.status(400).json({ error: 'Ya existe una conexión con estos datos.' });
						} else if (err2.code === 'ER_NO_REFERENCED_ROW_2') {
							res.status(400).json({ error: 'Uno o más puntos no existen en la base de datos.' });
						} else {
							res.status(500).json({ error: 'Ocurrió un error al insertar en la base de datos' });
						}
					} else {
						res.json({ message: 'Ruta ingresada correctamente!' });
					}
				});
			});
		}
	});

});

router1.get('/getRoutes', (request, response) => {
	connection.query('SELECT * FROM encomienda.route', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router1.get('/getParams', (request, response) => {
	connection.query('SELECT * FROM encomienda.param WHERE id <= 11', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});


router1.get('/getDataPrices', (request, response) => {
	connection.query('SELECT * FROM encomienda.param WHERE id <= 11 AND id>= 6;', (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			response.json(rows);
		}
	});
});

router1.put('/updateParam', (request, response) => {
    const { id, name, factor } = request.body; // Suponiendo que los nuevos datos se envían en el cuerpo de la solicitud

    connection.query('UPDATE encomienda.param SET factor = ? WHERE id = ?', [factor, id], (err, result) => {
        if (err) {
            response.status(500).json({ error: 'Ocurrió un error en la actualización de datos del parametro '+name });
        } else {
            response.json({ message: 'Parametro '+ name + ' actualizado correctamente!' });
        }
    });
});


router1.post('/login', (request, response) => {
	const { email, password } = request.body;
	console.log(email, password);
	connection.query('SELECT e.*, r.*, b.* FROM encomienda.employee e, role_assignment r, branch b WHERE email = ? AND e.role_assignment = r.role AND r.branch = b.id_branch', [email], (err, rows) => {
		if (err) {
			console.error('Error en la consulta:', err);
			response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
		} else {
			if (rows.length > 0) {
				var password_db = rows[0].password
				bcrypt.compare(password, password_db, function (err2, result) {
					if (result) {
						rows[0].password = "";
						response.json(rows);
					} else {
						response.status(500).json({ error: 'Ocurrió un error en la consulta a la base de datos' });
					}
				});
			} else {
				response.json(rows);
			}
		}
	});
});


export { router1 as branchRoutes }