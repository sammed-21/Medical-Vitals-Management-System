// import UserService from '../services/userServices.js

class VitalController {
    constructor(vitalService) {
        this.vitalService = vitalService;
    }

  

    handleInsertVital(vital,centralizedDB)
    {
        
        const result = this.vitalService.insert_vital(vital,centralizedDB);
       
       return result
    }

    getVital(vital, centralizedDB) {
      
        const result = this.vitalService.get_vital(vital, centralizedDB);
        return result;
   }
    deleteVital(vital, centralizedDB) {
      
        const result = this.vitalService.delete_vitals(vital, centralizedDB);
        return result;
   }
    editVital(vital, centralizedDB) {
      
        const result = this.vitalService.edit_vital(vital, centralizedDB);
        return result;
   }
    aggregateVital(vital, centralizedDB) {
      
        const result = this.vitalService.aggregates(vital, centralizedDB);
        return result;
   }
    populateInsight(vital, centralizedDB) {
      
        const result = this.vitalService.population_insight(vital, centralizedDB);
        return result;
   }
}

export default VitalController;
