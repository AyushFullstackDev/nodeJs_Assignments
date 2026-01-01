const http = require('http');

const classesRoutes = require('./routes/classesRouting');
const coursesRoutes = require('./routes/coursesRouting');
const institutesRoutes = require('./routes/instituteRouting');
const studentsRoutes = require('./routes/studentRouting');
const franchisesRoutes = require('./routes/franchisesRouting');

const server = http.createServer((req, res) => {

  // har request sab route files ko pass karo
  classesRoutes(req, res);
  coursesRoutes(req, res);
  institutesRoutes(req, res);
  studentsRoutes(req, res);
  franchisesRoutes(req, res);

});

server.listen(3011, () => {
  console.log('Server running on port 3011');
});
