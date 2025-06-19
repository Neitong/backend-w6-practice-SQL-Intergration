//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import  { pool } from "../utils/database.js";

async function delay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get all articles
export async function getArticles() {
    // TODO
    await delay();
    const [rows] = await pool.query(`
        SELECT articles.*, journalists.name AS journalist_name
        FROM articles
        LEFT JOIN journalists ON articles.journalist_id = journalists.id
    `);
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    await delay();
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
}

// Create a new article
export async function createArticle(article) {
    // TODO
    await delay();
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
        [
            article.title,
            article.content,
            article.journalist,
            article.category
        ]
    );
    return result;
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    await delay();
    const [result] = await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?",
        [
            updatedData.title,
            updatedData.content,
            updatedData.journalist,
            updatedData.category,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return result;
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    await delay();
    const [result] = await pool.query(
        "UPDATE articles SET deleted = 1 WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) throw new Error("Article not found or already deleted");

    return result;
}

export async function getJournalists(){
    await delay();
    const [rows] = await pool.query("SELECT * FROM journalists");
}

export async function getJournalistArticles(journalistId) {
    await delay();
    const [rows] = await pool.query(
        'SELECT articles.*, journalists.name as journalist_name FROM articles ' +
        'JOIN journalists ON articles.journalist_id = journalists.id ' +
        'WHERE journalists.id = ?',
        [journalistId]
    );
    return rows;
}
