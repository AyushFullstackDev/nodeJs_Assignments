const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCoursesReport
} = require('../controllers/courseController');
 
function courseRoutes(req, res) {

  // CREATE
  if (req.url === '/course' && req.method === 'POST') {
   createCourse(req, res);
  }
 
  // READ
  else if (req.url === '/courses' && req.method === 'GET') {
    getCourses(req, res);
  }
 
  // READ BY ID
  else if (req.url.startsWith('/course') && req.method === 'GET') {
    getCourseById(req, res);
  }
 
  // UPDATE
  else if (req.url === '/course' && req.method === 'PUT') {
    updateCourse(req, res);
  }
 
  // DELETE
  else if (req.url === '/course' && req.method === 'DELETE') {
    deleteCourse(req, res);
  }
 
  // REPORT APIs
  else if (req.url === '/reports/courses' && req.method === 'GET') {
   getCoursesReport(req, res);
  }
}
 
module.exports = courseRoutes;
 