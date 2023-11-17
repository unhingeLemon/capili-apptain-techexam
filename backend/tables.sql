CREATE TABLE IF NOT EXISTS users(
    _id SERIAL PRIMARY KEY,
    user_id VARCHAR(255)  UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    profile_url VARCHAR(255) NOT NULL DEFAULT 'https://sendbird.com/main/img/profiles/profile_05_512px.png',
    is_deleted boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS channel(
    _id SERIAL PRIMARY KEY,
    channel_url VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    chatmate VARCHAR(255) NOT NULL,
    isdeleted boolean DEFAULT false,
    num_messages INT NOT NULL DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    channel_name VARCHAR(255) NOT NULL
)