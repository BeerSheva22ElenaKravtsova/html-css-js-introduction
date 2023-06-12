const REGISTRATION_FORM_ID = 'registration-form';
const IS_REGISTRED_ID = 'is-registered';
const LOGIN_FORM_ID = 'logIn-form';
const USER_NAME_ID = 'userName';
const PASSWORD_ID = 'password';
const NEW_USER_NAME_ID = 'newUserName';
const NEW_PASSWORD_ID = 'newPassword';
const EMAIL_ID = 'email';

export default class LogInForm {
    #loginDataObj;
    #registrationDataObj;
    #loginFormElement;
    #registrationFormElement;
    #parentId;

    constructor(parentId) {
        this.#parentId = parentId;
        this.#loginDataObj = {};
        this.#registrationDataObj = {};
        this.#fillForm();
        this.#setElements();
    }

    #setElements() {
        this.#loginFormElement = document.getElementById(`${this.#parentId}-${LOGIN_FORM_ID}`);
        this.#registrationFormElement = document.getElementById(`${this.#parentId}-${REGISTRATION_FORM_ID}`);
    }

    #fillForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <div class = "login-container">
    
        <form class="registration-form" id="${this.#parentId}-${REGISTRATION_FORM_ID}" method="post">

                <div class="header">Registration:</div>
                <div class="isRegistered"></div>
                <label class="label-input-log" for="${this.#parentId}-${NEW_USER_NAME_ID}"> User Name: </label>
                <input type="text" id="${this.#parentId}-${NEW_USER_NAME_ID}" class="input-control-log" name="newUserName" placeholder="John / John Smith" required>

                <label class="label-input-log" for="${this.#parentId}-${NEW_PASSWORD_ID}">Password: </label>
                <input type="password" id="${this.#parentId}-${NEW_PASSWORD_ID}" class="input-control-log" name="newPassword" required> 
                
                <label class="label-input-log" for="${this.#parentId}-${EMAIL_ID}">Email: </label>
                <input type="email" id="${this.#parentId}-${EMAIL_ID}" class="input-control-log" name="email" placeholder="john@gmail.com" required>  

            <button type="submit" class="registration-buttons">Registrate</button>
            <button type="reset" class="registration-buttons">Reset</button>
        </form>

        <form class="login-form" id="${this.#parentId}-${LOGIN_FORM_ID}" method="post">

                <div class="header">Log In:</div>
                <label class="label-input-log" for="${this.#parentId}-${USER_NAME_ID}">User Name: </label>
                <input type="text" id="${this.#parentId}-${USER_NAME_ID}" class="input-control-log" name="userName" placeholder="John / John Smith" required>

                <label class="label-input-log" for="${this.#parentId}-${PASSWORD_ID}">Password: </label>
                <input type="password" id="${this.#parentId}-${PASSWORD_ID}" class="input-control-log" name="password" required>  

            <button type="submit" class="log-in-buttons">Log In</button>
            <button type="reset" class="log-in-buttons">Reset</button>
        </form>

        </div>
        `
    }

    addLoginHandler(submitFunction) {
        this.#loginFormElement.onsubmit = async (event) => {
            event.preventDefault();
            const logInFormData = new FormData(this.#loginFormElement);            
            this.#loginDataObj.userName = logInFormData.get('userName');
            this.#loginDataObj.password = logInFormData.get('password');
            await submitFunction(this.#loginDataObj);
            this.#loginFormElement.reset();
        }
        this.#loginFormElement.onreset = () => {
            this.#loginDataObj = {};
        }
    }

    addRegistrationHandler(submitFunction){
        this.#registrationFormElement.onsubmit = async (event) => {
            event.preventDefault();
            const registrationFormData = new FormData(this.#registrationFormElement);
            this.#registrationDataObj.userName = registrationFormData.get('newUserName');
            this.#registrationDataObj.password = registrationFormData.get('newPassword');
            this.#registrationDataObj.email = registrationFormData.get('email');
            await submitFunction(this.#registrationDataObj);
            this.#registrationFormElement.reset();
        }
        this.#registrationFormElement.onreset = () => {
            this.#registrationDataObj = {};
        }
    }
} 