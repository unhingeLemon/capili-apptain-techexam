CREATE TABLE IF NOT EXISTS users(
    _id SERIAL PRIMARY KEY,
    user_id VARCHAR(255)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    profile_url VARCHAR(255) NOT NULL DEFAULT 'https://sendbird.com/main/img/profiles/profile_05_512px.png',
    is_deleted boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
)