const {
    createInstitute,
    getInstitutes,
    getInstituteById,
    updateInstitute,
    deleteInstitute,
    getInstitutesReport
  } = require('../controllers/instituteController');
   
  function instituteRoutes(req, res) {

    // CREATE
    if (req.url === '/institute' && req.method === 'POST') {
      createInstitute(req, res);
    }

    else if (req.url === '/institutes' && req.method === 'GET') {
      getInstitutes(req, res);
    }
    else if (req.url.startsWith('/institute') && req.method === 'GET') {
      getInstituteById(req, res);
    }
    else if (req.url === '/institute' && req.method === 'PUT') {
      updateInstitute(req, res);
    }
    else if (req.url === '/institute' && req.method === 'DELETE') {
      deleteInstitute(req, res);
    }
    else if (req.url === '/reports/institutes' && req.method === 'GET') {
      getInstitutesReport(req, res);
    }
  }
   
  module.exports = instituteRoutes;