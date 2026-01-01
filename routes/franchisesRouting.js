const {
    createFranchise,
    getFranchises,
    getFranchiseById,
    updateFranchise,
    deleteFranchise,
    getFranchiseReport,
    getFranchiseDetailsReport
  } = require('../controllers/franchisesController');
   
  function franchiseRoutes(req, res) {
   
    // CREATE
    if (req.url === '/franchise' && req.method === 'POST') {
      createFranchise(req, res);
    }
   
    // READ ALL
    else if (req.url === '/franchises' && req.method === 'GET') {
      getFranchises(req, res);
    }
   
    // READ BY ID
    else if (req.url.startsWith('/franchise') && req.method === 'GET') {
      getFranchiseById(req, res);
    }
   
    // UPDATE
    else if (req.url === '/franchise' && req.method === 'PUT') {
      updateFranchise(req, res);
    }
   
    // DELETE
    else if (req.url === '/franchise' && req.method === 'DELETE') {
      deleteFranchise(req, res);
    }
   
    // REPORT APIs
    else if (req.url === '/reports/franchises' && req.method === 'GET') {
      getFranchiseReport(req, res);
    }
   
    else if (req.url === '/reports/franchise-details' && req.method === 'GET') {
      getFranchiseDetailsReport(req, res);
    }
   
  }
   
  module.exports = franchiseRoutes;