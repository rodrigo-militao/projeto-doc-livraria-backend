(() => {
   const express = require('express');
   const app = express();
   const bodyParser = require('body-parser');
   const db = require('./src/db');
   const cors = require('cors');
   const userController = require('./src/controllers/userController');
   const groupController = require('./src/controllers/groupController');
   const articleController = require('./src/controllers/articleController');
   const PORT = 5001;

   app.use(cors({ origin: 'http://localhost:3000' }));

   app.use(bodyParser.json());

   //app.use('/user', userController)
   app.use('/group', groupController)
   app.use('/article', articleController)

   app.listen(PORT, () => console.log('Server is running on port ' + PORT));
})();
