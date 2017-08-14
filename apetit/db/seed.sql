DROP TABLE  IF EXISTS restaurants CASCADE; 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE  IF EXISTS voted_restaurants CASCADE; 

CREATE TABLE users(
id BIGSERIAL PRIMARY KEY,
name VARCHAR NOT NULL, 
email VARCHAR NOT NULL UNIQUE,
location VARCHAR NOT NULL,
password_digest VARCHAR NOT NULL,
token VARCHAR NOT NULL

-- add token when doing auth
);

-- restaurant table for user to save info from api
CREATE TABLE restaurants(
id BIGSERIAL PRIMARY KEY, 
user_id INT REFERENCES users(id),
restaurant_id INT UNIQUE, 
name VARCHAR NOT NULL,
location VARCHAR NOT NULL,  
latitude FLOAT NOT NULL,
longitude FLOAT NOT NULL,
averagecost VARCHAR NOT NULL, 
pricerange INT  NOT NULL, 
thunmpic VARCHAR(255),
cuisines VARCHAR (255)NOT NULL,
ratingcolor VARCHAR NOT NULL,
aggregaterating VARCHAR NOT NULL
);

-- table to save voted restaurants 

CREATE TABLE voted_restaurants (
	id BIGSERIAL PRIMARY KEY, 
	-- one user can vote for many restaurants
	user_id INT references users(id) ON DELETE CASCADE, 
	-- many votes belong to one - that why it belongs to restaurant
	restaurant_id INT references restaurants(restaurant_id), 
	-- this one is tro keep track of the number of votes by many users
	uservoted VARCHAR 
); 

