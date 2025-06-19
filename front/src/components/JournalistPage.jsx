import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArticleCard from './ArticleList'
import { getArticleById } from '../services/api'; // Adjust the import path as necessary


const JournalistArticles = () => {
    const [articles, setArticles] = useState([]);
    const [journalist, setJournalist] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchJournalistArticles = async () => {
            try {
                const data = await getArticleById(id);
                setArticles(data);
                if (data.length > 0) {
                    setJournalist(data[0].journalist_name || data[0].journalist || "");
                }
            } catch (error) {
                console.error('Error fetching journalist articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournalistArticles();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="journalist-articles">
            <h2>Articles by {articles.journalist}</h2>
            <div className="articles-grid">
                {articles.map(article => (
                    <ArticleCard 
                    key={article.id}
                    article={article} 
                    onView={(id) => {Navigate(`/articles/${id}`)}}
                    onEdit={(id) => {Navigate(`/articles/${id}/edit`)}}
                    onDelete={async (id) => {
                        setLoading(true);
                        setError("");
                        try{
                            await fetch(`http://localhost:4000/api/articles/${id}`, {
                                method: 'DELETE',
                            });
                            setArticles(articles.filter(a => a.id !== id));
                            setLoading(false);
                        }catch (error) {
                            setError((error.message || "") + `Failed to delete article.`);    
                            setLoading(false);
                        }
                    }}
                    />
                ))}
            </div>
        </div>
    );
};

export default JournalistArticles;