CREATE DATABASE socialdb;
CREATE TABLE userdb (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
);
CREATE TABLE postsdb (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255),
    body VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userdb(id)
);
CREATE TABLE commentsdb(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    post_id INT,
    user__id INT,
    body VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES userdb(id),
    FOREIGN KEY (post_id) REFERENCES postdb(id)
);