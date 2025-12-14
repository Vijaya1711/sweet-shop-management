 Steps to Run Sweet Shop Management System

Step 1: Install Required Software
Install the following:
* Node.js (v18 or above)
* PostgreSQL
* pgAdmin
* VS Code

Step 2: Create Database
1. Open pgAdmin
2. Create a new database
3. Database name:
```
sweetshop
```

Step 3: Backend Setup
1. Open VS Code
2. Open the project folder
3. Open terminal and run:
```
cd backend
```
4. Install backend dependencies:
```
npm install
```
5. Create `.env` file inside backend folder and add:
```
PORT=4000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=sweetshop
JWT_SECRET=secret
JWT_EXPIRES_IN=7d
```
6. Start backend server:
```
npm run start
```
7. Backend runs successfully if it shows:
```
Server running on http://localhost:4000
```


Step 4: Frontend Setup
1. Open new terminal in VS Code
2. Run:
```
cd frontend
```
3. Install frontend dependencies:
```
npm install
```
4. Start frontend server:
```
npm run dev
```
5. Open browser and go to:
```
http://localhost:5173
```

Step 5: User Registration
1. Open the website
2. Click Register
3. Enter name, email, password
4. Click Register
5. User account will be created



Step 6: User Login
1. Click Login
2. Enter registered email and password
3. Click Login
4. User will be logged in successfully

Step 7: View Sweets
1. After login, sweets list is displayed
2. Each sweet shows:
   * Name
   * Category
   * Price
   * Quantity


Step 8: Search Sweet
1. Enter sweet name in search box
2. Click Search
3. Matching sweets are displayed
4. Click Reset to show all sweets again


Step 9: Purchase Sweet
1. Click Purchase button
2. Quantity is reduced after purchase
3. Sold-out sweets are disabled



Step 10: Stop Servers
To stop servers:
Press CTRL + Cin terminal


 The output will looks like:
 <img width="1621" height="920" alt="Screenshot 2025-12-14 181225" src="https://github.com/user-attachments/assets/ebbd5060-8245-4ae5-a626-6d737fece8ab" />
 <img width="1920" height="1200" alt="Screenshot 2025-12-14 181237" src="https://github.com/user-attachments/assets/020f6bcd-e88c-4947-a3ee-6f11ea44a67c" />
 <img width="1920" height="1200" alt="Screenshot 2025-12-14 181350" src="https://github.com/user-attachments/assets/7f089c2e-6cf3-4bb3-bda8-b059282858c8" />



 


