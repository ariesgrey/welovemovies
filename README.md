# WeLoveMovies
For this project, I used Node.js with Express, Knex, and PostgreSQL to create the backend of the WeLoveMovies app. My work included:
- Building an API following RESTful design principles
- Writing database migrations using Knex's migration tool
- Creating CRUD routes in an Express server
- Returning joined and nested data with Knex
- Accessing relevant information through route and query parameters
- Writing custom validation middleware functions
- Creating not-found and error handlers
- Using the cors package so that requests from the frontend can correctly reach the backend

#### [Deployed App](https://welovemovies-frontend-c9xu.onrender.com) (with provided [frontend](https://github.com/ariesgrey/welovemovies-frontend))
#### [Deployed Backend](https://welovemovies-backend-2slh.onrender.com)

# Provided Thinkful Instructions
You are tasked with both setting up the database and building a number of routes that will be used by the frontend application. For this project, you will start by making the necessary changes to the data tier and then proceed to make changes to the application tier following an inside-out development workflow. Each table is detailed below, as is each route.

## Database Tables
You will create five tables for this project. You will need to create migrations for each of these tables and run those migrations. Seed data is included in this project in the `./src/db/seeds` folder. The seeds will run correctly if and only if the tables are setup as described.

_**Note:** To create the `created_at` and `updated_at` fields in your tables, you can use the timestamps method in your migration file (e.g. `table.timestamps(true, true);`). You can read more about timestamps [here](https://knexjs.org/#Schema-timestamps)._

### Critics
The `critics` table represents movie critics who have created reviews for movies. Each critic has the following fields:
- `critic_id`: (Primary Key) A unique ID for the critic.
- `preferred_name`: (String) The critic's preferred first name.
- `surname`: (String) The critic's last name.
- `organization_name`: (String) The name of the organization the critic works for.

An example record looks like the following:
```javascript
{
  "critic_id": 1,
  "preferred_name": "Chana",
  "surname": "Gibson",
  "organization_name": "Film Frenzy",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```

### Movies
The `movies` table represents movies stored in the application database. Each movie has the following fields:
- `movie_id`: (Primary Key) A unique ID for the movie.
- `title`: (String) The title of the movie.
- `runtime_in_minutes`: (Integer) The length of the movie in minutes.
- `rating`: (String) The rating given to the movie.
- `description`: (Text) A shortened description of the movie.
- `image_url`: (String) A URL to the movie's poster.

An example record looks like the following:
```javascript
{
  "movie_id": 1,
  "title": "Spirited Away",
  "runtime_in_minutes": 125,
  "rating": "PG",
  "description": "Chihiro and her parents are moving to a small Japanese town in the countryside, much to Chihiro's dismay. On the way to their new home, Chihiro's father makes a wrong turn and drives down a lonely one-lane road which dead-ends in front of a tunnel. Her parents decide to stop the car and explore the area. They go through the tunnel and find an abandoned amusement park on the other side, with its own little town...",
  "image_url": "https://imdb-api.com/images/original/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6791_AL_.jpg",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```

### Movies-Theaters
The `movies_theaters table` is a join table that connects `movies` with `theaters`. It represents which movies are being shown in which theaters. It also includes a key that represents whether or not a movie is currently showing at the theater, or if it has in the past.
- `movie_id`: (Foreign Key) A reference ID to a particular movie.
- `theater_id`: (Foreign Key) A reference ID to a particular theater.
- `is_showing`: (Boolean) A representation of whether or not the movie is currently showing in the referenced theater.

An example record looks like the following:
```javascript
{
  "movie_id": 1,
  "theater_id": 3,
  "is_showing": false
}
```

### Reviews
The `reviews` table represents a review done by a critic of a single movie. It references both a critic and a movie.
- `review_id`: (Primary Key) A unique ID for the review.
- `content`: (Text) The content of the review, written in markdown.
- `score`: (Integer) A numerical representation of the score given to the movie by the critic.
- `critic_id`: (Foreign Key) A reference ID to a particular critic.
- `movie_id`: (Foreign Key) A reference ID to a particular movie.

An example record looks like the following:
```javascript
{
  "review_id": 1,
  "content": "...",
  "score": 4,
  "movie_id": 1,
  "critic_id": 4,
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```

### Theaters
The `theaters` table represents movie theaters. Each theater has the following fields:
- `theater_id`: (Primary Key) A unique ID for the theater.
- `name`: (String) The name of the theater.
- `address_line_1`: (String) The first line of the address of the theater.
- `address_line_2`: (String) The second line of the address of the theater.
- `city`: (String) The city in which the theater is located.
- `state`: (String) The state in which the theater is located.
- `zip`: (String) The zip in which the theater is located.

An example record looks like the following:
```javascript
{
  "theater_id": 1,
  "name": "Hollywood Theatre",
  "address_line_1": "4122 NE Sandy Blvd.",
  "address_line_2": "",
  "city": "Portland",
  "state": "OR",
  "zip": "97212",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
}
```

## Routes
You will create five routes for this project. Note that some routes return data dependent on query parameters.

### GET /movies
Create a route that responds to the following request:
```javascript
GET /movies
```

The response from the server should look like the following:
```javascript
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
```

### GET /movies?is_showing=true
Update your route so that it responds to the following request:
```javascript
GET /movies?is_showing=true
```

In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters_. This means you will need to check the `movies_theaters` table.

The response from the server should look identical to the response above _except_ that it may exclude some records.

### GET /movies/:movieId
Create a route that responds to the following request:
```javascript
GET /movies/:movieId
```

The response from the server should look like the following.
```javascript
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```
#### Incorrect ID
If the given ID does not match an existing movie, a response like the following should be returned:
```javascript
{
  "error": "Movie cannot be found."
}
```

The response _must_ have `404` as the status code.

### GET /movies/:movieId/theaters
Update your route so that it responds to the following request:
```javascript
GET /movies/:movieId/theaters
```
This route should return all the `theaters` where the movie is playing. This means you will need to check the `movies_theaters` table.

The response from the server for a request to `/movies/1/theaters` should look like the following.
```javascript
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
```

### GET /movies/:movieId/reviews
Update your route so that it responds to the following request:
```javascript
GET /movies/:movieId/reviews
```
This route should return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.

The response from the server for a request to `/movies/1/reviews` should look like the following.
```javascript
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
```

### DELETE /reviews/:reviewId
Create a route that responds to the following request:
```javascript
DELETE /reviews/:reviewId
```
The server should respond with `204 No Content`.

#### Incorrect ID
If the given ID does not match an existing review, a response like the following should be returned:
```javascript
{
  "error": "Review cannot be found."
}
```
The response _must_ have `404` as the status code response.

### UPDATE /reviews/:reviewID
Create a route that responds to the following request:
```javascript
PUT /reviews/:reviewId
```

A body like the following should be passed along with the request:
```javascript
{
  "score": 3,
  "content": "New content..."
}
```

The response should include the entire review record with the newly patched content, and the critic information set to the `critic` property.
```javascript
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
```

**Hint**: Since the test requires a PUT method, you can update the review in the following manner:
```javascript
const updatedReview = {
  ...response.locals.review,
  ...request.body.data,
  review_id: response.locals.review.review_id,
};
const data = await service.update(updatedReview);
```

#### Incorrect ID
If the given ID does not match an existing review, a response like the following should be returned:
```javascript
{
  "error": "Review cannot be found."
}
```
The response _must_ have `404` as the status code response.

### GET /theaters
Create a route that responds to the following request:
```javascript
GET /theaters
```
This route should return all the `theaters` and, the movies playing at each theatre added to the `movies` key. This means you will need to check the `movies_theaters` table.

The response from the server should look like the following.
```javascript
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
```
**Hint**: The `mapProperties` function that you created earlier is similar to the `.map()` method of an array. It must return the same number of elements (aka properties) as it is given.
Using `mapProperties` with the following configuration will result in the movie related fields being mapped to a `movies` array:
```javascript
const mapProperties = require("../utils/map-properties");

const data = [
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 1,
    title: "Spirited Away",
    rating: "PG",
  },
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 2,
    title: "Interstellar",
    rating: "PG-13",
  },
];

const addMovies = mapProperties({
  movie_id: "movies[0].movie_id",
  title: "movies[0].title",
  rating: "movies[0].rating",
});
```
However, since the index of movies is hard coded to `movies[0]`, each record just overwrites the movie at index 0.
What you want is to _collapse_ or _reduce_ the theatre data and _map_ the movies to an array property on the theatre.
With an array, if you want to get back fewer elements than the source array, you must use the `.reduce()` method; `.map(`) will always return exactly the same number of elements as the source array.
All of this is to help you understand that you will not be able to use the `mapProperties` function to "map" the movie properties to match the required format for the `/theatres` route.
Implementing this type of reducer is beyond the scope of this module, so this project contains a reducer that is already implemented for you, it is named `reduceProperties`, and all you need to do is configure and use it.

## General Tasks
You will also need to make sure the following tasks are complete:
- Your `app.js` file and `server.js` file are correctly configured, with your `app.js` file exporting the application created from Express.
- You make use of the `cors` package so that requests from the frontend can correctly reach the backend.
- If a request is made to a route that does not exist, the server returns a `404` error.
- If a request is made to a route that exists, but the HTTP method is wrong, a `405` error is returned.
- All of your routes should respond with the appropriate status code and should use a `data` key in the response.
