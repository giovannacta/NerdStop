# NerdStop — Full-Stack E-commerce (In Progress)

⚠️ **Project Status**
This project is actively in development.

The core backend architecture, authentication flow, product management, and cart logic are implemented. Payment processing (Stripe) and production deployment are scoped for later stages.

---

## Overview

NerdStop is a full-stack e-commerce project focused on building a clean, scalable backend architecture and a modern frontend for a gaming and geek products platform.

The main goal of this project is to practice real-world backend-driven design, REST API development, authentication, and frontend–backend integration using a modern JavaScript stack.

This project prioritizes **architecture, data flow, and code organization** over feature completeness.

---

## Current Features

### User Features

* User registration and login with JWT authentication
* Browse and fetch product listings
* View detailed product pages
* Add and remove products from a user-specific cart
* Create orders from the cart (without payment processing)

### Admin Features

* Admin-only access to product management endpoints
* Create, update, and delete products

---

## Planned Features

* Stripe payment integration
* Frontend feature completion
* Deployment to a cloud platform
* Improved error handling and validation

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### Frontend

* React
* React Router
* Tailwind CSS

### Tools

* Git & GitHub

---

## API Contract

Below is the **currently implemented API contract** for the backend.

### User Endpoints

| Method | Path                              | Description               | Authorization |
| ------ | --------------------------------- | ------------------------- | ------------- |
| POST   | /api/auth/register                | Create a new user         | ❌             |
| POST   | /api/auth/login                   | User login                | ❌             |
| GET    | /api/products                     | Get all products          | ❌             |
| GET    | /api/products/:id                 | Get product details       | ❌             |
| GET    | /api/cart                         | Get logged-in user's cart | ✅             |
| POST   | /api/cart/add                     | Add product to cart       | ✅             |
| DELETE | /api/cart/remove/:product_id      | Remove product from cart  | ✅             |
| GET    | /api/orders                       | Get user orders           | ✅             |
| POST   | /api/orders                       | Create order from cart    | ✅             |


### Admin Endpoints

| Method | Path                            | Description      | Authorization |
| ------ | ------------------------------- | ---------------- | ------------- |
| GET    | /api/admin/products             | Get all products | ✅             |
| POST   | /api/admin/products             | Add new product  | ✅             |
| PUT    | /api/admin/products/:product_id | Update product   | ✅             |
| DELETE | /api/admin/products/:product_id | Delete product   | ✅             |

---

## Architecture & Diagrams

* High-level architecture diagram: *[View Diagram](https://lucid.app/lucidchart/b13d5c49-e829-4a05-a3c1-56975dd33176/edit?viewport_loc=-1227%2C-367%2C3580%2C1721%2C.Q4MUjXso07N&invitationId=inv_1f2f81b5-b638-42e0-a8bb-ce62f14c3ed4)*
* ER diagram: *[View Diagram](https://lucid.app/lucidchart/2516964d-9406-4b50-829e-2062abe0183f/edit?viewport_loc=-424%2C-333%2C2147%2C1032%2C0_0&invitationId=inv_6cb0c0ca-e2c5-42a2-bcc5-9f2e271609b7)*

---

## Notes

This project is a work in progress and is continuously evolving as new features and improvements are added. The focus is on building a solid technical foundation rather than delivering a fully production-ready application.




