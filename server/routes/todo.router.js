const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "List" ORDER BY task, complete DESC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


// POST
router.post('/', (req, res) => {
  const list = req.body;
  const sqlText = `INSERT INTO "List" (task, complete)
   VALUES ($1, $2)`;
 pool.query(sqlText, [list.task, list.complete])
        .then((result) => {
            console.log(`Added task to the database`, list );
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})
// PUT
router.put('/toggle/:id', (req, res) => {
  let {id} = req.params;
  
  const sqlText = `UPDATE "List" SET "complete" = NOT "complete" WHERE "id" = $1;`
  pool.query(sqlText, [id])
  .then((response) => {
      console.log(`got stuff from database`, response);
      res.sendStatus(201);
  })
  .catch((error) => {
      console.log(`error query`, error);
      res.sendStatus(500)
  })
}) 

// DELETE
router.delete('/:id', (req, res) => {
  let {id} = req.params
  const sqlText = `DELETE FROM "List" WHERE "id" = $1`;
  pool.query(sqlText, [id])
  .then((response) => {
      console.log(`got stuff from database`, response);
      res.sendStatus(201)
  })
  .catch((error) => {
      console.log(`error query`, error);
      res.sendStatus(500)
  })
});


module.exports = router;
