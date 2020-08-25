export class FillingReferences {


    positions(input, items) {        
        for (const item of items) {            
            input.insertAdjacentHTML('beforeend', `<option value=${item.ID_POSITION}>${item.POSITION_NAME}</option>`);
        }      
    };

    departments(input, items) {        
        for (const item of items) {            
            input.insertAdjacentHTML('beforeend', `<option value=${item.ID_DEPARTMENT}>${item.DEPARTMENT_NAME_MIDDLE}</option>`);
        }      
    };

    schedules(input, items) {        
        for (const item of items) {            
            input.insertAdjacentHTML('beforeend', `<option value=${item.ID_SCHEDULE}>${item.SCHEDULE_NAME}</option>`);
        }      
    };

    typesWork(input, items) {        
        for (const item of items) {            
            input.insertAdjacentHTML('beforeend', `<option value=${item.ID_TYPE_WORK}>${item.TYPE_WORK_NAME}</option>`);
        }      
    };





}