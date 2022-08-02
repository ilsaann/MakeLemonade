DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS journal;

CREATE TABLE user (
    username TEXT,
    email TEXT,
    userID INTEGER PRIMARY KEY
);

CREATE TABLE journal (
    quote TEXT,
    userentry TEXT,
    userID INTEGER,
    JournalID SERIAL PRIMARY KEY

)