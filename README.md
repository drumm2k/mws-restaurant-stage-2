## About
This is my Udacity Mobile Web Specialist Nanodegree Program project

## Architecture
- Node.js
- Sails.js
- Browser-sync
- IDB Promised
- ServiceWorker
- Gulp
- LazyLoad

###### Install project dependancies
```Install project dependancies
# npm i
```
###### Install Sails.js globally
```Install sails global
# npm i sails -g
```
###### Add gmaps key
```Add gmaps key
# src/index.html
# src/restaurant.html
```
###### Build project
```Build project
# npm run build
```
###### Start backend server
```Start server
# npm run back
```
###### Start frontend liveserver
```Start server
# npm run front
```

# Local Development API Server
## Usage
#### Get Restaurants
```
curl "http://localhost:1337/restaurants"
```
#### Get Restaurants by id
````
curl "http://localhost:1337/restaurants/{3}"
````