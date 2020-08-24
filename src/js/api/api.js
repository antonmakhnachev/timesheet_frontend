export class Api {
    constructor() {

    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    };


    getAllPositions() {

    }
}