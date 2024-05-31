import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import WAREHOUSE_OBJECT from '@salesforce/schema/Warehouse__c';
import ADDRESS_FIELD from '@salesforce/schema/Warehouse__c.Address__c';
import NAME_FIELD from '@salesforce/schema/Warehouse__c.Name';
import STATUS_FIELD from '@salesforce/schema/Warehouse__c.Status__c';
import { NavigationMixin } from 'lightning/navigation';

// Define the columns for the datatable
const columns = [
    {
        label: 'Warehouse Name',
        fieldName: 'recordLink',
        type: 'url',
        typeAttributes: {  
            label: {
                fieldName: NAME_FIELD.fieldApiName
            },
            target: '_self'
        }},
    { label: 'Address', fieldName: ADDRESS_FIELD.fieldApiName, type: 'text' },
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName, type: 'text' }
];

export default class AllWarehouse extends NavigationMixin(LightningElement) {
    searchTerm = '';
    data = [];
    columnsList = columns;
    error;

    @wire(getListUi, {
        objectApiName: WAREHOUSE_OBJECT.objectApiName,
        listViewApiName: 'All'
    })
    wiredRecords({ error, data }) {
        if (data) {
            this.data = data.records.records.map(record => {
                const fields = record.fields;
                return {
                    Id: record.id,
                    Name: fields[NAME_FIELD.fieldApiName].value || '',
                    Address__c: fields[ADDRESS_FIELD.fieldApiName].value || '',
                    Status__c: fields[STATUS_FIELD.fieldApiName].value || '',
                    recordLink: '/' + record.id // Construct the URL to the record page
                };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value.toLowerCase();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        return this.data.filter(record =>
            record.Name.toLowerCase().includes(this.searchTerm) ||
            record.Address__c.toLowerCase().includes(this.searchTerm)
        );
    }
}
