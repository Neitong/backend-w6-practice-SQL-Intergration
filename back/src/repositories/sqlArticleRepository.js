//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import  { connection } from "../utils/database.js";

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await connection.query("SELECT * FROM articles");
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await connection.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const [result] = await connection.query(
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
    const [result] = await connection.query(
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
    const [result] = await connection.query(
        "UPDATE articles SET deleted = 1 WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) throw new Error("Article not found or already deleted");

    return result;
}
