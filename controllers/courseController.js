const pool = require('../database');
const url = require('url');

// Create Course
function createCourse(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      'INSERT INTO courses (course_name, institute_id) VALUES ($1, $2) RETURNING *',
    [data.course_name, data.institute_id],
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

// Get all Course
function getCourses(req, res) {
  pool.query(
    `
    SELECT 
      c.id,
      c.course_name,
      i.name AS institute_name
    FROM courses c
    JOIN institutes i ON c.institute_id = i.id
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
 
// Get course by id
function getCourseById(req, res) {
  const query = url.parse(req.url, true).query;

  pool.query(
    'SELECT * FROM courses WHERE id = $1',
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

// Update course
function updateCourse(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      'UPDATE courses SET course_name,=$1 WHERE id=$2 RETURNING *',
      [data.name, data.id],
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

// Delete course
function deleteCourse(req, res) {
  let body = '';

  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      'DELETE FROM courses WHERE id=$1',
      [data.id],
      (err) => {
        if (err) {
          res.end(err.message);
        } else {
          res.end(JSON.stringify({ message: 'Course deleted' }));
        }
      }
    );
  });
}


// REPORT: Courses + Students Count

function getCoursesReport(req, res) {
  pool.query(
    `
    SELECT 
      c.id,
      c.course_name,
      COUNT(s.id) AS total_students
    FROM courses c
    LEFT JOIN students_list s ON s.course_id = c.id
    GROUP BY c.id
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
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesReport
};