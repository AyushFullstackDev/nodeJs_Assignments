const pool = require('../database');
const url = require('url');

// CREATE student
function createStudent(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      `
      INSERT INTO students_list 
      (student_name, admission_no, institute_id, course_id, class_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        data.student_name,
        data.admission_no,
        data.institute_id,
        data.course_id,
        data.class_id
      ],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// GET all students
function getStudents(req, res) {
  pool.query(
    `
    SELECT 
      s.id,
      s.student_name,
      s.admission_no,
      i.name AS institute_name,
      c.course_name AS course_name,
      cl.class_name AS class_name
    FROM students_list s
    JOIN institutes i ON s.institute_id = i.id
    JOIN courses c ON s.course_id = c.id
    JOIN classes cl ON s.class_id = cl.id
    `,
    (err, result) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify(result.rows));
    }
  );
}

// GET student by id
function getStudentById(req, res) {
  const query = url.parse(req.url, true).query;

  pool.query(
    `
    SELECT 
      s.*,
      i.name AS institute_name,
      c.course_name AS course_name,
      cl.class_name AS class_name
    FROM students_list s
    JOIN institutes i ON s.institute_id = i.id
    JOIN courses c ON s.course_id = c.id
    JOIN classes cl ON s.class_id = cl.id
    WHERE s.id = $1
    `,
    [query.id],
    (err, result) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify(result.rows[0]));
    }
  );
}

// UPDATE student
function updateStudent(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);

    pool.query(
      `
      UPDATE students_list
      SET student_name=$1, admission_no=$2, institute_id=$3, course_id=$4, class_id=$5
      WHERE id=$6
      RETURNING *
      `,
      [
        data.student_name,
        data.admission_no,
        data.institute_id,
        data.course_id,
        data.class_id,
        data.id
      ],
      (err, result) => {
        if (err) res.end(err.message);
        else res.end(JSON.stringify(result.rows[0]));
      }
    );
  });
}

// DELETE student
function deleteStudent(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);
    pool.query('DELETE FROM students_list WHERE id=$1', [data.id], (err) => {
      if (err) res.end(err.message);
      else res.end(JSON.stringify({ message: 'Student deleted' }));
    });
  });
}

// REPORT: CLASS WISE STUDENT COUNT
function getClassStudentCount(req, res) {
  pool.query(
    `
    SELECT 
      cl.id,
      cl.class_name,
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
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getClassStudentCount
};
