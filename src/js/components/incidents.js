export class Incidents {
    constructor(api) {
        this.api = api;
    };

    _clearTable(table) {       
        const tableBody = table.querySelector('.table__body');        
        if (tableBody) {            
            table.removeChild(tableBody)
        };       
    };    

    async addDocument(staffList, idIncident, dateFrom, dateTo, isDraft) {
        const newId = await this.api.createNewId();
        let isIncluded = 1;        
        for (const staff of staffList) {
            if (staff.selected) {
                if (idIncident === '917DC484-E1DF-4B0D-99EA-58C0273D0B9F') { // НРД
                    isIncluded = 0;
                    await this.api.addUnnormalHours(staff.value, dateFrom, dateTo, newId.newId[0].NEW_ID);
                }
                await this.api.addDocument(newId.newId[0].NEW_ID, idIncident, staff.value, dateFrom, dateTo, isDraft, isIncluded);
            };
        };            
    };   

    async getAllDocuments(dateFrom = '2020-01-01', dateTo = '9999-12-31') {
        const table = document.getElementById('incidents');

        this._clearTable(table);
        
        const tableBody = document.createElement('tbody');
        tableBody.classList.add('table__body');        
        
        try {
            const documents = await this.api.getAllDocuments(dateFrom, dateTo);
            for (const documentData of documents.documents) {
                const number = `${documents.documents.indexOf(documentData) + 1}`;
                const status = documentData.IS_DRAFT === 0 ? 'Проведен' : 'Черновик';
                let arrStaff = [];
                const staffList = await this.api.getDocumentStaff(documentData.ID_DOCUMENT);
                for (const staff of staffList.staff) {                                
                    arrStaff.push(staff.STAFF_NAME)
                };
                await this.createDocumentTable(tableBody, number, documentData, status, arrStaff);
                
            };
            table.appendChild(tableBody);
        } catch (err) {
            console.log(err)
        }
    };

    createDocumentTable(tableBody, number, documentData, status, arrStaff) {        
        // const tableBody = document.querySelector('.table__body');
        const tableRow = document.createElement('tr');

        tableRow.insertAdjacentHTML('beforeend', `           
            <td class="table__cell"><img class="table__delete" src="../images/icon_delete_blue.png"></td>
            <td class="table__cell">${number}</td>
            <td class="table__cell"><a href="">${documentData.INCIDENT_NAME}</a></td>                
            <td class="table__cell">${documentData.DATE_FROM.slice(0,10)}</td>
            <td class="table__cell">${documentData.DATE_TO.slice(0,10)}</td>
            <td class="table__cell">${arrStaff.join('; ')}</td>
            <td class="table__cell">${documentData.USER_NAME}</td>
            <td class="table__cell">${documentData.DATE_CREATED.slice(0,10)}</td>
            <td class="table__cell">${status}</td>          
        `);

        tableRow.classList.add('table__row');
        tableRow.setAttribute('id', documentData.ID_DOCUMENT);

        tableBody.appendChild(tableRow);

        const deleteIcon = tableRow.querySelector('.table__delete');
        deleteIcon.addEventListener('click', () => {
            this.deleteDocument(event);
        });       

        return tableBody;
    };

    async deleteDocument(event) {
        const idDocument = event.target.closest('.table__row').id;

        await this.api.deleteDocument(idDocument);
        await this.getAllDocuments();
    };
};