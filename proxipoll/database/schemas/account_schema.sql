DROP SCHEMA IF EXISTS proxipoll_accounts CASCADE;


CREATE SCHEMA proxipoll_accounts;


SET search_path TO proxipoll_accounts;


CREATE TABLE accounts (
    account_id serial PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_salt BYTEA NOT NULL,
    password_hash BYTEA NOT NULL,
    creation_datetime TIMESTAMP NOT NULL,
    profile_picture BYTEA
);


CREATE TABLE test ( dummy_number numeric );


INSERT INTO test ( dummy_number ) VALUES ( 13 );

