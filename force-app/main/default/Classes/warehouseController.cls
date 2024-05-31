
// public class warehouseController {
//     @AuraEnabled(cacheable=true)
//     public static List< Warehouse__c> getWarehouse(Id recordId) {
//       List<Warehouse__c> values=new  List<Warehouse__c>();  
//       Warehouse__c latitude=[SELECT Location__Latitude__s  FROM Warehouse__c where ID=:recordId];
//       values.add(latitude);
//       Warehouse__c longitude=[SELECT Location__Longitude__s  FROM Warehouse__c where ID=:recordId];
//       values.add(longitude);
//     if(values!=null){
//         system.debug('the values are'+values);
//     }
//       return values;

//     }
  
       
    
//     }

// public class warehouseController{
//     @AuraEnabled (cacheable =true)
//     public static List<Warehouse__c> getWarehouse(Id warehouseId) {
//         system.debug('the values are ::::'+[SELECT Location__Latitude__s,Location__Longitude__s FROM Warehouse__c where Id='a03dL0000011JrGQAU']);
//      return [SELECT Location__Latitude__s ,Location__Longitude__s FROM Warehouse__c where Id=:warehouseId];
//     }
    
    
// }
public with sharing class warehouseController {
    @AuraEnabled(cacheable=true)
    public static List<Warehouse__c> getWarehouse(Id warehouseId) {
        // Corrected debug statement to use the dynamic warehouseId parameter
        System.debug('Fetching Warehouse with ID: ' + warehouseId);
        
        // Query to fetch the Warehouse record
        List<Warehouse__c> warehouses = [SELECT  Name,Location__Latitude__s, Location__Longitude__s FROM Warehouse__c WHERE Id = :warehouseId];
        
        // Debug the fetched warehouse details
        System.debug('Fetched Warehouse details: ' + warehouses);
        
        return warehouses;
    }
} 