const pool = require('../database');
const url = require('url');

// Create Institute
function createInstitute(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      `INSERT INTO institutes (name, city, franchise_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.name, data.city, data.franchise_id],
      (err, result) => {
        if (err) return res.end(err.message);
        res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// Get Institutes
function getInstitutes(req, res) {
  pool.query('SELECT * FROM institutes', (err, result) => {
    if (err) {
      res.end(err.message);
    } else {
      res.end(JSON.stringify(result.rows));
    }
  });
}

// Get Institute by id
function getInstituteById(req, res) {
  const query = url.parse(req.url, true).query;

  pool.query(
    'SELECT * FROM institutes WHERE id = $1',
    [query.id],
    (err, result) => {
      if (err) {
        res.end(err.message);
      } else {
        res.end(JSON.stringify(result.rows[0]));
      }
    }
  );
}

// Update Institute
function updateInstitute(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      'UPDATE institutes SET name=$1, city=$2 WHERE id=$3 RETURNING *',
      [data.name, data.city, data.id],
      (err, result) => {
        if (err) {
          res.end(err.message);
        } else {
          res.end(JSON.stringify(result.rows[0]));
        }
      }
    );
  });
}

// Delete institute
function deleteInstitute(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      'DELETE FROM institutes WHERE id=$1',
      [data.id],
      (err) => {
        if (err) {
          res.end(err.message);
        } else {
          res.end(JSON.stringify({ message: 'Institute deleted' }));
        }
      }
    );
  });
}

/* =====================
   REPORT: Institutes + Student Count
===================== */
function getInstitutesReport(req, res) {
  pool.query(
    `
    SELECT 
      i.id,
      i.name,
      i.city,
      COUNT(s.id) AS total_students
    FROM institutes i
    LEFT JOIN students_list s ON s.institute_id = i.id
    GROUP BY i.id
    `,
    (err, result) => {
      if (err) {
        res.end(err.message);
      } else {
        res.end(JSON.stringify(result.rows));
      }
    }
  );
}

module.exports = {
  createInstitute,
  getInstitutes,
  getInstituteById,
  updateInstitute,
  deleteInstitute,
  getInstitutesReport
};