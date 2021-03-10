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
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userdb(id)
);
CREATE TABLE commentsdb(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    post_id INT NOT NULL,
    user__id INT NOT NULL,
    body VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userdb(id),
    FOREIGN KEY (post_id) REFERENCES postdb(id)
);
CREATE TABLE followersdb(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id_main INT NOT NULL,
    user_id_sub INT NOT NULL,
)