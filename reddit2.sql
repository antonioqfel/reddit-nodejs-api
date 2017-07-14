-- To be add later

-- Table votes
CREATE TABLE votes (
    userId INT,
    postId INT,
    voteDirection TINYINT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (userId, postId), -- this is called a composite key because it spans multiple columns. the combination userId/postId
                                  -- must be unique and uniquely identifies each row of this table.
    KEY userId (userId), -- this is required for the foreign key
    KEY postId (postId), -- this is required for the foreign key
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE, -- CASCADE means also delete the votes when a user is deleted
    FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE -- CASCADE means also delete the votes when a post is deleted
);

-- Tables comments
CREATE TABLE comments (
    id INT AUTO_INCREMENT,
    userId INT,
    postId INT,
    parentId INT,
    text VARCHAR(10000),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (userId) REFERENCES posts (id) ON DELETE SET NULL,
    FOREIGN KEY (parentId) REFERENCES comments (id)
);

-- Let's create some subreddits
INSERT INTO subreddits (name, description, createdAt, updatedAt)
VALUES ('music', 'talk about the bands and music you like', '2015-05-05', '2015-05-06'), ('cinema', 'share your thoughts on the cinematographic world', '2015-05-05', '2015-05-06'),
('videogames', 'The video games you like the most', '2015-05-05', '2015-05-06'), ('sex', 'it is hot in here, be careful!', '2015-05-05', '2015-05-06');