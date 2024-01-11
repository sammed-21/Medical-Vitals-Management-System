 
class VitalService {
    constructor() {
      
    }

    insert_vital(vital, centralizedDB) {
 
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
edit_vital(vitals, centralizedDB) {
    const { username, vitalID, timestamp, newValue } = vitals;

    if (!centralizedDB.users[username]) {
        return { status: "error", message: "User does not exist" };
    }

    const userVitals = centralizedDB.vitals[username] || {};
    const vitalRecords = userVitals[vitalID] || [];

    // Convert timestamp to Date object
    const editTimestamp = new Date(timestamp).getTime();

    // Find the index of the vital record to edit
    const recordIndex = vitalRecords.findIndex((record) => {
        const recordTimestamp = new Date(record.timestamp).getTime();
        return recordTimestamp === editTimestamp;
    });

    // If the record is found, update its value
    if (recordIndex !== -1) {
        vitalRecords[recordIndex].value = newValue;

        // Update the user's vitals in centralizedDB
        userVitals[vitalID] = vitalRecords;
        centralizedDB.vitals[username] = userVitals;

        return { status: "success", message: `Vital edited for ${username}.` };
    } else {
        return { status: "error", message: "Vital record not found for the specified timestamp." };
    }
}
 
 
    aggregates(vitals, centralizedDB) {
    const { username, vital_ids, start_timestamp, end_timestamp } = vitals;

    if (!centralizedDB.users[username]) {
        return { status: "error", message: "User does not exist." };
    }

    //   Check Vital Records Existence
    if (!centralizedDB.vitals[username]) {
        return { status: "error", message: "No vital records found for the user." };
    }

    const aggregates = {};
    vital_ids.forEach((vitalID) => {
        const vitalRecords = centralizedDB.vitals[username]?.[vitalID] || [];
        const filteredVitals = vitalRecords.filter((vital) => {
            const vitalTimestamp = new Date(vital.timestamp).getTime();
            return (
                vitalTimestamp >= new Date(start_timestamp).getTime() &&
                vitalTimestamp <= new Date(end_timestamp).getTime()
            );
        });

        const vitalValues = filteredVitals.map((vital) => vital.value);

        if (vitalValues.length > 0) {
            const sumValues = vitalValues.reduce((sum, value) => sum + value, 0);
            const averageValue = sumValues / vitalValues.length;
            aggregates[vitalID] = averageValue;
        }
    });

    return {
        status: "success",
        message: "Aggregate fetched successfully.",
        data: {
            username: username,
            aggregates: aggregates,
            start_timestamp: start_timestamp,
            end_timestamp: end_timestamp,
        },
    };
}

    
 
 
 
population_insight(vital, centralizedDB) {
    const { username, vital_id, start_timestamp, end_timestamp } = vital;

    //   Check if the user exists
    if (!centralizedDB.users[username]) {
        return { status: "error", message: "User does not exist." };
    }

    //   Check if vital records exist for the user and vital_id
    if (!centralizedDB.vitals[username] || !centralizedDB.vitals[username][vital_id]) {
        return { status: "error", message: "No vital records found for the user and vital_id." };
    }

    // Filter vital records within the specified time range
    const vitalRecords = centralizedDB.vitals[username][vital_id].filter((vital) => {
        const vitalTimestamp = new Date(vital.timestamp).getTime();
        return (
            vitalTimestamp >= new Date(start_timestamp).getTime() &&
            vitalTimestamp <= new Date(end_timestamp).getTime()
        );
    });
    console.log("vital ",vitalRecords)

//   Calculate Percentile Rank
    if (vitalRecords.length > 0) {
        const userVitalValue = vitalRecords[0].value;
        const sortedValues = vitalRecords.map((vital) => vital.value).sort((a, b) => a - b);
        const rank = sortedValues.indexOf(userVitalValue) + 1;
        const percentile = (rank / vitalRecords.length) * 100;

        //  Return Result
        return {
            status: "success",
            message: "Population insight fetched successfully.",
            data: {
                username: username,
                vital_id: vital_id,
                start_timestamp: start_timestamp,
                end_timestamp: end_timestamp,
                insight: `Your ${vital_id} is in the ${percentile.toFixed(2)}th percentile.`,
            },
        };
    } else {
        return {
            status: "success",
            message: "Population insight fetched successfully.",
            data: {
                username: username,
                vital_id: vital_id,
                start_timestamp: start_timestamp,
                end_timestamp: end_timestamp,
                insight: `No data available for the specified period.`,
            },
        };
    }
}


   
}

export default VitalService;
