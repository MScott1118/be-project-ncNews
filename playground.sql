\c nc_news;
SELECT * FROM topics;
SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM comments ORDER BY article_id;
SELECT
    a.article_id, 
    a.author, 
    a.title, 
    a.topic, 
    a.created_at, 
    a.votes, 
    a.article_img_url, 
    COUNT(c.article_id = a.article_id) AS comment_count
    FROM articles AS a
      INNER JOIN comments AS c ON a.article_id = c.article_id 
    WHERE a.article_id = 1
    GROUP BY a.article_id;