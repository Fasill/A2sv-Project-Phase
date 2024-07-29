# Task List

This is a simple HTML application for managing a task list. Users can add, edit, and remove tasks through a straightforward interface.

## Features

- **Add Task**: Enter a task in the input field and click "Add Task" to add it to the list.
- **Edit Task**: Click "edit" next to a task to update its content.
- **Remove Task**: Click "Remove" to delete a task from the list.

## How It Works

- Tasks are stored in a stack (array) in memory.
- When a task is added, it is pushed to the stack and displayed in reverse order (most recent first).
- Tasks can be edited or removed using corresponding buttons.

## Usage

1. Open the `task1.html` file in a web browser.
2. Type a task into the input field and click "Add Task" to see it appear in the list.
3. Click "edit" next to a task to modify its text.
4. Click "Remove" to delete a task from the list.

## Code Explanation

- **HTML**: Provides the structure with an input field, a button to add tasks, and an unordered list (`<ul>`) to display tasks.
- **JavaScript**: Handles the task management logic:
  - `addTask()`: Adds a new task to the stack and updates the display.
  - `show()`: Updates the task list display.
  - `editTask(i)`: Prompts the user to edit a task and updates the stack.
  ![Screenshot from 2024-07-29 17-03-31](https://github.com/user-attachments/assets/f4540f6d-80e1-464a-962b-7ec094c63972)

  ![Screenshot from 2024-07-29 17-03-48](https://github.com/user-attachments/assets/f01a14be-7dec-436d-abea-f1ab445ef515)



