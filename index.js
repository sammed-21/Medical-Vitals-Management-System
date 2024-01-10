import UserController from './controllers/userController.js';
import UserService from './services/userServices.js';
import VitalService from './services/vitalSerivces.js'
import  VitalController from './controllers/vitalController.js'
const userService = new UserService();
const userController = new UserController(userService);
const vitalService = new VitalService();
const vitalController = new VitalController(vitalService);

var commandObjects =[  {
            "command": "create_user",
            "username": "Alice",
            "age": 25,
            "gender": "Female"
        },
        {
            "command": "create_user",
            "username": "Bob",
            "age": 28,
            "gender": "Male"
        },
        {
            "command": "create_user",
            "username": "JohnDoe",
            "age": 88,
            "gender": "Male"
        },
        {
            "command": "create_user",
            "username": "Tom",
            "age": 35,
            "gender": "Male"
    },
        {
            "command": "insert_vital",
            "username": "Alice",
            "vital_id": "Temperature",
            "value": 98.6,
            "timestamp": "2023-10-02T12:30:00Z"
        },
        {
            "command": "insert_vital",
            "username": "Alice",
            "vital_id": "Temperature",
            "value": 88.6,
            "timestamp": "2023-10-03T12:30:00Z"
        },
        {
            "command": "insert_vital",
            "username": "Alice",
            "vital_id": "Temperature",
            "value": 98.6,
            "timestamp": "2023-10-04T12:30:00Z"
        },
        
        {
            "command": "insert_vital",
            "username": "Bob",
            "vital_id": "HeartRate",
            "value": 82,
            "timestamp": "2023-10-01T13:30:00Z"
    },
         {
            "command": "insert_vital",
            "username": "Tom",
            "vital_id": "HeartRate",
            "value": 89,
            "timestamp": "2023-10-04T15:30:00Z"
        },
{
  "command": "get_vitals",
  "username": "Alice",
  "period": ["2023-10-02", "2023-10-05"]
    },
    {
        "command": "edit_vitals",
        "username": "Alice",
        "vitalID": "Temperature",
        "timestamp": "2023-10-04T12:30:00Z",
        "newValue": 100
    },
    {
      "command": "get_vitals",
      "username": "Alice",
      "period": ["2023-10-02", "2023-10-05"]
        },
    {
  "command": "delete_vitals",
  "username": "Alice",
  "vitalID": "Temperature",
  "timestamp": "2023-10-02 10:00:00"
}
]
let res;
 const centralizedDB = {
    users: {},
    vitals: {},
};

for (let commandObject of commandObjects) {
     
    
    const { command } = commandObject;
    const object = commandObject
    

    switch (command) {
        case "create_user":
            res = userController.handleCreateUser(object,centralizedDB);
            console.log("user",res);
        
            break;
        case "insert_vital":
            res = vitalController.handleInsertVital(commandObject, centralizedDB);
            console.log("insert", res)
            break;
        case "get_vitals":
            res = vitalController.getVital(commandObject, centralizedDB);
            console.log("get all user ", res)
            break;
        case "edit_vitals":
            res = vitalController.editVital(commandObject, centralizedDB);
            console.log("edit ", res)
            break;
        case "delete_vitals":
            res = vitalController.deleteVital(commandObject, centralizedDB);
            console.log("delete" , res)
            break;
        default:
            res = { status: "error", message: "Invalid command" };
            console.log(res)
    }
    
    
}
// Example usage with the provided command

// const response = handleCommand(commandObject);
// console.log(response);


// main.js
// import UserController from './controllers/UserController.js';
// import UserService from './services/UserService.js';
// import VitalController from './controllers/VitalController.js';
// import VitalService from './services/VitalService.js';

// const userService = new UserService();
// const userController = new UserController(userService);
// const vitalService = new VitalService();
// const vitalController = new VitalController(vitalService);

// const centralizedDB = {
//     users: {},
//     vitals: {},
// };

// const inputJSON = READ_JSON("test_cases.json");

// for (const commandObject of inputJSON) {
//     const commandType = commandObject["command"];

//     if (commandType === "create_user") {
//         const result = userController.handleCreateUser(commandObject);
//         PRINT(result);
//     } else if (commandType === "insert_vital") {
//         const result = vitalController.handleInsertVital(commandObject, centralizedDB);
//         PRINT(result);
//     } else if (commandType === "aggregate") {
//         // Implement AGGREGATE logic here using centralizedDB
//     } else if (commandType === "population_insight") {
//         // Implement POPULATION_INSIGHT logic here using centralizedDB
//     } else {
//         PRINT("Invalid command type: ", commandType);
//     }
// }
