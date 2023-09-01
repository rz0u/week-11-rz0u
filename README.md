# Clinic API Documentation

## [abclinic.fly.dev](https://abclinic.fly.dev/)

This API is designed to manage patient and medical records, providing a digital solution for healthcare professionals. Below, you will find short details about the available endpoints and their functionality.

## Endpoints

### User Registration

- **Endpoint:** `/users/register`
- **Method:** POST
- **Description:** Register a new user for clinic access.
- **Request Body:** User registration information.
- **Responses:**
  - `201`: New user successfully registered.
  - `400`: Bad request.
  - `500`: Server error.

### User Login

- **Endpoint:** `/users/login`
- **Method:** POST
- **Description:** Authenticate and log in as a registered user.
- **Request Body:** User login credentials.
- **Responses:**
  - `200`: Successfully logged in.
  - `400`: Bad request.
  - `500`: Server error.

### Get All Patients

- **Endpoint:** `/patients`
- **Method:** GET
- **Description:** Retrieve information about all patients.
- **Responses:**
  - `200`: All patients retrieved.
  - `500`: Server error.

### Search Patients by Name

- **Endpoint:** `/patients/?name={name}`
- **Method:** GET
- **Description:** Search for patients by their name.
- **Responses:**
  - `200`: Patients with matching names.
  - `404`: Patients not found.
  - `500`: Server error.

### Get Patient by ID

- **Endpoint:** `/patients/{id}`
- **Method:** GET
- **Description:** Retrieve a specific patient's information by their unique ID.
- **Responses:**
  - `200`: Retrieved patient with the requested ID.
  - `404`: Patient not found.
  - `500`: Server error.

### Get All Medical Records

- **Endpoint:** `/records`
- **Method:** GET
- **Description:** Retrieve information about all medical records.
- **Responses:**
  - `200`: All records retrieved.
  - `500`: Server error.

### Search Medical Records by Year and Month

- **Endpoint:** `/records/?year={year}&month={month}`
- **Method:** GET
- **Description:** Search for medical records by year and month.
- **Responses:**
  - `200`: Records found for the specified year and month.
  - `404`: Records not found.
  - `500`: Server error.

### Get Medical Record by ID

- **Endpoint:** `/records/{id}`
- **Method:** GET
- **Description:** Retrieve a specific medical record by its unique ID.
- **Responses:**
  - `200`: Retrieved medical record with the requested ID.
  - `404`: Record not found.
  - `500`: Server error.

### Get Medical Records by Patient ID

- **Endpoint:** `/records/{PatientId}`
- **Method:** GET
- **Description:** Retrieve all medical records associated with a specific patient by their unique ID.
- **Responses:**
  - `200`: All records retrieved for the specified patient.
  - `404`: Records not found.
  - `500`: Server error.