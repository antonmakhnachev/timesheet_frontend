export class LocalStorageControl {

    setLocalstorage(token, userFirstName, userSecondName) {
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', userFirstName);
        localStorage.setItem('secondName', userSecondName);
    }
}