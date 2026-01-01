const pool = require('../database');
const url = require('url');

// CREATE Franchise
function createFranchise(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);

  req.on('end', () => {
    const data = JSON.parse(body);
    const name = data.name;

    pool.query(
      'INSERT INTO franchises (name) VALUES ($1) RETURNING *',
      [name],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// GET ALL Franchises
function getFranchises(req, res) {
  pool.query('SELECT * FROM franchises', (err, result) => {
    if (err) res.end(err.message);
    else res.end(JSON.stringify(result.rows));
  });
}

// GET Franchise by ID
function getFranchiseById(req, res) {
  const query = url.parse(req.url, true).query;
  const id = query.id;

  pool.query('SELECT * FROM franchises WHERE id=$1', [id], (err, result) => {
    if (err) res.end(err.message);
    else res.end(JSON.stringify(result.rows[0]));
  });
}

// UPDATE Franchise
function updateFranchise(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);

  req.on('end', () => {
    const data = JSON.parse(body);
    const id = data.id;
    const name = data.name;

    pool.query(
      'UPDATE franchises SET name=$1 WHERE id=$2 RETURNING *',
      [name, id],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// DELETE Franchise
function deleteFranchise(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);

  req.on('end', () => {
    const data = JSON.parse(body);
    const id = data.id;

    pool.query('DELETE FROM franchises WHERE id=$1', [id], (err) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify({ message: 'Franchise deleted' }));
    });
  });
}

// REPORT: Franchise → Total Institutes
function getFranchiseReport(req, res) {
  const sql = `
    SELECT 
      f.id,
      f.name,
      COUNT(i.id) AS total_institutes
    FROM franchises f
    LEFT JOIN institutes i ON i.franchise_id = f.id
    GROUP BY f.id
  `;

  pool.query(sql, (err, result) => {
    if (err) res.end(err.message);
    else res.end(JSON.stringify(result.rows));
  });
}

// REPORT: Franchise → Institutes → Students
function getFranchiseDetailsReport(req, res) {
  const sql = `
    SELECT 
      f.name AS franchise,
      COUNT(DISTINCT i.id) AS institutes,
      COUNT(s.id) AS students
    FROM franchises f
    LEFT JOIN institutes i ON i.franchise_id = f.id
    LEFT JOIN courses c ON c.institute_id = i.id
    LEFT JOIN classes cl ON cl.course_id = c.id
    LEFT JOIN students_list s ON s.class_id = cl.id
    GROUP BY f.id
  `;

  pool.query(sql, (err, result) => {
    if (err) res.end(err.message);
    else res.end(JSON.stringify(result.rows));
  });
}

module.exports = {
  createFranchise,
  getFranchises,
  getFranchiseById,
  updateFranchise,
  deleteFranchise,
  getFranchiseReport,
  getFranchiseDetailsReport
};
