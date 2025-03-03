import http from 'k6/http';

export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: "5m", target: 100 },
        { duration: "10m", target: 100 },
        { duration: "5m", target: 0 },
    ]
    // vus: 1,
    // duration: "10s"
};

const url = "http://loclog:80";
let params = {
    headers: {
        'Content-Type': 'application/json',
    },
};;
let payload = {};

export default function () {
    // // POST /areas
    // payload = JSON.stringify({
    //     name: "Central Park",
    //     polygon: [
    //         {
    //             "ring": [
    //                 { "coordinates": [-73.9682, 40.7855] },
    //                 { "coordinates": [-73.9814, 40.7855] },
    //                 { "coordinates": [-73.9814, 40.7749] },
    //                 { "coordinates": [-73.9682, 40.7749] },
    //                 { "coordinates": [-73.9682, 40.7855] }
    //             ]
    //         }
    //     ]
    // });
    // http.post(url + "/areas", payload, params);

    // POST /locations
    // payload = JSON.stringify({
    //     userId: 5,
    //     point: {
    //         coordinates: [
    //             -73.9749,
    //             40.7812
    //         ]
    //     }
    // });
    // http.post(url + "/locations", payload, params);

    // // GET /areas
    // http.get(url + "/areas?page=1&limit=10")

    // GET /logs
    http.get(url + "/logs?page=1&limit=10")
}