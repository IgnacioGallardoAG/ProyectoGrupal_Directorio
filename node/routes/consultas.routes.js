import mysql from 'mysql2/promise';
import express from 'express';

const router = express.Router();

const db = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bd_proyecto',
};

// Mostrar la cantidad de eventos por ubicación
router.post('/1', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const consulta = "SELECT u.nombre_ubicacion, COUNT(e.id) \
    AS cantidad_eventos FROM eventos e JOIN ubicaciones u ON \
    e.id_ubicacion = u.id GROUP BY u.nombre_ubicacion;"

    // guardamos el resultado de la consulta en results
    const [resultados] = await connection.execute(consulta);

    // resultados a un arreglo
    const array = Array.from(resultados);

    connection.end();

    res.json({ resultado: array });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mostrar los tipos de negocio que tienen más de 2 negocios
router.post('/2', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const consulta = "SELECT n.tipo_negocio, COUNT(n.id) AS \
    cantidad_negocios FROM negocios n JOIN ubicaciones u ON \
    n.id_ubicacion = u.id GROUP BY n.tipo_negocio HAVING COUNT(n.id) > 2;";

    // guardamos el resultado de la consulta en results
    const [resultados] = await connection.execute(consulta);

    // resultados a un arreglo
    const array = Array.from(resultados);

    connection.end();

    res.json({ resultado: array });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mostrar los usuarios que han asistido a eventos en más de una ubicacion
router.post('/3', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const consulta = "SELECT u.nombre_usuario, COUNT(DISTINCT e.id_ubicacion) \
     AS ubicaciones_distintas FROM usuarios u JOIN usuarios_eventos ue ON u.id = \
     ue.id_usuario JOIN eventos e ON ue.id_evento = e.id GROUP BY u.nombre_usuario \
     HAVING COUNT(DISTINCT e.id_ubicacion) >= 2;";

    // guardamos el resultado de la consulta en results
    const [resultados] = await connection.execute(consulta);

    // resultados a un arreglo
    const array = Array.from(resultados);

    connection.end();

    res.json({ resultado: array });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mostrar las ubicaciones que tienen eventos después de la fecha actual
router.post('/4', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const consulta = "SELECT u.nombre_ubicacion, COUNT(e.id) AS cantidad_eventos \
     FROM ubicaciones u JOIN eventos e ON u.id = e.id_ubicacion WHERE e.fecha_hora \
      > CURDATE() GROUP BY u.nombre_ubicacion;";

    // guardamos el resultado de la consulta en results
    const [resultados] = await connection.execute(consulta);

    // resultados a un arreglo
    const array = Array.from(resultados);

    connection.end();

    res.json({ resultado: array });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mostrar las reseñas promedio de eventos con una calificación promedio superior a 3
router.post('/5', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const consulta = "SELECT e.nombre_evento, AVG(r.calificacion) AS \
    calificacion_promedio FROM eventos e JOIN reseñas r ON e.id = r.id_negocio \
    GROUP BY e.nombre_evento HAVING COUNT(r.id) >= 2 AND AVG(r.calificacion) > 3;";

    // guardamos el resultado de la consulta en results
    const [resultados] = await connection.execute(consulta);

    // resultados a un arreglo
    const array = Array.from(resultados);

    connection.end();

    res.json({ resultado: array });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
