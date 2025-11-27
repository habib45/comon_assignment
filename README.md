## Environment Variables

Create a `.env.local` file and set the following value before running any commands:

```
JWT_SECRET=replace-with-a-long-random-string
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost://localhost:3000) with your browser to see the result.

---

## How to Run This Project

To get started with the project, follow these steps:

1.  **Install Dependencies**: Make sure you have Node.js and npm (or yarn, pnpm, bun) installed. Then, install the project dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

2.  **Set up Environment Variables**: Create a `.env.local` file in the root of the project and add your `JWT_SECRET`. This is crucial for authentication.

    ```
    JWT_SECRET=your_secret_key_here # Replace with a long, random string
    ```

3.  **Run in Development Mode**: To start the development server with hot-reloading:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

4.  **Build for Production**: To build the application for production deployment:

    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    # or
    bun build
    ```

5.  **Start Production Server**: To run the application in production mode after building:
    ```bash
    npm run start
    # or
    yarn start
    # or
    pnpm start
    # or
    bun start
    ```

## Account Login Information (Mock Data)

For testing purposes, you can use the following mock credentials to log in:

- **Username**: `rebecka`
- **Password**: `secret`

_Note: These are mock credentials for development and testing. In a real application, user management would involve a database and secure authentication processes._

## Screenshots

To provide a visual guide of the application, please add screenshots here. You can replace this section with actual images of the application's key features and user flows.

### How to Add Screenshots:

1.  Take screenshots of the relevant parts of the application (e.g., login page, game lobby, etc.).
2.  Save the images in a suitable format (e.g., `.png`, `.jpg`) within the `public/images/` directory. For example: `public/images/screenshot_login.png`.
3.  Reference the images in this `README.md` file using Markdown image syntax:

    ```markdown
    ![Login Page Screenshot](./public/images/screenshot_login.png)
    ```

    Replace `screenshot_login.png` with the actual filename and "Login Page Screenshot" with a descriptive alt text.

    ```markdown
    ![Dashboard Page Screenshot](./public/images/dashboard_1.png)
    ```

````markdown
![Dashboard Page Screenshot](./public/images/dashboard_2.png)

```
---
```
````
