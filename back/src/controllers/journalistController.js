import * as journalistRepository from '../repositories/sqlArticleRepository.js';

export async function getJournalists(req, res) {
    try {
        const journalists = await journalistRepository.getJournalists();
        res.json(journalists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getJournalistArticles(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: "Journalist ID is required" });
        }
        const articles = await  journalistRepository.getJournalistArticles(req.params.id);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
