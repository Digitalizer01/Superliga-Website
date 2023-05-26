# Project: Football Website

## Introduction

The web design process began by studying the theme of the website, the Superliga. As football has been the main idea, the page has been designed with a strong focus on news and standings.

## Database Structure

As mentioned, the web has a database behind it. The structure includes the following fields:

- **Clasificacion**: Represents the standings of teams in the Superliga. It includes the team names as keys and their corresponding positions as values.
- **Encuesta**: Represents a survey where users can vote for their predicted winner. It includes the options, question, and the respective responses.
- **Equipos**: Contains information about the teams participating in the Superliga. Each team name is associated with a description.
- **Noticias**: Stores news articles related to football. Each news article includes comments, likes, dislikes, title, subtitle, and different sections.
- **Usuarios**: Represents the registered users of the website. Each user is identified by their email address and includes gender, name, roll number, and section.

The database is implemented using Firebase as the backend technology. However, for security reasons, the Firebase credentials have been omitted from this project.

## Technologies Used

The football website project utilizes the following technologies:

- **JavaScript**: The programming language used to add functionality to the website.
- **Firebase**: The chosen backend platform for hosting the database and providing cloud-based data storage.
- **HTML/CSS**: The foundational web technologies for structuring and styling the website's layout and design.
- **Markdown**: The lightweight markup language used to create this project documentation.

These technologies work together to create an interactive and dynamic football website experience.
