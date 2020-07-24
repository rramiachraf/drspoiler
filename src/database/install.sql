CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(72) NOT NULL,
    join_date TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS main.communities(
    community_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    work VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    poster VARCHAR(1500),
    created_by INTEGER REFERENCES main.users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS main.posts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    body TEXT,
    author INTEGER NOT NULL REFERENCES main.users(user_id) ON DELETE CASCADE,
    community INTEGER NOT NULL REFERENCES main.communities(community_id) ON DELETE CASCADE,
    url_slug VARCHAR(1500) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);