class VitalService {
    constructor() {}

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
        // get the user data to be deleted
        const deleteTimestamp = new Date(timestamp).getTime();
        // using the javascript filter method remove the user data
        const remainingVitals = vitalRecords.filter((record) => {
            const recordTimestamp = new Date(record.timestamp).getTime();
            return recordTimestamp < deleteTimestamp || recordTimestamp > deleteTimestamp + 24 * 60 * 60 * 1000;
        });

        userVitals[vitalID] = remainingVitals;
        centralizedDB.vitals[username] = userVitals;

        return { status: "success", message: `Vital deleted for ${username}.` };
    }

    edit_vital(vitals, centralizedDB) {
        const { username, vitalID, timestamp, newValue } = vitals;

        if (!centralizedDB.users[username]) {
            return { status: "error", message: "User does not exist" };
        }
        // get the data form the data store if not ther give empty
        const userVitals = centralizedDB.vitals[username] || {};
        const vitalRecords = userVitals[vitalID] || [];
        // update the time with new time stamp while edit
        const editTimestamp = new Date(timestamp).getTime();
        // find the record in the database
        const recordIndex = vitalRecords.findIndex((record) => {
            const recordTimestamp = new Date(record.timestamp).getTime();
            return recordTimestamp === editTimestamp;
        });
        // make all the changs in the specific data
        if (recordIndex !== -1) {
            vitalRecords[recordIndex].value = newValue;
            userVitals[vitalID] = vitalRecords;
            centralizedDB.vitals[username] = userVitals;

            return { status: "success", message: `Vital edited for ${username}.` };
        } else {
            return { status: "error", message: "Vital record not found for the specified timestamp." };
        }
    }

    aggregates(vitals, centralizedDB) {
        const { username, vital_ids, start_timestamp, end_timestamp } = vitals;
        // check user existance
        if (!centralizedDB.users[username]) {
            return { status: "error", message: "User does not exist." };
        }
        // check user vital present or not
        if (!centralizedDB.vitals[username]) {
            return { status: "error", message: "No vital records found for the user." };
        }

        const aggregates = {};
        vital_ids.forEach((vitalID) => {
            const vitalRecords = centralizedDB.vitals[username]?.[vitalID] || [];
        //   filter over to get the data form the particular time zone
            const filteredVitals = vitalRecords.filter((vital) => {
                const vitalTimestamp = new Date(vital.timestamp).getTime();
                return (
                    vitalTimestamp >= new Date(start_timestamp).getTime() &&
                    vitalTimestamp <= new Date(end_timestamp).getTime()
                );
            });

            const vitalValues = filteredVitals.map((vital) => vital.value);
            //  calculate the average  using the give formula
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
 
      getOtherUsersVitals(vital,centralizedDB) {
        const { vital_id, start_timestamp, end_timestamp } = vital;
        // it get the value of the other populaion in the time zone
        const otherUsersVitals = {};
        // this the get all the heart rate of the other population 
          for (const username in centralizedDB.users) {
    
            if (username !== vital.username) {
                const userVitals = centralizedDB.vitals[username]?.[vital_id] || [];
                const filteredVitals = userVitals.filter((vital) => {
                    const vitalTimestamp = new Date(vital.timestamp).getTime();
                    return (
                        vitalTimestamp >= new Date(start_timestamp).getTime() &&
                        vitalTimestamp <= new Date(end_timestamp).getTime()
                    );
                });

                //store the other population data induvisual in this object
                otherUsersVitals[username] = filteredVitals.map((vital) => vital.value);
            }
        }

        return otherUsersVitals;
    }

    population_insight(vital,centralizedDB) {
        const { username, vital_id, start_timestamp, end_timestamp } = vital;
        // check user
        if (!centralizedDB.users[username]) {
            return { status: "error", message: "User does not exist." };
        }
        // user vital is not there return error
        if (!centralizedDB.vitals[username] || !centralizedDB.vitals[username][vital_id]) {
            return { status: "error", message: "No vital records found for the user and vital_id." };
        }
        // filter the user data according to the given timezone
        const userVitalRecords = centralizedDB.vitals[username][vital_id].filter((vital) => {
            const vitalTimestamp = new Date(vital.timestamp).getTime();
            return (
                vitalTimestamp >= new Date(start_timestamp).getTime() &&
                vitalTimestamp <= new Date(end_timestamp).getTime()
            );
        });
        // get the inital heart rate value to compare
        const userVitalValue = userVitalRecords.length > 0 ? userVitalRecords[0].value : null;
        // get the other population heart rate in the time zone
        const otherUsersVitals = this.getOtherUsersVitals(vital , centralizedDB);
        // Calculate user's percentile rank

        let percentile = null;
        if (userVitalValue !== null) {
            // get the all the value of the other population
            const allVitals = Object.values(otherUsersVitals).flat();
            // add the current user heart rate with other population heart rate and sort value
            const sortedValues = allVitals.concat(userVitalValue).sort((a, b) => a - b);
            // get the current user heart rate index from the array of all the heart rate get the position
            const rank = sortedValues.indexOf(userVitalValue) + 1;
            // formula give to calculate the percentile value below X ( here X is 75 initial value of the user i need to imporve like get the other value to check i need to insert unique value in the begin only) and total value * 100
      
            percentile = (rank / sortedValues.length) * 100;

        }

        return {
            status: "success",
            message: "Population insight fetched successfully.",
            data: {
                username: username,
                vital_id: vital_id,
                start_timestamp: start_timestamp,
                end_timestamp: end_timestamp,
                insight: `Your ${vital_id} is in the ${Math.trunc(percentile)} percentile.`
            },
        };
    }
}

export default VitalService;
