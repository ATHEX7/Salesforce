  
// import { LightningElement, api, wire } from 'lwc';
// import getWarehouse from '@salesforce/apex/warehouseController.getWarehouse';
// import Latitude from '@salesforce/schema/Asset.Latitude';

// export default class WarehouseMapping extends LightningElement {
//     mapMarkers = [];
//     mapCenter;
//     @api recordId;

//     @wire(getWarehouse, { warehouseId: '$recordId' })
//     wireData({ data, error }) {
//             // Assuming data is an array of Warehouse__c records
//             if (Array.isArray(data) && data.length > 0) {
//                 this.mapMarkers = data.map(warehouse => ({
//                     location: {
//                         Latitude: warehouse.Location__Latitude__s,
//                         Longitude: warehouse.Location__Longitude__s
//                     },
//                     title: `Warehouse: ${warehouse.Name}`
//                 }));
//                 this.mapCenter = {
//                     Latitude: data[0].Location__Latitude__s,
//                     Longitude: data[0].Location__Longitude__s
//                 };
                
           
//         } else if (error) {
//             console.error('Error fetching data:', error);
//             this.data = undefined;
//         }
//     }}

// import { getFieldValue, getRecord } from "lightning/uiRecordApi";
// import { LightningElement, api, wire } from "lwc";
// import Location_FIeld from "@salesforce/schema/Warehouse__c.Location__c";
// import Name_Field from "@salesforce/schema/Warehouse__c.Name";

// const Fields = [Location_FIeld];

// export default class WarehouseMapping extends LightningElement {
//     mapMarkers;
//     mapCenter;
//     data;
//     error;
   
//     location;

//     @api recordId;
    

//     @wire(getRecord, { recordId:'$recordId', fields: Fields })
//     wiredRecord({ data,error  }) {

//         this.data=JSON.stringify(data);
//         this.error=error;
//         console.log('Record ID:', this.recordId);
//         console.log('Data:::::::::::::::::::'+data);
//         console.log('error:::::::'+error);

//         if (data) {
//             console.log('Data:', data);

//             // this.latitude =JSON.stringify(data.fields.Location__Latitude__s.value);
           
//              this.location=data.fields.Location__c.value;
//              console.log('location######'+this.location);

//             // this.mapMarkers = {
//             //     location: {
//             //         Latitude: data.fields.Location__Latitude__s.value,
//             //         Longitude:data.fields.Location__Longitude__s.value
//             //     },
//             //     title: name
//             // };

//             // this.mapCenter = {
//             //     Latitude: latitude,
//             //     Longitude: longitude
//             // };
//         } else if (error) {
//             console.error('Error retrieving record:', error);
//         }
//     }
// }

import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
const LATITUDE='Warehouse__c.Location__Latitude__s';
const LONGITUDE='Warehouse__c.Location__Longitude__s';
const NAME='Warehouse__c.Name';

 
const FIELDS = [
    LATITUDE,LONGITUDE,NAME
];
 
export default class WarehouseDetails extends LightningElement {
    @api recordId;
    warehouse;
    error;
    mapMarkers = [];
 
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredWarehouse({ error, data }) {
        if (data) {
            this.warehouse = data;
            this.error = undefined;
            this.setMapMarkers();
        } else if (error) {
            this.error = error;
            this.warehouse = undefined;
        }
    }
 
    get warehouseName() {
        return getFieldValue(this.warehouse, NAME);
    }
 
    get warehouseLatitude() {
        return getFieldValue(this.warehouse, LATITUDE);
    }
 
    get warehouseLongitude() {
        return getFieldValue(this.warehouse,LONGITUDE);
    }
 
    setMapMarkers() {
        const latitude = this.warehouseLatitude;
        const longitude = this.warehouseLongitude;
        const name = this.warehouseName;
        if (latitude && longitude) {
            this.mapMarkers = [
                {
                    location: { Latitude: latitude, Longitude: longitude },
                    title: name,
                    description: `Warehouse Location`
                }
            ];
        }
    }
 
    get mapCenter() {
        if (this.mapMarkers.length) {
            return this.mapMarkers[0].location;
        }
        return null;
    }
}