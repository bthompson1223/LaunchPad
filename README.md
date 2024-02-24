# LaunchPad

### Link to live site:

https://launchpad-4kav.onrender.com/

### Index

[Feature List](https://github.com/bthompson1223/LaunchPad/wiki/Feature-List) | [Database Schema](https://github.com/bthompson1223/LaunchPad/wiki/LaunchPad-DB-Schema) | [User Stories](https://github.com/bthompson1223/LaunchPad/wiki/User-Stories)

### Let's Get Technical

In this project we used Javascript, React, Redux, Python, Flask, SQLAlchemy, PostgreSQL, Render, HTML5, CSS3

### Summary

Have an awesome idea and want to see who will back it to make it happen? Post your creative thoughts on LaunchPad to gauge not only interest, but also get funding to make your dreams become reality!

## Screenshots

TODO

## Getting started

1. Clone this repository with your preferred method (only the main branch for full functionality).

2. To install dependencies for backend.

   At the root of the repository run:

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development/production environment.

4. Make sure the database (Your choice in database serrvice, we used SQLite3 for development and PostgreSQL for production) connection URL is in the **.env** file.

5. This `.env.example` organizes all tables inside the `flask_schema` schema defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has our project styling applied, you will have to alter any component's `.css` file if changes are needed.

8. To run the React frontend in development:

- Split into a new terminal
- `cd` into the **react-vite**
  directory and run `npm i` to install dependencies.
- Next, run `npm run build`
  to create the `dist` folder.
- Run `npm run build` every time before live deployment.
  - You can run from the default port in development to see changes live.

## Features

### Users

- Not logged in or new users should be able to click the profile button in the top-right and get a drop-down menu to sign in or sign up

- Clicking on sign in should prompt the user with a modal to login with their credentials or be able to log in as a demo user with the provided button below the form

- Clicking on sign up should prompt the user to sig nup with their information with a note for the one optional field

  - Upon signing up, user should be automatically logged in

- Once logged in:

  - The profile button should change to the user's chosen profile image, or the default anonymous image if none chosen

  - The user upon clicking the profile image button should see a drop-down menu with options to see their username, email, a link to see created projects, a link to see backed-projects, and a log out button.

- Clicking the Demo User button should automatically log the user in as Mister Anderson with the username AskJeeves, email guest_services@launchpad.io, and the previously mentioned links and button.

### Projects

- Any user logged in or not:

  - Should be able to see a navigation bar with the site logo that is clickable and will take the user to the landing page from anywhere, and a profile button in the top right that will give options (based on if user is signed in or not, see User section for more information)

  - Should be able to see the landing page with a random three featured projects (there may be duplicates due to small seed size)

  - Should be able to browse any category to see all projects matching that category, including the `all` tab which has all projects in it.

  - Should be able to see the project details of any project by clicking the link to the project

  - Should be able to see a `Back this project` button that will let you view rewards once clicked

  - Should be able to view the story, risks, and comments section of any project on the project's detail page

- Any user that has logged in:

  - Should be able to do all of the above

  - Should see a Create A Project button in the the top left corner of any page

  - Should be able to create a project by clicking the aforementioned button and be navigated to a form to fill out for project details

- Should be able to see their created projects after clicking the `Manage Created Projects` link in the profile dropdown.
  - Should be able to click `Edit Project` to be taken to a page to edit their project
  - Should be able to click `Add Reward` to add a reward to their project
  - Should be able to click `Delete` to delete their project
  - The three buttons should also be seen when an owned project is viewed on a project list

### Comments

- As a logged in user:
  - Should be able to leave a comment on projects and reply to other comments
  - Should be able to delete your own comments

### Rewards

- As a user (logged in or not):

  - Should be able to click `Back this project` on a project's detail page to see the rewards.

- As a logged in user, but not the owner of the project:

  - Should be able to click the aforementioned button and be taken to the rewards page where I can then pick my reward to pledge for.

  - Should see in the profile drop-down a link to `Manage Backings` that will take the user to a page with all the backings they have

- As a logged in user and the owner of the project:

  - Should see `Add Reward` buttons on `Manage Projects` page and one the project's detail page.
    - Should be able to click the button to go to a form to add a reward to the specified project

- Should see a `View Rewards` button on the project details page to have an overview of the rewards made for the project
  - In the `View Rewards` section, should see buttons to update or delete the rewards belonging to the project.

### Backings

- As a user logged in or not:
  - Should see a total count of backers on a project's detail page
  - Should see total amount of backers for a specific reward
- As a logged in user:

  - Should see a list of backed projects after clicking `Manage Backings` in user profile drop-down
  - Should be able to click `Back this project` on a project and choose a backing level, then after confirming the modal should be redirected back to project details with the project added to the user's backed projects

  - On `Backed Projects` should see a button to delete specific pledge made and remove it from user's backing catalog.

## Connect

- Bryan Thompson [Github](https://github.com/bthompson1223) | [LinkedIn](https://www.linkedin.com/in/bryan-thompson-933a47251/)
- Chase Agee [Github](https://github.com/thechee) | [LinkedIn](https://www.linkedin.com/in/chase-agee/)
- Lei Li [Github](https://github.com/leileili1010) | [LinkedIn](https://www.linkedin.com/in/leileili)
