CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('JK Rowling', 'harrypotter.com', 'Harry Potter and The Order of the Pheonix', 20);
INSERT INTO blogs (author, url, title, likes) VALUES ('JK Rowling', 'harrypotter.com', 'Harry Potter and The Goblet of Fire', 19);