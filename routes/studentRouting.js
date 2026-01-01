const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getClassStudentCount
} = require('../controllers/studentController');
 
function studentRoutes(req, res) {

  // CREATE
  if (req.url === '/student' && req.method === 'POST') {
    createStudent(req, res);
  }
 
  // READ
  else if (req.url === '/students' && req.method === 'GET') {
    getStudents(req, res);
  }
 
  // READ BY ID
  else if (req.url.startsWith('/student') && req.method === 'GET') {
    getStudentById(req, res);
  }
 
  // UPDATE
  else if (req.url === '/student' && req.method === 'PUT') {
    updateStudent(req, res);
  }
 
  // DELETE
  else if (req.url === '/student' && req.method === 'DELETE') {
    deleteStudent(req, res);
  }
 
  // REPORT APIs
  else if (req.url === '/reports/classes' && req.method === 'GET') {
    getClassStudentCount(req, res);
  }
}
 
module.exports = studentRoutes;