# Fligno - RecipeEZ

Deployed at https://flignorecipeez.onrender.com

## Introduction

This is a web application that consumes data from the Edamam API to provide users 
with access to a nutrition analysis, food database, and recipe search functionalities.

## Features

1. **Signup and Login Page:** Users can sign up and log in to the application to access other features. The application will have its own backend to store user information. OAuth or JSON Web Tokens (JWT) can be used for authentication.

2. **Home Page:** The home page will display recipe data obtained from the /api/recipes/v2 endpoint. The displayed data should be paginated for better user experience.

3. **Recipe Search Functionality:** Users will be able to search for recipes using the application. The search functionality will leverage the capabilities provided by the Edamam API.

4. **Recipe Details Page:** Users can view additional details of a specific recipe on a dedicated page. This page will provide comprehensive information about the selected recipe.

5. **Favorite Functionality:** Users can mark recipes as favorites, and the application will store this information in the database. Users should also have the ability to unfavorite recipes if desired.

6. **Reusable Components:** The application should utilize reusable components to enhance modularity and code maintainability.

7. **Logout Functionality:** Users can log out of the application when they are done using it.

8. **Clean and Organized Code:** The codebase should follow best practices and be well-organized and maintainable.

## Getting Started

To get started with the Recipe Web Application, follow the instructions below:

1. Clone the repository: git clone <repository_url>
2. Install dependencies: npm install
3. Set up the backend: [provide instructions on setting up the backend, including API credentials and database setup]
4. Start the development server: npm start
5. Open the application in your browser: http://localhost:3000

## Technologies Used

The Recipe Web Application is built using the following technologies:

### Frontend:
HTML
CSS
JavaScript
React.js
React Router
Bootstrap

### Backend:
Node.js
Express.js
MongoDB
