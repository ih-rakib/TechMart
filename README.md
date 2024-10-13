# TechMart - MERN E-commerce Platform

> A full-featured e-commerce platform built with the MERN stack, offering tech-related products. This website includes both **user** and **admin** dashboards with powerful features such as image upload, authentication, user management, creating product, category, category management, updating users, updating products, order management and many more.

## About the Project
TechMart is an e-commerce platform developed using the **MERN stack** (MongoDB, Express, React, Node.js) for seamless performance and scalability. The platform features a **user-friendly UI** built with **Tailwind CSS**, along with a fully functional **Admin Dashboard** and a **User Dashboard**. It provides robust **authentication**, **authorization**, and **JWT** token management for security. Additionally, users can **upload images** for products using **Multer**.

## Features

### User Dashboard
- **Homepage**: Browse the latest tech products.
- **Shop Page**: View all available products.
- **Add to Cart**: Add products to your cart.
- **Favorites**: Save products to your favorite list.
- **Login/Logout**: Secure login and logout system.
- **Profile**: Manage personal account details.

### Admin Dashboard
- **Dashboard**: Overview of all site statistics and activities.
- **Manage Categories**: Create, update, or delete product categories.
- **Manage Orders**: Track and manage customer orders.
- **Update Profile**: Admin can update their account information.
- **Manage Users**: View and manage user accounts.
- **Create New Product**: Add new tech-related products with image uploads.

### Security Features
- **Authentication**: Secured via **JWT** (JSON Web Token).
- **Authorization**: Role-based access for admins and users.
  
## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Image Upload**: Multer

## API Routes

### Users
- **Create User**: `POST /api/users`
- **Login User**: `POST /api/users/auth`
- **Logout User**: `POST /api/users/logout`
- **Get All Users**: `GET /api/users`
- **Get Current User Profile**: `GET /api/users/profile`
- **Update Current User Profile**: `PUT /api/users/profile`

### Admin
- **Get Specific User**: `GET /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`
- **Update User**: `PUT /api/users/:id`

### Categories
- **Create Category**: `POST /api/category`
- **Update Category**: `PUT /api/category/:id`
- **Delete Category**: `DELETE /api/category/:id`
- **Get Category List**: `GET /api/category/categories`
- **Get Category By ID**: `GET /api/category/:id`

### Products
- **Create Product**: `POST /api/products`
- **Update Product**: `PUT /api/products/:id`
- **Delete Product**: `DELETE /api/products/:id`
- **Get Products**: `GET /api/products`
- **Get Product By ID**: `GET /api/products/:id`
- **Get All Products**: `GET /api/products/allProducts`
- **Add Product Review**: `POST /api/products/:id/reviews`
- **Fetch Top Products**: `GET /api/products/top`
- **Fetch New Products**: `GET /api/products/new`

### Orders
- **Create Order**: `POST /api/orders`
- **Get All Orders**: `GET /api/orders`
- **Get User Orders**: `GET /api/orders/mine`
- **Get Total Orders**: `GET /api/orders/total-orders`
- **Get Total Sales**: `GET /api/orders/total-sales`
- **Get Total Sales By Date**: `GET /api/orders/total-sales-by-date`
- **Find Order By ID**: `GET /api/orders/:id`
- **Deliver Order**: `PUT /api/orders/:id/delivered`

### Upload
- **Upload Image**: `POST /api/upload`

## Screenshots

> Below are some screenshots of the project. 

### Homepage
![Homepage](http://localhost:5173/)

