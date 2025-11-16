## Assumptions

- The application will use Next.js 16 with the App Router for frontend pages.
- Backend API will be built using Node.js with Express and MongoDB (via Mongoose).
- MongoDB Cluster Free M0 will be used.
- Quizzes consist of a title and multiple questions with types: MCQ, True/False, and Text answer.
- No authentication or user management is required initially (open admin and public pages).
- The application focuses on core quiz management: create quizzes, take quizzes, and view results immediately.
- Frontend styling will be implemented using Tailwind CSS for a clean, modern UI.
- API design follows REST principles with endpoints to create, read, and list quizzes.
- Data validation and basic error handling will be included.
- The system will run with minimal external dependencies to keep it lightweight and maintainable.

## Scope

Admin Panel:

- Create quizzes with quiz title and an array of questions.
- Support question types: MCQ, True/False, Text.
- View a list of existing quizzes.

## Public Interface:

- List available quizzes for users to select.
- Display selected quiz questions dynamically.
- Collect user answers and calculate score below immediately on submission.
- Show detailed results including correct answers.

## Backend:

- Mongoose models for quizzes and questions.
- Express API routes for CRUD operations:
- GET /api/v1/quizzes — list quizzes.
- GET /api/v1/quizzes/:id — get quiz details with questions.
- POST /api/v1/quizzes — create new quiz.


## No requirements for:

- User authentication, roles, or permissions.
- Persistent user answer storage or quiz history.
- Quiz editing or deletion features (optional future enhancements).
- Real-time collaboration or multiplayer modes.

## Approach

## Frontend:

- Build static and dynamic pages using Next.js routing.
- Use React state and hooks for form inputs and quiz state.
- Implement reusable components with Tailwind CSS for consistent styling.
- Fetch quiz data and submit answers via REST API.
- Handle results display with score calculation on the client.

## Backend:

- Define MongoDB schemas with Mongoose for quizzes and questions.
- Create REST API controllers for quiz operations.
- Use Express.js to define routes and handle requests.
- Connect to MongoDB with proper environment configuration.
- Include error handling and input validation on API.

## Integration:

- Connect Next.js frontend to Node.js backend API.
- Test end-to-end flows:
- Admin creating quizzes.
- Public users listing and taking quizzes.
- Displaying real-time score and answers.
- Optimize for usability and performance.

## Deployment on Vercel (frontend) and a Node.js hosting platform like Heroku or DigitalOcean with MongoDB Atlas.