import express from "express"
const router = express.Router()

router.get('/users', async (req, res, next) => {
  try {
    const [rows] = await req.app.locals.db.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});
router.get('/user', async (req, res, next) => {
  try {
    const { email } = req.query
    console.log(email as string)
    const [rows] = await req.app.locals.db.query('SELECT * FROM usuario WHERE email = ?', [email as string])//('SELECT * FROM usuario WHERE email = "mury@mano.com"');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});
router.get('/user/rol', async (req, res, next) => {
  try {
    const { rol } = req.query
    // console.log(rol as string)
    const [rows] = await req.app.locals.db.query('SELECT * FROM usuario WHERE rol = ?', [rol as string])//('SELECT * FROM usuario WHERE rol = "
    res.json(rows);
  } catch (error) {
    next(error);
  }
});
router.get('/user/medico', async (req, res, next) => {
  try {
    const { id } = req.query
    // console.log(id as string)
    const [rows] = await req.app.locals.db.query('SELECT * FROM medico WHERE usuario_id = ?', [id as string])//('SELECT * FROM usuario WHERE rol = "
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/user/medico', async (req, res, next) => {
  try {
    const { usuario_id, cedula_profesional, especialidad, dias_laborables, horario_laboral, direccion_consultorio, coordenadas_consultorio, cedula_validada } = req.body;
    
    const [latitud, longitud] = coordenadas_consultorio.split(',').map(coord => parseFloat(coord.trim()));

    // Validación de parámetros
    if (!usuario_id || !cedula_profesional || !especialidad || !dias_laborables || !horario_laboral || !direccion_consultorio || !coordenadas_consultorio || cedula_validada === undefined) {
      return res.status(400).json({ message: "Faltan parámetros necesarios para crear el médico." });
    }

    // Formatear las coordenadas como un POINT
    const pointString = `POINT(${longitud} ${latitud})`;

    const query = `
      INSERT INTO medico (
        usuario_id, 
        cedula_profesional, 
        especialidad, 
        dias_laborables, 
        horario_laboral, 
        direccion_consultorio, 
        coordenadas_consultorio, 
        cedula_validada
      ) VALUES (?, ?, ?, ?, ?, ?, ST_GeomFromText(?), ?);
    `;
    
    const result = await req.app.locals.db.query(query, [
      usuario_id,
      cedula_profesional,
      especialidad,
      dias_laborables,
      horario_laboral,
      direccion_consultorio,
      pointString,
      cedula_validada
    ]);

    // Retornar la respuesta con el ID del nuevo médico creado
    res.status(201).json({ message: "Médico creado correctamente", id: result[0].insertId });
  } catch (error) {
    next(error); // Pasamos el error al middleware de manejo de errores
  }
});

export default router