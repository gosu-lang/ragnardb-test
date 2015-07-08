CREATE TABLE CONTACTS (
    id bigint auto_increment,
    user_id int,
    first_name nchar(50),
    last_name nchar(50),
    age int,
    state_id int
);

CREATE TABLE STATES (
    id int,
    name varchar(255)
);
