-- -----------------------------------------------------
-- Schema reddit
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS reddit ;

-- -----------------------------------------------------
-- Schema reddit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS reddit DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE reddit ;

DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS posts ;


-- This creates the users table. The username field is constrained to unique
-- values only, by using a UNIQUE KEY on that column
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL, -- why 60??? ask me :)
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY username (username)
);

-- This creates the posts table. The userId column references the id column of
-- users. If a user is deleted, the corresponding posts' userIds will be set NULL.
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT,
    title VARCHAR(300) DEFAULT NULL,
    url VARCHAR(2000) DEFAULT NULL,
    userId INT DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY userId (userId), -- why did we add this here? ask me :)
    CONSTRAINT validUser FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL
);

-- This creates the subreddits table. The id is the primary key
CREATE TABLE IF NOT EXISTS subreddits (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(200), -- optional
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

-- Creates a unique index on table subreddits. Duplicate values are not allowed
CREATE UNIQUE INDEX indexNameSubreddit
ON subreddits (name);

-- Step 2:
ALTER TABLE posts
    ADD subredditId INT NOT NULL,
    ADD CONSTRAINT validID FOREIGN KEY(subredditId) REFERENCES subreddits(id);