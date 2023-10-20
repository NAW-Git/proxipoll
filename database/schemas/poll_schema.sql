DROP SCHEMA IF EXISTS proxipoll_polls CASCADE;


CREATE SCHEMA proxipoll_polls;


SET search_path TO proxipoll_polls;


CREATE TABLE polls (
    poll_ID serial PRIMARY KEY,
    account_id integer REFERENCES proxipoll_accounts.accounts (account_id) ON DELETE CASCADE,
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
    account_id integer REFERENCES proxipoll_accounts.accounts (account_id) ON DELETE CASCADE, 
    vote integer, 
    response text
);

