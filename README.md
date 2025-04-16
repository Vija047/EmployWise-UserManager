# EmployWise Assignment

## Overview

This is a React application that integrates with the [Reqres API](https://reqres.in/) to perform user management functions. The application includes authentication, user listing, editing, and deletion functionalities.

## Technologies Used

- **Vite** (for fast build & development)
- **React** (frontend framework)
- **React Router** (for navigation)
- **Tailwind CSS** (for styling)
- **Fetch API** (for making API requests)
- **Local Storage** (for authentication persistence)

## Features

### Level 1: Authentication Screen

- Users can log in using credentials.
- Uses `POST /api/login` endpoint.
- On successful login, the token is stored, and the user is redirected to the Users List page.

### Level 2: User List

- Fetches user data from `GET /api/users?page=1`.
- Displays user details in a table or grid format.
- Implements pagination for user navigation.
- Supports client-side search and filtering.

### Level 3: Edit & Delete Users

- Users can edit their first name, last name, and email using `PUT /api/users/{id}`.
- Users can be deleted using `DELETE /api/users/{id}`.
- Displays success/error messages based on API responses.

## Project Structure

```
EmployWise-Assignment/
│── public/  
│── src/  
│   ├── components/  
│   │   ├── UserCard.jsx  
│   │   ├── Pagination.jsx  
│   ├── pages/  
│   │   ├── Login.jsx  
│   │   ├── UsersList.jsx  
│   │   ├── EditUser.jsx  
│   ├── services/  
│   │   ├── api.js  
│   ├── context/  
│   │   ├── AuthContext.jsx  
│   ├── App.js  
│   ├── routes.js  
│   ├── index.js  
│   ├── styles.css  
│── package.json  
│── README.md  
```

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/[repo-name].git
   ```
2. Navigate to the project folder:
   ```bash
   cd EmployWise-Assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Login Page**: Enter credentials (`eve.holt@reqres.in` / `cityslicka`) and log in.
- **Users List**: Browse users with pagination, search, and filtering.
- **Edit User**: Click on "Edit" to update user details.
- **Delete User**: Click on "Delete" to remove a user.
- **Logout**: Click on "Logout" to return to the login page.

## Deployment

To deploy the project:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

**Live Demo:** [deployment-link]

## Bonus Features

✅ Client-side search and filtering\
✅ React Router navigation\
✅ Hosted on Vercel (**[deployment-link]**)

## License

This project is licensed under the MIT License.

## GitHub Repository

[GitHub Repo](https://github.com/Vija047/EmployWise-UserManager)

[Demo](https://employ-wise-user-manager-nfif.vercel.app/)
