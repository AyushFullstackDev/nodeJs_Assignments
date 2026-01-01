const {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass,
    getClassesReport
} = require('../controllers/classesController');
 
function classesRoutes(req, res) {

  // CREATE
  if (req.url === '/class' && req.method === 'POST') {
    createClass(req, res);
  }
 
  // READ
  else if (req.url === '/classes' && req.method === 'GET') {
    getClasses(req, res);
  }
 
  // READ BY ID
  else if (req.url.startsWith('/class') && req.method === 'GET') {
    getClassById(req, res);
  }
 
  // UPDATE
  else if (req.url === '/class' && req.method === 'PUT') {
    updateClass(req, res);
  }
 
  // DELETE
  else if (req.url === '/class' && req.method === 'DELETE') {
    deleteClass(req, res);
  }
 
  // REPORT APIs
  else if (req.url === '/reports/classes' && req.method === 'GET') {
    getClassesReport(req, res);
  }
}
 
module.exports = classesRoutes;