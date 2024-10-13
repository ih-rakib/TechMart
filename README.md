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

### Home Page
![Home Page](https://i.ibb.co.com/cF8r256/homepage.png)

### Shop Page
![Shop Page](https://i.ibb.co.com/QCsd8r2/shoppage.png)

### Cart Page
![Cart Page](https://i.ibb.co.com/Jm3Y6XN/cartpage.png)

### Favouritepage
![Favourite Page](https://i.ibb.co.com/0cKq4yq/favouritepage.png)

### Login Page
![Login Page](https://i.ibb.co.com/3ygwLkc/loginpage.png)

### Register Page
![Register Page](https://i.ibb.co.com/Gxr714c/registerpage.png)

### User Dashboard
![User Dashboard](https://i.ibb.co.com/wKtR24D/useroptions.png)

### Admin Options
![Admin Dashboard](https://i.ibb.co.com/dL7FjYf/admn-options.png)

### Admin Dashboard
![Admin Dashboard](https://i.ibb.co.com/n0pXGHT/admin.png)

### See All Products
![See All Products](https://i.ibb.co.com/pnDFQd2/all-products.png)

### Create New Product
![Create New Product](https://i.ibb.co.com/jzNH7ZL/create-product.png)

### Manage Category
![Manage Category](https://i.ibb.co.com/LN8fZ56/manage-category.png)

### Manage Users
![Manage Users](https://i.ibb.co.com/T1XcnHg/manage-users.png)
