export class User {
    constructor(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
    }

    isAuth() {
        const header = document.querySelector('.header');
        header.insertAdjacentHTML('beforeend', `
            <button type="" class="button header__button-logout">${this.firstName} ${this.secondName}
                <img class="header__logout-img" src="../../images/icon_logout_white.png">
            </button>
        `)
        
        this.logout();
    }

    logout() {
        const buttonLogout = document.querySelector('.header__button-logout');
        buttonLogout.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            localStorage.removeItem('secondName');

            window.location.href = './index.html'
        })
    }
}