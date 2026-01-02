# CLI To-Do App

A simple, efficient Command Line Interface (CLI) tool built with Node.js to manage your daily tasks directly from your terminal. This application persists data using a local JSON file, ensuring your tasks are saved between sessions.

## Features

* **Add Tasks:** Append new to-do items to your list.
* **View List:** Fetch and display all current tasks with their IDs.
* **Update Tasks:** Modify the text of existing tasks.
* **Delete Tasks:** Remove tasks and automatically re-index the list (1, 2, 3...) to prevent gaps.
* **Persistent Storage:** All data is stored locally in `db.json`.

## Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1.  **Clone or download** the project source code.
2.  **Navigate** to the project directory in your terminal.
3.  **Install dependencies** (Commander.js):
    ```bash
    npm install commander
    ```

## Usage

Run the application using `node` followed by your script name (e.g., `index.js`) and the command.

### 1. Add a Task
Adds a new item to the list.
* **Syntax:** `node index.js add <"task description">`
* **Example:**
    ```bash
    node index.js add "Buy groceries"
    ```

### 2. View Tasks
Displays all tasks with their corresponding IDs.
* **Syntax:** `node index.js fetch`
* **Example:**
    ```bash
    node index.js fetch
    # Output:
    # 1 Buy groceries
    # 2 Learn Node.js
    ```

### 3. Update a Task
Modifies an existing task based on its ID (index).
* **Syntax:** `node index.js update <id> <"new text">`
* **Example:**
    ```bash
    # Changes task #2 to "Learn CLI tools"
    node index.js update 2 "Learn CLI tools"
    ```

### 4. Delete a Task
Removes a task by ID and reorders the remaining items.
* **Syntax:** `node index.js delete <id>`
* **Example:**
    ```bash
    node index.js delete 1
    ```

## Project Structure

* `index.js`: The main application logic.
* `db.json`: The database file where tasks are stored (created automatically).
* `package.json`: Project configuration and dependencies.

## Technologies Used

* **Node.js**: Runtime environment.
* **Commander.js**: Third-party library for parsing command-line arguments.
* **FS Module**: Native Node.js module for file system operations.