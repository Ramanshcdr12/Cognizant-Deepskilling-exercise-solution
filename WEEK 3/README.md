# Week 3: Spring Boot RESTful Web Services

This directory contains the hands-on exercises for Week 3, focused on developing REST APIs using Spring Boot, integrating XML configurations, validation, custom exception handling, and JWT-based authentication.

## Project Structure

* **`handson_1_2.zip`**: Contains the codebase for Hands-on Exercises 1 and 2.
  * **Concepts Covered**: Spring Boot project initialization, loading bean properties via XML configuration files (`date-format.xml` and `country.xml`), configuring logging patterns in properties files, and creating simple GET endpoints.
* **`handon_3_4_5.zip`**: Contains the codebase for Hands-on Exercises 3, 4, and 5.
  * **Concepts Covered**: Layered REST architecture (DAO, Service, Controller), POST request payload parsing, input validation constraints, global exception handling for validation and format errors, Basic Security, and JWT Token Authentication/Authorization filter integration.

---

## Prerequisites

* **Java**: Version 17 or higher
* **Maven**: Version 3.x or higher

---

## Running the Applications

Extract the respective zip files and navigate to the project root directories to execute commands.

### Hands-on 1 & 2 Project
1. Open a terminal in the extracted directory.
2. Run the application:
   ```bash
   mvn spring-boot:run
