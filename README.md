# startup
startup application for BYU CS 260

[Notes for CS 260](notes.md)


## Startup Specification

### Elevator Pitch

Have you ever been frustrated with a group project? Have you ever been overwhelmed with your class schedule? Do you have a seemingly endless list of things that you need to do? This task manager application allows you to keep track of that list of 'to-dos.' Organize your own personal responsibilities or work as a team in a shared workspace.

### Concept Art

![Sample UI](TaskManagerSampleUI.jpg)

### Key Features

- Secure login
- Able to add, edit and delete tasks
- Real-time updating in shared boards
- Tasks are stored under user profiles
- Ability to see previously completed tasks

### Technologies

This is how each technology will be used: 

- **HTML** - Using HTML to create correct pages for the application. A login page will be created and a page for organizing tasks.
- **CSS** - Uses this to create an appealing UI which correctly and simply organizes tasks.
- **JavaScript** - Allows login, adding, editing, completing, and deleting tasks. 
- **Service**  - Service endpoints of login, editing tasks, and completing tasks.
- **DB/Login** - Store users, boards and tasks. 
- **WebSocket** - As changes are made in certain boards, those boards are updated for other users.
- **React** - Port application to use the React web framework.


## HTML Deliverable

**HTML pages** - Four HTML pages that corrospond with login, personal tasks, shared tasks, and more information.  
**Links** - Links to each page are accessable to freely navigate.  
**Text** - Text is found on each button option and Placeholder text on tasks.  
**Images** - Flavicon Icon added.  
**DB/Login** - Placeholder for login, Placeholder on tasks from where it would pull from the database.  
**3rd Party Call** - Date task was created will be pulled from a 3rd party API.  
**WebSocket** - The shared tasks will be updated as others make changes to tasks.  

## CSS Deliverable

Added basic CSS styling and responsive design