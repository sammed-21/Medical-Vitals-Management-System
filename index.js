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
            res = vitalController.handleGetVital(commandObject, centralizedDB);
            console.log( res)
            break;
        case "edit_vitals":
            res = vitalController.handleEditVital(commandObject, centralizedDB);
            console.log( res)
            break;
        case "aggregate":
            res = vitalController.handleAggregateVital(commandObject, centralizedDB);
            console.log(res)
            break;
        case "population_insight":
            res = vitalController.handlePopulateInsight(commandObject, centralizedDB);
            console.log(res)
            break;
        case "delete_vitals":
            res = vitalController.handleDeleteVital(commandObject, centralizedDB);
            console.log( res)
            break;
        default:
            res = { status: "error", message: "Invalid command" };
            console.log(res)
    }
    
    
} 