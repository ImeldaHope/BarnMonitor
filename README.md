# BarnMonitor

## Fullstack Project using Flask and React

## Introduction

BarnMonitor is a fullstack application that provides a system for managing farm animals, including health records, production data, feed tracking, and sales information. The backend API is built with Flask, using SQLAlchemy for the ORM, Bcrypt for password hashing, and Alembic for database migrations. The frontend is developed using React, allowing users to interact with the system through a clean, modern interface.

## Models

### Farmer

- **Attributes**: `id`, `name`, `email`, `phone`, `address`, `password`
- **Relationships**:
  - A farmer manages multiple animals (One-to-Many with `Animal`).

### Animal

- **Attributes**: `id`, `name`, `animal_type_id`, `age`, `farmer_id`, `health_status`, `birth_date`, `breed`
- **Relationships**:
  - An animal is managed by one farmer (Many-to-One with `Farmer`).
  - An animal belongs to one animal type (Many-to-One with `AnimalType`).
  - An animal has multiple health records (One-to-Many with `HealthRecord`).
  - An animal has multiple production records (One-to-Many with `Production`).

### AnimalType

- **Attributes**: `id`, `type_name`, `description`
- **Relationships**:
  - An animal type has multiple animals (One-to-Many with `Animal`).

### HealthRecord

- **Attributes**: `id`, `animal_id`, `checkup_date`, `treatment`, `notes`, `vet_name`
- **Relationships**:
  - A health record belongs to one animal (Many-to-One with `Animal`).

### Production

- **Attributes**: `id`, `animal_id`, `product_type`, `quantity`, `date`
- **Relationships**:
  - A production record belongs to one animal (Many-to-One with `Animal`).

### Feed

- **Attributes**: `id`, `animal_id`, `feed_type`, `quantity`, `date`
- **Relationships**:
  - A feed record belongs to one animal (Many-to-One with `Animal`).

### Sales

- **Attributes**: `id`, `animal_id`, `product_type`, `quantity_sold`, `sale_date`, `amount`
- **Relationships**:
  - A sale is associated with one animal (Many-to-One with `Animal`).
  - A sale is linked to animal production (Many-to-One with `Production`).

## Features

- Farmers can manage their animals, including tracking health records, production, feed, and sales.
- API endpoints for managing farmers, animals, and their related records.
- Passwords are securely hashed using Bcrypt.
- Full CRUD functionality for all models.
- Data validation to ensure data integrity for health records, production data, and sales records.
- Database migrations are handled using Alembic for easy schema updates.

## Database

Make sure to run the migrations and seed the database to initialize the tables and seed sample data.

## API Endpoints

### 1. `GET /farmers`

Fetches a list of all farmers.

- **Response**:

  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "123-456-7890",
      "address": "123 Farm Road"
    }
  ]
  ```

### 2. `GET /animals`

Fetches a list of all animals along with their farmer and animal type details.

- **Response**:

  ```json
  [
    {
      "id": 1,
      "name": "Bessie",
      "age": 4,
      "health_status": "Healthy",
      "breed": "Holstein",
      "farmer": {
        "id": 1,
        "name": "John Doe"
      },
      "animal_type": {
        "id": 1,
        "type_name": "Cow"
      }
    }
  ]
  ```

### 3. `POST /health_records`

Creates a new health record for a specified animal.

- **Request Body**:

  ```json
  {
    "animal_id": 1,
    "checkup_date": "2023-10-01",
    "treatment": "Vaccination",
    "notes": "Annual checkup",
    "vet_name": "Dr. Smith"
  }
  ```

- **Response**:

  ```json
  {
    "id": 1,
    "animal_id": 1,
    "checkup_date": "2023-10-01",
    "treatment": "Vaccination",
    "notes": "Annual checkup",
    "vet_name": "Dr. Smith"
  }
  ```

### 4. `POST /sales`

Creates a new sales record for a specified animal's production.

- **Request Body**:

  ```json
  {
    "animal_id": 1,
    "product_type": "Milk",
    "quantity_sold": 200,
    "sale_date": "2023-10-01",
    "amount": 500
  }
  ```

- **Response**:

  ```json
  {
    "id": 1,
    "animal_id": 1,
    "product_type": "Milk",
    "quantity_sold": 200,
    "sale_date": "2023-10-01",
    "amount": 500
  }
  ```

### 5. `GET /animals/:id`

Fetches details of a single animal, including health records, production data, and sales records.

- **Response**:

  ```json
  {
    "id": 1,
    "name": "Bessie",
    "age": 4,
    "health_status": "Healthy",
    "breed": "Holstein",
    "health_records": [
      {
        "id": 1,
        "checkup_date": "2023-10-01",
        "treatment": "Vaccination",
        "notes": "Annual checkup",
        "vet_name": "Dr. Smith"
      }
    ],
    "production_records": [
      {
        "id": 1,
        "product_type": "Milk",
        "quantity": 200,
        "date": "2023-10-01"
      }
    ],
    "sales_records": [
      {
        "id": 1,
        "product_type": "Milk",
        "quantity_sold": 200,
        "sale_date": "2023-10-01",
        "amount": 500
      }
    ]
  }
  ```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ImeldaHope/BarnMonitor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd barnmonitor
   ```

3. Set up the virtual environment and install dependencies:

   ```bash
   pipenv install && pipenv shell
   ```

4. Run migrations to set up the database:

   ```bash
   flask db init
   flask db migrate -m "initial migration"
   flask db upgrade
   ```

5. Seed the database:

   ```bash
   python seed.py
   ```

6. Run the development server:

   ```bash
   flask run
   ```

## Testing

You can test the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).