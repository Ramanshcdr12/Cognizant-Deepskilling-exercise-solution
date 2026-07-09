# Week 4: Microservices Architecture with Spring Boot 3 & Spring Cloud

This project is part of the Cognizant Deepskilling exercise. It demonstrates a complete, decentralized microservices architecture built using **Spring Boot 3** and **Spring Cloud**, featuring Service Discovery, API Gateway routing, and a custom request logging filter.

---

## 🛠️ Technology Stack
- **Java 17 / 25**
- **Spring Boot 3.5.16**
- **Spring Cloud 2025.0.3**
- **Maven** (Dependency & Build Management)

---

## 🏗️ Architecture & Component Overview

The application is split into **five independent microservices**:

| Service Name | Port | Description |
| :--- | :---: | :--- |
| **eureka-server** | `8761` | Netflix Eureka Service Registry where all microservices register themselves. |
| **greet-service** | `8080` | Greet endpoint service returning a simple "Hello World!!" message. |
| **account-service** | `8081` | Microservice returning mock bank account details by account number. |
| **loan-service** | `8082` | Microservice returning mock loan information by loan account number. |
| **api-gateway** | `9090` | Spring Cloud API Gateway that dynamically routes client requests to backend services. |

---

## 🚀 How to Run the Project Locally

Run the services in the following order:

### 1. Start the Eureka Server
Navigate to `eureka-server` and run:
```bash
mvn spring-boot:run
2. Start the Backend Microservices
Open separate terminals for each directory and run mvn spring-boot:run:

Greet Service: cd greet-service && mvn spring-boot:run
Account Service: cd account-service && mvn spring-boot:run
Loan Service: cd loan-service && mvn spring-boot:run
Refresh http://localhost:8761 to ensure all services show up as UP.

3. Start the API Gateway
Navigate to api-gateway and run:

bash


mvn spring-boot:run
