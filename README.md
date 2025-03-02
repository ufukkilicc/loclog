# Location Logger Application Task
**CONTENTS**
1. Description
2. Installation
3. Load Testing
4. Outcome Of The Project
4. Future Improvements At Performance Optimization

## 1. Description
### Technology Stack
- **Backend Framework:** NestJS
- **Programming Language:** TypeScript
- **Database:** PostgreSQL (with PostGIS for geospatial data)
### API Endpoints
- **POST /locations:** Logs a user's location.
- **GET /logs:** Retrieves logged locations.
- **POST /areas:** Creates a new geofenced area.
- **GET /areas:** Retrieves a list of geofenced areas.
### How It Works?
The Location Logger Application is designed to track and manage user locations within predefined geofenced areas. Here’s how the system works:
1. **Location Logging:**
  - Users send their location data (latitude and longitude) to the POST /locations endpoint.
  - The system checks if the location falls within any predefined geofenced area using PostGIS's spatial functions (e.g., ST_Contains).
  - If the location is within an area, it is logged in the database with the corresponding areaId.
2. **Geofenced Areas:**
  - Administrators can create geofenced areas using the POST /areas endpoint.
  - Each area is defined by a polygon (a set of coordinates forming a closed shape).
  - These areas are stored in the database and used to determine if a user’s location falls within them.
3. **Retrieving Logs:**
  - The GET /logs endpoint retrieves a paginated list of logged locations.
  - This endpoint supports filtering by userId, areaId, and entryTime.
4. **Retrieving Areas:**
  - The GET /areas endpoint retrieves a paginated list of geofenced areas.
  - This endpoint supports filtering by name and sorting by createdAt.
5. **Performance Optimization:**
  - The system is optimized for high performance and scalability, ensuring it can handle a large number of concurrent requests efficiently.
### Performance Optimization
#### On the Application Level
The following optimizations have been implemented:
- **NestJS Modular Decomposition:** The application is structured into modules (e.g., LocationsModule, AreasModule) for better maintainability and scalability.
- **Caching:** NestJS’s built-in caching mechanism is used to reduce database load and improve response times.
- **Event Loop Optimization:** The application is designed to avoid blocking the Node.js event loop, ensuring high concurrency.
#### On the Database Level
The following optimizations have been implemented:
- **Indexing:** Indexes have been added to frequently queried columns (e.g., userId, areaId, entryTime) to speed up database queries.
- **Spatial Indexing:** Spatial indexes (using PostGIS) have been added to the point and polygon columns to optimize geospatial queries.

## 2. Installation
The setup is built with **Docker**

To install and start the application, run:
```javascript
$ npm install
$ make docker-start
```

## 3. Load Testing
The test is being done with **Grafana/k6**

By default load test is on the endpoint /logs but you can change it from loadTest.js in the project

This command runs a simple load test script:
```Makefile
$ make docker-test
```

## 4. Outcome Of The Project
### Test Results (k6)
**Important Note:** We are only going to test **POST /locations** and **GET /logs** since the startup datas we need to test the project, at the tables 1 row of polygon defined area in the areas table and user sent location data point that in that polygon area.
#### Area:
```json
{
  "name": "Central Park",
  "polygon": [
    {
      "ring": [
        { "coordinates": [-73.9682, 40.7855] },
        { "coordinates": [-73.9814, 40.7855] },
        { "coordinates": [-73.9814, 40.7749] },
        { "coordinates": [-73.9682, 40.7749] },
        { "coordinates": [-73.9682, 40.7855] }
      ]
    }
  ]
}
```
#### User Location:
```json
{
    "userId": 5,
    "point": {
        "coordinates": [
            -73.9749,
            40.7812
        ]
    }
}
```
#### And The Expected User Location Log:
```json
{
    "id": 996041,
    "userId": 5,
    "point": {
        "type": "Point",
        "coordinates": [
            -73.9749,
            40.7812
        ]
    },
    "entryTime": "2025-03-02T21:08:08.730Z",
    "areaId": 1
}
```

**Scenario:** Up to 100 looping VUs for 9m0s over 3 stages
- First Stage: From 0 up to 100 in 2 minutes.
- First Stage: Stay stable at 100 for 5 minutes.
- First Stage: From 100 down to 0 within 2 minutes.
#### (BEFORE) Performance Optimization:
##### NestJS API
- **GET /logs?page=1&limit=10**
  - **Total Requests:** 21,210 requests handled.
  - **Throughput:** 39.27 requests per second.
  - **Response Times:**
    - **Average:** 1.98s
    - **90th Percentile (p90):** 2.63s
    - **95th Percentile (p95):** 2.76s
  - **Error Rate:** 0.00% (no failed requests).
  - **Data Transferred:**
    - **Received:** 35 MB.
    - **Sent:** 2.0 MB.
  - **Concurrent Users:** Simulated 1 to 100 virtual users.
- **POST /locations**
  - **Total Requests:** 1,393,979 requests handled.
  - **Throughput:** 2,581.46 requests per second.
  - **Response Times:**
    - **Average:** 30.1ms
    - **90th Percentile (p90):** 42.28ms
    - **95th Percentile (p95):** 47.13ms
  - **Error Rate:** 0.00% (no failed requests).
  - **Data Transferred:**
    - **Received:** 357 MB.
    - **Sent:** 268 MB.
  - **Concurrent Users:** Simulated 1 to 100 virtual users.
##### PostgreSQL Database
The Query Executed:
```Sql
select "entryTime" from locations where id=500
```
The Result:
```cmd
Successfully run. Total query runtime: 60 msec.
1 rows affected.
```
#### (AFTER) Performance Optimization:
##### NestJS API
- **GET /logs?page=1&limit=10**
  - **Total Requests:** 3,267,557 requests handled.
  - **Throughput:** 6,050.83 requests per second.
  - **Response Times:**
    - **Average:** 12.85ms
    - **90th Percentile (p90):** 17.28ms
    - **95th Percentile (p95):** 18.66ms
  - **Error Rate:** 0.00% (no failed requests).
  - **Data Transferred:**
    - **Received:** 5.4 GB.
    - **Sent:** 310 MB.
  - **Concurrent Users:** Simulated 1 to 100 virtual users.
- **POST /locations**
  - **Total Requests:** 1,351,531 requests handled.
  - **Throughput:** 2,502.76 requests per second.
  - **Response Times:**
    - **Average:** 31.05ms
    - **90th Percentile (p90):** 43.79ms
    - **95th Percentile (p95):** 47.71ms
  - **Error Rate:** 0.00% (no failed requests).
  - **Data Transferred:**
    - **Received:** 346 MB.
    - **Sent:** 260 MB.
  - **Concurrent Users:** Simulated 1 to 100 virtual users.
##### PostgreSQL Database
The Query Executed:
```Sql
select "entryTime" from locations where id=500
```
The Result:
```cmd
Successfully run. Total query runtime: 45 msec.
1 rows affected.
```
## 5. Future Improvements At Performance Optimization
- Database Connection Pool
- Optimizing NodeJS Worker Threads

**Note:**
Cached did work on the GET requests and decreased the response time from up 1 second to 12 miliseconds so it did good. Though Indexing decrease the queries a little bit but indexes are not useful for queries that require a full table scan because the database still needs to read every row to return the results.
