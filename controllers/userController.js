import userService from '../services/userServices.js'

class UserController {
   
    constructor(userService) {
      this.userSerivce = userService
  }

    handleCreateUser(user,userDB)
    {
        
        const result = this.userSerivce.createUser(user,userDB);
       
       return result
    }

    handleGetUserInfo(username) {
        return userService.getUserInfo(username);
    }
}

export default UserController;
