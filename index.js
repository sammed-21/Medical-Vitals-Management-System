import jsonData from './test_case.json' assert {type: 'json'};


import UserController from './controllers/userController.js';
import UserService from './services/userServices.js';
import VitalService from './services/vitalSerivces.js'
import VitalController from './controllers/vitalController.js'
 

// Read JSON file
 
const userService = new UserService();
const userController = new UserController(userService);
const vitalService = new VitalService();
const vitalController = new VitalController(vitalService);

// var commandObjects =
//     [{
//             "command": "create_user",
//             "username": "Alice",
//             "age": 25,
//             "gender": "Female"
//         },
//         {
//             "command": "create_user",
//             "username": "Bob",
//             "age": 28,
//             "gender": "Male"
//         },
//         {
//             "command": "create_user",
//             "username": "JohnDoe",
//             "age": 88,
//             "gender": "Male"
//         },
//         {
//             "command": "create_user",
//             "username": "Tom",
//             "age": 35,
//             "gender": "Male"
//     },
//     {
//             "command": "get_user",
//             "username": "Bob",
            
//         },
//         {
//             "command": "insert_vital",
//             "username": "Alice",
//             "vital_id": "Temperature",
//             "value": 98.6,
//             "timestamp": "2023-10-02T12:30:00Z"
//         },
//         {
//             "command": "insert_vital",
//             "username": "Alice",
//             "vital_id": "Temperature",
//             "value": 88.6,
//             "timestamp": "2023-10-03T12:30:00Z"
//         },
        
//         {
//             "command": "insert_vital",
//             "username": "Alice",
//             "vital_id": "HeartRate",
//             "value": 88.6,
//             "timestamp": "2023-10-03T12:30:00Z"
//         },
//         {
//             "command": "insert_vital",
//             "username": "Alice",
//             "vital_id": "Temperature",
//             "value": 98.6,
//             "timestamp": "2023-10-04T12:30:00Z"
//         },
        
//         {
//             "command": "insert_vital",
//             "username": "Bob",
//             "vital_id": "HeartRate",
//             "value": 82,
//             "timestamp": "2023-10-01T13:30:00Z"
//     },
//          {
//             "command": "insert_vital",
//             "username": "Tom",
//             "vital_id": "HeartRate",
//             "value": 89,
//             "timestamp": "2023-10-04T15:30:00Z"
//         },
// {
//   "command": "get_vitals",
//   "username": "Alice",
//   "period": ["2023-10-02", "2023-10-05"]
//     },
//     {
//         "command": "edit_vitals",
//         "username": "Alice",
//         "vitalID": "Temperature",
//         "timestamp": "2023-10-04T12:30:00Z",
//         "newValue": 100
//     },
//     {
//       "command": "get_vitals",
//       "username": "Alice",
//       "period": ["2023-10-02", "2023-10-05"]
//         },
//     {
//   "command": "delete_vitals",
//   "username": "Alice",
//   "vitalID": "Temperature",
//   "timestamp": "2023-10-02 10:00:00"
//     },
    
//     {
//     "command": "aggregate",
//     "username": "Alice",
//     "vital_ids": ["HeartRate", "Temperature"],
//     "start_timestamp": "2023-10-02T12:30:00Z",
//     "end_timestamp": "2023-10-04T12:30:00Z"
//     },
//  {
//             "command": "population_insight",
//             "username": "Alice",
//             "vital_id": "HeartRate",
//             "start_timestamp": "2023-10-02T12:30:00Z",
//             "end_timestamp": "2023-10-04T12:30:00Z"
//         }
// ]

const centralizedDB = {
    users: {},
    vitals: {},
};

let res;
for (let commandObject of jsonData) {
     
    
    const { command } = commandObject;
    const object = commandObject
    

    switch (command) {
        case "create_user":
            res = userController.handleCreateUser(object,centralizedDB);
            console.log(res);
        
            break;
        case "get_user":
            res = userController.handleGetUserInfo(object,centralizedDB);
            console.log(res);
        
            break;
        case "insert_vital":
            res = vitalController.handleInsertVital(commandObject, centralizedDB);
            console.log(res)
            break;
        case "get_vitals":
            res = vitalController.getVital(commandObject, centralizedDB);
            console.log( res)
            break;
        case "edit_vitals":
            res = vitalController.editVital(commandObject, centralizedDB);
            console.log( res)
            break;
        case "aggregate":
            res = vitalController.aggregateVital(commandObject, centralizedDB);
            console.log(res)
            break;
        case "population_insight":
            res = vitalController.populateInsight(commandObject, centralizedDB);
            console.log(res)
            break;
        case "delete_vitals":
            res = vitalController.deleteVital(commandObject, centralizedDB);
            console.log( res)
            break;
        default:
            res = { status: "error", message: "Invalid command" };
            console.log(res)
    }
    
    
} 