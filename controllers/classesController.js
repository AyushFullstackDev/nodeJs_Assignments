const pool = require('../database');
const url = require('url');

// CREATE class
function createClass(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      `
      INSERT INTO classes 
      (course_id, class_name, section)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [data.course_id, data.class_name, data.section],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// GET all classes
function getClasses(req, res) {
  pool.query(
    `
    SELECT 
      cl.id,
      cl.class_name,
      cl.section,
      c.course_name AS course_name
    FROM classes cl
    JOIN courses c ON cl.course_id = c.id
    `,
    (err, result) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify(result.rows));
    }
  );
}

// GET class by id
function getClassById(req, res) {
  const query = url.parse(req.url, true).query;

  pool.query(
    `
    SELECT 
      cl.*,
      c.course_name AS course_name
    FROM classes cl
    JOIN courses c ON cl.course_id = c.id
    WHERE cl.id = $1
    `,
    [query.id],
    (err, result) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify(result.rows[0]));
    }
  );
}

// UPDATE class
function updateClass(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      `
      UPDATE classes
      SET class_name=$1, section=$2, course_id=$3
      WHERE id=$4
      RETURNING *
      `,
      [data.class_name, data.section, data.course_id, data.id],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// DELETE class
function deleteClass(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);
    pool.query('DELETE FROM classes WHERE id=$1', [data.id], (err) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify({ message: 'Class deleted' }));
    });
  });
}

// REPORT: class + student count
function getClassesReport(req, res) {
  pool.query(
    `
    SELECT 
      cl.id,
      cl.class_name,
      cl.section,
      COUNT(s.id) AS total_students
    FROM classes cl
    LEFT JOIN students_list s ON s.class_id = cl.id
    GROUP BY cl.id
    `,
    (err, result) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify(result.rows));
    }
  );
}

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassesReport
};
