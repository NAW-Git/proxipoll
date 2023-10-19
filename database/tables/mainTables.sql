SET search_path TO proxi_poll_main;
DROP SCHEMA IF EXISTS proxi_poll_main CASCADE;
CREATE SCHEMA proxi_poll_main;
SET search_path TO proxi_poll_main;


CREATE TABLE accounts (
    account_id serial PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_salt BYTEA NOT NULL,
    password_hash BYTEA NOT NULL,
    creation_datetime TIMESTAMP NOT NULL,
    profile_picture BYTEA
);


CREATE TABLE polls (
    poll_ID serial PRIMARY KEY,
    account_id integer REFERENCES accounts (account_id) ON DELETE CASCADE,
    latitude numeric,
    longitude numeric,
    active boolean,
    type character varying,
    creation_datetime timestamp,
    duration_datetime timestamp,
    question text, 
    options text[]
);


CREATE TABLE votes (
    vote_id serial PRIMARY KEY,
    poll_id integer REFERENCES polls (poll_id) ON DELETE CASCADE, 
    account_id integer REFERENCES accounts (account_id) ON DELETE CASCADE, 
    vote integer, 
    response text
);


CREATE TABLE test ( dummy_number numeric );
INSERT INTO test ( dummy_number ) VALUES ( 13 );

