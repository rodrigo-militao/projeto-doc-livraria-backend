async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");

    const db_user = "root"
    const db_password = "12345678"
    const db_host = "localhost"
    const db_port = 3306
    const db_name = "main"

    const connection = await mysql.createConnection(`mysql://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function findArticle(postId){
    const connection = await connect();
    const [rows] = await connection.query(`SELECT * FROM articles WHERE postId = ?`, [postId]);
    return rows[0];
}

async function findAllArticles(){
    const connection = await connect();
    const [rows] = await connection.query(`SELECT * FROM articles`);
    return rows;
}

async function createArticle(title, content){
    const connection = await connect()
    const postId = makePostId(10)
    const [rows] = await connection.query(`INSERT INTO articles (postId, title, content) VALUES (?, ?, ?)`, [postId, title, content]);
    return rows;
}

async function updateArticle(id, updated_article){
    const connection = await connect();
    const [rows] = await connection.query(`UPDATE articles SET title = ?, content = ? WHERE id = ?`, [updated_article.title, updated_article.content, id]);
    return rows;
}

async function deleteArticle(id){
    const connection = await connect();
    const [rows] = await connection.query(`DELETE FROM articles WHERE id = ?`, [id]);
    return rows;
}

function makePostId(number_of_chars) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < number_of_chars; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
    findArticle,
    findAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
}