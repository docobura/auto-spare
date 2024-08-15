# AutoSavy

## Overview

AutoSavy is a web application that features a React frontend built with Vite and a Flask backend. The frontend provides a dynamic user interface, while the backend handles the business logic and data management.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
  - [Frontend](#frontend-usage)
  - [Backend](#backend-usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Modern React frontend with fast build times using Vite
- RESTful API built with Flask
- User authentication and management
- Data visualization and reporting

## Technologies

- **Frontend**: React, Vite
- **Backend**: Flask, SQLAlchemy
- **Database**: SQLite
- **Styling**: Tailwind CSS 

## Installation
1. Fork and clone this repository
    [git clone git@github.com:docobura/auto-spare.git](https://github.com/docobura/auto-spare.git)

### Frontend

1. Navigate to the frontend directory
    cd auto-spare/client/my-react-app

2. Install dependencies
    npm install

3. Start development server
    npm run dev

4. The frontend will be available at http://localhost:5173

### Backend

1. Navigate to the backend directory
    cd auto-spare/server

2. Install pipenv (if not already installed)
    pip install pipenv

3. Install dependencies
    pipenv install

4. Activate the pipenv shell
    pipenv shell

5. Start the flask server
    flask run

6. The backend will be available at http://127.0.0.1:5000


## Usage

### Frontend Usage

Visit http://localhost:5173 to view the application.
Use the provided navigation and features to interact with the application.

### Backend Usage
The backend provides a RESTful API at http://localhost:5000/api.
Use tools like Postman or Thunderclient to interact with the API endpoints.

## Configuration

Frontend: Configuration files for the frontend can be found in the frontend directory.

Backend: Configuration files for the backend can be found in the backend directory. Update config.py or environment variables as needed.

## Contributing

Contributions are welcome! Please follow the guidelines outlined in CONTRIBUTING.md.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.