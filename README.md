# Asteroid Application

## Tech Stack
- Frontend: React, Typescript
- Backend: Ruby on Rails

## Features
The app should have the following functionalities:
- Display a list of asteroids
- Search by a range of dates
- See the detail of the asteroids by clicking on one of the items
- Sort the asteroids by name

## Optional
- Add them to favourite
- Show a list of favourite
- Display details of favourite asteroids by click on the items form the list

We expect an app with the implementation of a backend and a frontend side.

Use the following API:

- <https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY>


## Postgresql Tech Challenge
Suppose you have a database with three tables: "users", "orders", and "products". The "users" table contains columns id, name, and email. The "orders" table contains columns id, user_id, product_id, quantity, and created_at. The "products" table contains columns id, name, price, and category.

Write a single SQL query that returns a list of all users who have made at least 3 orders in the "Electronics" category and have spent more than $1000 on those orders, sorted by the total amount they have spent in descending order. The output should include the user's name, email, and the total amount they have spent on "Electronics" orders.



```
SELECT u.name, u.email, SUM(p.price * o.quantity) AS total_spent
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN products p ON p.id = o.product_id
WHERE p.category = 'Electronics'
GROUP BY u.id
HAVING total_spent > 1000 AND COUNT(o.id) >= 3
ORDER BY total_spent DESC;
```
