import { LightningElement, wire } from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';
import WAREHOUSE_OBJECT from '@salesforce/schema/Warehouse__c';
import NAME_FIELD from '@salesforce/schema/Warehouse__c.Name';
import ADDRESS_FIELD from '@salesforce/schema/Warehouse__c.Address__c';
import OWNER_FIELD from '@salesforce/schema/Warehouse__c.OwnerId';
import STATUS_FIELD from '@salesforce/schema/Warehouse__c.Status__c';

// Define the columns for the datatable
const columns = [
    { label: 'Warehouse Name', fieldName: 'Name', type: 'text' },
    { label: 'Address', fieldName: 'Address__c', type: 'text' },
    { label: 'Owner', fieldName: 'OwnerId', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' }
];

export default class AllWarehouse extends LightningElement {
    // Property to hold the data for the datatable
    data = [];
    // Columns configuration for the datatable
    columnsList = columns;
    // Error property to hold any errors
    error;

    // Wire adapter to fetch all warehouse records
    @wire(getRecords, {
        fields: [NAME_FIELD, ADDRESS_FIELD, OWNER_FIELD, STATUS_FIELD],
        objectApiName: WAREHOUSE_OBJECT
    })
    wiredRecords({ error, data }) {
        if (data) {
            this.data = data.records.map(record => ({
                Id: record.id,
                Name: record.fields.Name.value,
                Address__c: record.fields.Address__c.value,
                OwnerId: record.fields.OwnerId.value,
                Status__c: record.fields.Status__c.value
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
}
