**BirdieTask API**

A full stack task manager with AI-powered task suggestions, built with:

-**Node.js + Express** for the backend.

-**MongoDB (with Mongoose)** for the database.

-**React** for the frontend.

-**JWT Authentication** for security and authorization.

-**Socket.io** for client/server communication.



**Features**:
- User signup and login with JWT authentication.
- Get and update user profile and preferences
- Change password securely
- CRUD Operations: Create, read, update, and delete tasks.
- AI-Powered task suggestions with priority and due date.

**Live Deployment**:
- **Frontend:** https://newbirdfinal-frontend.onrender.com
- **Backend:** https://newbirdfinal-backend.onrender.com

**API Endpoints**:
- POST /signup
- POST /login
- GET /profile
- PUT /preferences
- PUT /change-password


**AI Route (/api/ai)**:
- POST /suggest

**Task Routes (/api/tasks)**:
- GET /
- POST /
- PUT /:id
- DELETE /:id

  

**Run in Postman**:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/41590986-165d859e-4a8c-42d3-a601-67d604a42f06?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D41590986-165d859e-4a8c-42d3-a601-67d604a42f06%26entityType%3Dcollection%26workspaceId%3D9476d763-06b0-4dad-808c-aa2fffdc9776#?env%5BBirdieBot%5D=W10=)


**Setup and Install**:
```
1. Clone the repository:
    bash
   git clone https://github.com/yourusername/birdietask.git
   cd birdietask

2. Install backend dependencies:
  cd backend
  npm install

3. Add .env:
  JWT_SECRET=addsecretcode
  MONGODB_URI=add mongo uri

4. Start backend
  npm start

5. Install frontend dependencies:
  cd ../frontend
  npm install

6. Start the frontend:
  npm start 
