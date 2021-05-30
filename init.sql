CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  alias VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  balance NUMERIC NOT NULL
);

INSERT INTO users (alias, address, balance)
VALUES ('Sinp', '2NEdnJnQFoHwN3v3bBfi89wK2gpHoXYxnCi', '0.000009544431767');
