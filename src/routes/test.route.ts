import express from "express"
const router= express.Router()

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
        const {email}= req.query
        console.log(email as string)
      const [rows] = await req.app.locals.db.query('SELECT * FROM usuario WHERE email = ?', [email as string])//('SELECT * FROM usuario WHERE email = "mury@mano.com"');
      res.json(rows);
    } catch (error) {
      next(error);
    }
});
export default router