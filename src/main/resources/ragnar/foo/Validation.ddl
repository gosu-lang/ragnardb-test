

CREATE TABLE IF NOT EXISTS STATES (
    id int,
    name varchar(255)
);


CREATE TABLE IF NOT EXISTS CONTACTS (
    id bigint auto_increment,
    user_id  int default 1,
    company_id int default 1,
    first_name nchar(50),
    last_name nchar(50),
    age int,
    state_id int
);


CREATE TABLE IF NOT EXISTS COMPANY (
    id bigint auto_increment,
    name nchar(50)
);