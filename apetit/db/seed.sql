DROP TABLE  IF EXISTS restaurants CASCADE; 
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
id BIGSERIAL PRIMARY KEY,
name VARCHAR NOT NULL, 
email VARCHAR NOT NULL UNIQUE,
location VARCHAR NOT NULL,
password_digest VARCHAR NOT NULL,
token VARCHAR NOT NULL

-- add token when doing auth
);


CREATE TABLE restaurants(
id BIGSERIAL PRIMARY KEY, 
user_id INT REFERENCES users(id),
name VARCHAR NOT NULL,
location VARCHAR(255) NOT NULL,  
latitude FLOAT NOT NULL,
longitude FLOAT NOT NULL,
averagecost VARCHAR NOT NULL, 
pricerange INT  NOT NULL, 
thunmpic VARCHAR(255),
cuisines VARCHAR (255)NOT NULL,
ratingcolor VARCHAR NOT NULL,
aggregaterating VARCHAR NOT NULL
);


INSERT INTO users(name, email, location, password_digest, token)VALUES
('bianca', 
'bianca@gmail.com', 
'new york', 
'puky', 
'daasddssd'
);

INSERT INTO restaurants (name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating)VALUES 
(
	'el restaurante','el sitio',
	 3000.000, 
	 -50.0000,
	  4, 3, 
	  'https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg' ,
	   'mexican',
	   '#hheke5',
	   'not bad'
	   ),
(
	'el restaurante','el sitio',
	 3000.000, 
	 -50.0000,
	  4, 3, 
	  'https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg' ,
	   'mexican',
	   '#hheke5',
	   'not bad'
	   ),
(
	'el restaurante','el sitio',
	 3000.000, 
	 -50.0000,
	  4, 3, 
	  'https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg' ,
	   'mexican',
	   '#hheke5',
	   'not bad'
	   ),
(
	'el restaurante','el sitio',
	 3000.000, 
	 -50.0000,
	  4, 3, 
	  'https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg' ,
	   'mexican',
	   '#hheke5',
	   'not bad'
	   );