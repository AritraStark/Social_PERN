CREATE DATABASE socialdb;
CREATE TABLE usersdb (
    id BIGSERIAL UNIQUE,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE postsdb (
    id BIGSERIAL UNIQUE,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES usersdb(id)
);
CREATE TABLE commentsdb(
    id BIGSERIAL UNIQUE,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    user_name VARCHAR NOT NULL,
    body VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES usersdb(id),
    FOREIGN KEY (post_id) REFERENCES postsdb(id)
);
CREATE TABLE followersdb(
    id BIGSERIAL UNIQUE,
    user_id_primary INT NOT NULL,
    user_id_secondary INT NOT NULL
);
CREATE TABLE likesdb(
    id BIGSERIAL UNIQUE,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usersdb(id),
    FOREIGN KEY (post_id) REFERENCES postsdb(id)
);