export class Incidents {
    constructor(api) {
        this.api = api;
    };

    _clearTable() {
        const tableBody = document.querySelector('.table__body');
        const tableRows = document.querySelectorAll('.table__row');

        if (tableRows) {
            for (const tableRow of tableRows) {
                tableBody.removeChild(tableRow);
            };
        };
    };    

    async addDocument(staffList, idIncident, dateFrom, dateTo, isDraft) {
        const newId = await this.api.createNewId();        
        for (const staff of staffList) {
            if (staff.selected) {
                await this.api.addDocument(newId.newId[0].NEW_ID, idIncident, staff.value, dateFrom, dateTo, isDraft);
            };
        };            
    };   

    async getAllDocuments(dateFrom = '2020-01-01', dateTo = '9999-12-31') {
        this._clearTable()
        
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
                await this.createDocumentTable(number, documentData, status, arrStaff);
            }
        } catch (err) {
            console.log(err)
        }
    };

    createDocumentTable(number, documentData, status, arrStaff) {        
        const tableBody = document.querySelector('.table__body');

        tableBody.insertAdjacentHTML('beforeend', `            
            <tr class="table__row">
                <td class="table__cell">${number}</td>
                <td class="table__cell"><a href="">${documentData.INCIDENT_NAME}</a></td>                
                <td class="table__cell">${documentData.DATE_FROM.slice(0,10)}</td>
                <td class="table__cell">${documentData.DATE_TO.slice(0,10)}</td>
                <td class="table__cell">${arrStaff.join('; ')}</td>
                <td class="table__cell">${documentData.USER_NAME}</td>
                <td class="table__cell">${documentData.DATE_CREATED.slice(0,10)}</td>
                <td class="table__cell">${status}</td>
            </tr>
        `);
    };
};