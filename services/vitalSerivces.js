// services/VitalService.js
// import Vital from '../models/Vital.js';

class VitalService {
    constructor() {
        this.vitals = {};
    }

    insert_vital(vital, centralizedDB) {
//   Assuming 'vital' is an object containing vital information like username, vitalID, value, and timestamp

if (!centralizedDB.users[vital.username]) {
    return { status: "error", message: "User does not exist" };
}

if (!centralizedDB.vitals[vital.username]) {
    centralizedDB.vitals[vital.username] = {};
}
 
        const userVitals = centralizedDB.vitals[vital.username];
        
userVitals[vital.vital_id] = userVitals[vital.vital_id] || [];
userVitals[vital.vital_id].push({
    vitalID: vital.vital_id,
    value: vital.value,
    timestamp: vital.timestamp,
});
     
        

return { status: "success", message: `Vital ${vital.vital_id} for ${vital.username} inserted successfully.` };

        // if(!centralizedDB.users[vital.username]){
        //     return {status:"error",message:"user does not exist"}
        // }
        

        // centralizedDB.vitals[vital.username] = vital
        
        // return { status: "success", message: `Vital ${vital.vital_id} for ${vital.username} inserted successfully. ` };
                
        
 
    }
   
    get_vital(vital, centralizedDB) {
        // Check if the user exists
         
        const { username, period } = vital;

        if (!centralizedDB.users[username]) {
            return { status: "error", message: "User does not exist" };
        }

        const userVitals = centralizedDB.vitals[username] || {};
       
        const vitalsData = [];

        for (const vitalID in userVitals) {
            const vitalRecords = userVitals[vitalID];

            for (const record of vitalRecords) {
                const recordTimestamp = new Date(record.timestamp);
                const periodStart = new Date(period[0]);
                const periodEnd = new Date(period[1]);

                if (recordTimestamp >= periodStart && recordTimestamp <= periodEnd) {
                    vitalsData.push({
                        vitalID: record.vitalID,
                        value: record.value,
                        timestamp: record.timestamp,
                    });
                }
            }
        }

        return { status: "success", data: vitalsData };
    
    
    }

    // delete vitals 
//     delete_vitals(vitals, centralizedDB) {
//         console.log(vitals)
//         const { username, vitalID, timestamp } = vitals
//            if (!centralizedDB.users[username]) {
//             return { status: "error", message: "User does not exist" };
//         }
//  const userVitals = centralizedDB.vitals[username] || {};
//         const vitalsToDelete = userVitals[vitalID] || [];
//           const deleteTimestamp = new Date(timestamp).getTime();

//     // Filter out the records to keep only those outside the specified timestamp
//     const remainingVitals = vitalsToDelete.filter((record) => {
//         const recordTimestamp = new Date(record.timestamp).getTime();
//         return recordTimestamp !== deleteTimestamp;
//     });

// console.log("😅😅",remainingVitals)
        
    //     }
    delete_vitals(vitals, centralizedDB) {
    const { username, vitalID, timestamp } = vitals;

    if (!centralizedDB.users[username]) {
        return { status: "error", message: "User does not exist" };
    }

    const userVitals = centralizedDB.vitals[username] || {};
    const vitalRecords = userVitals[vitalID] || [];

    // Convert timestamp to Date object
        const deleteTimestamp = new Date(timestamp).getTime();
        
 
 
 const remainingVitals = vitalRecords.filter((record) => {
        const recordTimestamp = new Date(record.timestamp).getTime();
        return recordTimestamp < new Date(deleteTimestamp).getTime() ||
               recordTimestamp > new Date(deleteTimestamp).getTime() + 24 * 60 * 60 * 1000;  
    });

 
    // Update the user's vitals in centralizedDB
        userVitals[vitalID] = remainingVitals;
        
    centralizedDB.vitals[username] = userVitals;

    return { status: "success", message: `Vital deleted for ${username}.` };
}

   
}

export default VitalService;
