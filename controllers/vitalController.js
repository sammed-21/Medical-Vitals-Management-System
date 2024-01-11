// import UserService from '../services/userServices.js

class VitalController {
    constructor(vitalService) {
        this.vitalService = vitalService;
    }

  

    handleInsertVital(vital,centralizedDB)
    {
        
        return  this.vitalService.insert_vital(vital,centralizedDB);
       
       
    }

    handleGetVital(vital, centralizedDB) {
      
        return this.vitalService.get_vital(vital, centralizedDB);
         
   }
    handleDeleteVital(vital, centralizedDB) {
      
        return this.vitalService.delete_vitals(vital, centralizedDB);
        
   }
    handleEditVital(vital, centralizedDB) {
      
    return this.vitalService.edit_vital(vital, centralizedDB);
        
   }
    handleAggregateVital(vital, centralizedDB) {
      
         return this.vitalService.aggregates(vital, centralizedDB);
           }
    handlePopulateInsight(vital, centralizedDB) {
      
        return this.vitalService.population_insight(vital, centralizedDB);
        
   }
}

export default VitalController;
