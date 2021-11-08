'use strict';

(() => {
   const express = require('express');
   const app = express();
   const bodyParser = require('body-parser');
   const cors = require('cors');
   const controller = require('./src/controllers');
   const PORT = 5001;

   app.use(cors({ origin: 'http://localhost:3000' }));

   app.use(bodyParser.json());

   app.use('/group', controller.groupController);
   app.use('/article', controller.articleController);

   app.listen(PORT, () => console.log('Server is running on port ' + PORT));
})();