# PULSE

A web application for monitoring and predicting battery life of medical equipment tags in a large-scale Wirepas mesh network at Odense University Hospital (OUH). 

The project aims to improve maintenance and reduce operational costs to help staff save time.

## Table of Contents
- [Key features](#key-features)
- [Tools used](#tools-used)
- [Running the project locally](#running-the-project-locally)

## Key features
- **Battery-life Prediction**
- **Dashboard Overview**
- **Equipment Tag List**
- **Analytics & Visualizations**

## Tools used
- **Django:** framework for backend API
- **Angular:** framework for the frontend UI
- **PostgreSQL:** database
- **Docker:** for containerization
- **Git & GitHub:** for version control

## Running the project locally

### Prerequisites
- **Python 3.14:** [python.org](https://www.python.org/downloads/)
- **Pip**: usually comes with Python, but can be installed separately if needed: `py -m ensurepip --upgrade`
- **PostgreSQL:** [postgresql.org](https://www.postgresql.org/download/)
- **Node.js & npm:** [Node.js](https://nodejs.org/)
- **Angular CLI:** can be installed using: `npm install -g @angular/cli`
- **Docker & Docker Compose:** [docker.com](https://www.docker.com/)

### Running the Project with Docker
- In the root directory run the command: `docker-compose up --build`
- Access the frontend at: http://127.0.0.1:4200/
- The backend API will be available at: http://127.0.0.1:8000/api/
- To stop the containers, run: `docker-compose down`