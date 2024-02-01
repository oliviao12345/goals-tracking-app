# Goals Tracking App

This is a goals tracking application that allows users to track and manage their goals. It consists of an Angular frontend, a Java Spring backend, and MongoDB as the backend database.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager) for running the Angular frontend.
- Java Development Kit (JDK) and Maven for running the Java Spring backend.
- MongoDB for the backend database.

## Frontend Setup

To start the Angular frontend, follow these steps:

1. Open a terminal and navigate to the frontend directory: `cd frontend`

2. Install the required dependencies by running: `npm install`

3. Start the development server by running: `ng serve`

4. Open your browser and visit `http://localhost:4200` to access the application.

## Backend Setup

To start the Java Spring backend and connect to MongoDB, follow these steps:

1. Make sure MongoDB is running on your system. You can start MongoDB by running the appropriate command for your operating system.

2. Open a terminal and navigate to the backend directory: `cd backend`

3. Build the project using Maven by running: `mvn clean install`

4. Start the backend server by running: `java -jar target/backend2-0.0.1-SNAPSHOT.jar`

5. The backend server will be running on `http://localhost:7295`.

## Database Configuration

The Goals Tracking App uses MongoDB as the backend database. By default, it connects to a local MongoDB instance. If you have a different MongoDB configuration, you can update the database connection settings in the `application.properties` file located in the backend directory.

## Usage

Once both the frontend and backend servers are running, you can start using the Goals Tracking App. The application allows you to create, update, and track your goals.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.

2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`

3. Make your changes and commit them with descriptive commit messages.

4. Push your changes to your forked repository.

5. Submit a pull request to the original repository.

## License

This project is licensed under the [MIT License](LICENSE).


