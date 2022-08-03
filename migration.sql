DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS journal;

CREATE TABLE users (
    username TEXT,
    email TEXT,
    userID INTEGER PRIMARY KEY
);

CREATE TABLE journal (
    quote TEXT,
    userentry TEXT,
    userID INTEGER,
    JournalID SERIAL PRIMARY KEY

);