 
class UserController {
   
    constructor(userService) {
      this.userService = userService
  }

    handleCreateUser(user,userDB)
    {
        
        const result = this.userService.createUser(user,userDB);
       
       return result
    }

    handleGetUserInfo(username, userDB) {
        console.log("✅",userDB)
        const result = this.userService.getUserInfo(username, userDB);
        return result
    }
}

export default UserController;
