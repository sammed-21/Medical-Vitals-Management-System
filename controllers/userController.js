 
class UserController {
   
    constructor(userService) {
      this.userService = userService
  }

    handleCreateUser(user,userDB)
    {
        
       return  this.userService.createUser(user,userDB);
       
    
    }

    handleGetUserInfo(username, userDB) {
      
       return  this.userService.getUserInfo(username, userDB);
    
    }
}

export default UserController;
