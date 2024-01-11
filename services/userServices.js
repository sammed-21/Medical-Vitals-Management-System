

class UserService {
    constructor() {}

    createUser(user, centralDB) {  
        if (!centralDB.users[user.username]) {
            const { username, gender, age } = user;
   
            centralDB.users[user.username] = {
                username,gender,age
            }
               
            return {"status":"success","message":`User ${user.username} created successfully`}
        } else {
            return {"status":"error","message":"Username already exists. Choose a different one"}
        }
    }

    getUserInfo(user, centralDB) {
        if (!centralDB.users[user.username]) {
            return { status: "error", message: "user not found" }
            
        }
        let result = centralDB.users[user.username]
       
       
        return result;
    }
}


export default UserService;