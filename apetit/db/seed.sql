DROP TABLE  IF EXISTS restaurants CASCADE; 
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY, 
email VARCHAR NOT NULL UNIQUE,
location VARCHAR NOT NULL,
password VARCHAR NOT NULL
)


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




INSERT INTO restaurants (name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating)VALUES 
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