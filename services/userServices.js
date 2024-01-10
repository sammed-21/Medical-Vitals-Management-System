import User from '../models/User.js';


class UserService {
    constructor() {
        
    }

    createUser(user, centralDB) {
      
       
        if (!centralDB.users[user.username]) {
   
           centralDB.users[user.username]= user
            return {"status":"success","message":`User ${user.username} created successfully`}
        } else {
            return {"status":"error","message":"Username already exists. Choose a different one"}
        }
    }

    getUserInfo(username) {
        const user = this.users[username]
        return user ? user : 'User not found'
    }
}


export default UserService;