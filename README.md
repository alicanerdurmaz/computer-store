<!-- prettier-ignore-start -->

<h1 align="center">
  Computer Store
</h1>

> 🚨  This is not a commercial project. I did it to improve my knowledge
> 


#  Tech Stack 
Frontend
- React  / Next.js
- Typescript 
- PostCSS
- Storybook
 
 Backend
- Nest.js / Express
- Typescript 
- MongoDB / Mongoose
- JSON Web Tokens



# How to use
### Quick Start
```bash
clone repo
cd frontend && yarn dev
cd server && yarn start:dev
```

This project uses atlas as database service and uses JWT for auth.  
To use these systems, simply enter the necessary variables in the .env file.


How to use MongoDB Atlas -> https://docs.atlas.mongodb.com/getting-started


`
.env file location = computer-store/server/.env
`
```
MONGODB_URI=mongodb+srv://<username>:<password>@devcampercluster.oqatm.mongodb.net/<dbname>?retryWrites=true&w=majority

JWT_SECRET=any text

```

# Backend API Documentation
Once the application is running you can visit http://localhost:3001/api to see the Swagger interface.
<!-- prettier-ignore-end -->
