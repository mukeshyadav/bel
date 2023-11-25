# Task Manager API

The Task Manager API provides endpoints for managing tasks. It allows users to create, read, update, and delete tasks. The API stores task data in a file.

## Features

The API offers the following features:

- Retrieve all tasks.
- Retrieve a specific task by its ID or priority.
- Retrieve a list of tasks based on their status.
- Create, update, or delete tasks.

## API Endpoints

| Endpoint                      | Method      | Description                                      |
| ----------------------------- | ----------- | ------------------------------------------------ |
| /tasks                        | GET         | Get a list of all tasks.                         |
| /tasks/:id                    | GET         | Get a specific task by ID.                       |
| /tasks/priority/:level        | GET         | Get tasks based on priority level.               |
| /tasks?status=true|false      | GET         | Get a list of tasks based on status.             |
| /tasks                        | POST        | Create and save a new task.                      |
| /tasks/:id                    | PUT         | Update an existing task.                         |
| /tasks/:id                    | DELETE      | Delete an existing task.                         |

## Installation

This application required nodejs on your machine, run the following commands to run locally:
```
npm install
npm run dev
```

## Running using `curl`

```
curl --request PUT \
  --url http://localhost:3000/tasks/cad23358-bb7b-492d-b970-1660b702c6ac \
  --header 'Content-Type: application/json' \
  --data '{
"title": "Lorem Ipsum dolor",
"description": "testing this with new information ",
	"flag": true,
	"priority": "low"
}'
```

