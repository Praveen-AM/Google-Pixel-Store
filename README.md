# Google Pixel Store Clone

A full-stack e-commerce web application inspired by the official Google Pixel Store. Built using React.js for the frontend, Spring Boot for the backend, and MySQL for the database. The application supports user authentication, product browsing, cart and wishlist management and order placement

## Features

- User registration and login
- Product listing with sort and filter
- Add to cart and wishlist
- Place orders
- File upload: photo, resume, audio
- Display user data with uploaded files
- Mobile responsive layout
- MySQL-backed data storage

## Tech Stack

| Frontend | Backend     | Database | Tools         |
|----------|-------------|----------|---------------|
| React.js | Spring Boot | MySQL    | VS Code, Postman |

## Pages and Components

- Home Page – Lists all products and offers
- Login / Register Page – User authentication
- Product Cards – Wishlist, Add to Cart, Shop Now
- Cart Page – View and manage cart items
- Wishlist Page – View and manage saved items
- Orders Page – View previously ordered products
- Admin or Upload Page – Upload files and store details

## Folder Structure
google-pixel-store/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── context/
├── backend/ # Java Spring Boot backend
│ ├── src/
│ │ └── main/
│ │ ├── java/com/yourname/pixelstore/
│ │ │ ├── controller/
│ │ │ ├── service/
│ │ │ ├── repository/
│ │ │ └── model/
│ │ └── resources/
│ │ ├── application.properties
│ │ └── static/
├
└── README.md


Open the backend/ folder in Eclipse.


Configure your application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/googlepixel
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
server.port=8080