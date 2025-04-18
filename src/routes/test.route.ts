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
export default router