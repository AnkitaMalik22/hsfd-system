
# HSFD System

The Aim of the Hotel Surplus Food Distribution System is to eliminate Food Waste and Distribute the Food to the people who need.



## Tech Stack

**Client:** React, Redux, Material UI

**Server:** Node, Express, MongoDB


## API Reference

#### Postman Link 
https://www.getpostman.com/collections/d7bf8a6ec34bcf5f5bfd

### Authentication
#### Register User

```bash
  POST /api/v1/register
```

#### Login User

```bash
  POST api/v1/login
```
#### Logout User

```bash
  GET /api/v1/logout
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=4000`

`DB_URI='mongodb://localhost:27017/HotelSurplus'`

`JWT_SECRET=EXAMPLEUKILKJHGRFDEFGHJDDDFGHJKLSDFGHJKL change it`

`JWT_EXPIRE=5d`

`COOKIE_EXPIRE=5`

`SMTP_SERVICE=gmail`

`SMTP_MAIL=yourmail@gmail.com change it`

`SMTP_HOST=smtp.gmail.com`

`SMTP_PORT=465`

`SMTP_PASSWORD=zgmexamplekcz change it`

`CLOUDINARY_NAME=createcloudinaryaccountandaddnamehere change it`

`CLOUDINARY_API_KEY=yourcloudinaryapikey change it`

`CLOUDINARY_API_SECRET=examplewndjdddd8 change it`





## Run Locally

Clone the project

```bash
  git clone https://github.com/AnkitaMalik22/hsfd-system
```

Go to the project directory

```bash
  cd hsfd-system
```

Install dependencies

```bash
  npm install
```

Go to the backend directory

```bash
 cd backend
```
Start the server
```bash
  npm run start
```

Go to the frontend directory

```bash
 cd frontend
```
Install dependencies

```bash
  npm install
```
Start the server
```bash
  npm run start
```



## Frontend

I'm currently working in the backend part and connecting with the Frontend.

## Authors

- [@AnkitaMalik22](https://www.github.com/AnkitaMalik22)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

