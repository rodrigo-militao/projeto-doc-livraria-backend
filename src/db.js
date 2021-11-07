const db = { };
const connect = async () => {
   if (global.connection && global.connection.state !== 'disconnected') return global.connection;

   const mysql = require('mysql2/promise');
   const db_user = "root"
   const db_password = "12345678"
   const db_host = "localhost"
   const db_port = 3306
   const db_name = "main"
   
   global.connection = await mysql.createConnection(`mysql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`);

   return global.connection;
};

/* Queries by table `articles` */
db.articles = {
   insert: async data => {
      const { url, group, title, content, order } = data;
      const connection = await connect();
      const rows = await connection.query('INSERT INTO `articles` (`url`, `group`, `title`, `content`, `order`) VALUES (?, ?, ?, ?, ?)', [ url, group, title, content, order ], err => err ? false : true);
   
      return rows;
   },
   update: async data => {
      const { title, content, url } = data;
      const connection = await connect();
      const rows = await connection.query('UPDATE `articles` SET `title` = ?, `content` = ?, `url` = ? WHERE `id` = ? LIMIT 1', [ title, content, url, id ], err => err ? false : true);
   
      return rows;
   },
   delete: async id => {
      const connection = await connect();
      const [ rows ] = await connection.query('DELETE FROM `articles` WHERE `id` = ? LIMIT 1', [ id ], err => err ? false : true);
   
      return rows;
   },
   findById: async id => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `title`, `order`, `url` FROM `articles` WHERE `id` = ? LIMIT 1', [ id ]);
   
      return rows[0];
   },
   findByGroup: async group => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `title`, `order`, `url` FROM `articles` WHERE `group` = ?', [ group ]);
   
      return rows;
   },
   findAll: async () => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `title`, `order`, `url` FROM `articles`');
   
      return rows;
   },
   findByUrl: async url => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `group`, `title`, `content`, `created_at`, `updated_at` FROM `articles` WHERE `url` = ? LIMIT 1', [ url ]);
   
      return rows[0];
   },
   search: async title => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `group`, `title`, `url` FROM `articles` WHERE `title` LIKE ? LIMIT 10', [ `%${title}%` ]);
   
      return rows;
   }
};


/* Queries by table `groups` */
db.groups = {
   insert: async data => {
      const { title, order } = data;
      const connection = await connect();
      const rows = await connection.query('INSERT INTO `groups` (`title`, `order`) VALUES (?, ?)', [ title, order ], err => err ? false : true);
   
      return rows;
   },
   update: async (id, group) => {
      const { title, order } = group;
      const connection = await connect();
      const rows = await connection.query('UPDATE `groups` SET `title` = ?, `order` = ? WHERE `id` = ? LIMIT 1', [ title, order, id ], err => err ? false : true);
   
      return rows;
   },
   delete: async id => {
      const connection = await connect();
      const [ rows ] = await connection.query('DELETE FROM `groups` WHERE `id` = ? LIMIT 1', [ id ], err => err ? false : true);
   
      return rows;
   },
   findById: async id => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `title`, `order`, FROM `groups` WHERE `id` = ? LIMIT 1', [ id ]);
   
      return rows[0];
   },
   findAll: async () => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT `title`, `order` FROM `groups`');
   
      return rows;
   },
   findGroupsAndArticles: async () => {
      const connection = await connect();
      const [ rows ] = await connection.query('SELECT g.id, g.title , g.`order`, a.url, a.title as articleTitle, a.`order` as articleOrder FROM `groups` g INNER JOIN articles a ON g.id = a.group');
      //group rows by id
      const groups = {};
      rows.map(row => {
         if (!groups[row.id]) groups[row.id] = {
            id: row.id,
            title: row.title,
            order: row.order,
            articles: []
         };
         groups[row.id].articles.push({
            url: row.url,
            title: row.articleTitle,
            order: row.articleOrder
         });
      });
      return Object.values(groups);
   }
};


module.exports = db;
