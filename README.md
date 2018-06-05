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
###### Start the server
```Start server
# npm run back
```
###### Build project
```Start server
# npm run build
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