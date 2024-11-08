import {
    setFormValue,
    submitSignUpForm,
    validateEmail,
    validatePhone,
    validatePassword,
    validatePasswordMatch,
    getValidationStatus,
    validateNotEmpty,
    setFormInValue,
    submitSignInForm,
    getValidationStatusIn
} from "./utils.js";

const first_name_id = 'first_name';
const last_name_id = 'last_name';
const password_id = 'password';
const password_repeat_id = 'password-repeat'
const email_id = 'email';
const phone_id = 'phone';
const login_email_id = 'login_email';
const login_password_id = 'login-password'

const sign_up_btn_id = 'sign_up_btn';
const sign_in_btn_id = 'sign_in_btn';
const sign_up_form_id = 'sign_up_form';
const sign_in_form_id = 'sign_in_form';
const sign_in_link_id = 'sign_in_link';
const sign_up_link_id = 'sign_up_link';

document.addEventListener("DOMContentLoaded", () =>{
    const signUpButton = document.getElementById(sign_up_btn_id);
    const signInButton = document.getElementById(sign_in_btn_id);

    // Функция обновления состояния кнопок
    const updateButtonState = () => {
      const isSignUpFormValid = getValidationStatus();
      signUpButton.disabled = !isSignUpFormValid;

      const isSignInFormValid = getValidationStatusIn();
      signInButton.disabled = !isSignInFormValid;
    };

    // Обработчик ввода
    const first_name = document.getElementById(first_name_id);
    first_name.oninput = (e) => {
      setFormValue(first_name_id, e.target.value, validateNotEmpty);
      updateButtonState();
    };

    const last_name = document.getElementById(last_name_id);
    last_name.oninput = (e) => {
      setFormValue(last_name_id, e.target.value, validateNotEmpty);
      updateButtonState();
    };

    const phone = document.getElementById(phone_id);
    phone.oninput = (e) => {
      setFormValue(phone_id, e.target.value, validatePhone);
      updateButtonState();
    };

    const email = document.getElementById(email_id);
    email.oninput = (e) => {
      setFormValue(email_id, e.target.value, validateEmail);
      updateButtonState();
    };

    // 1. Реализовать валидацию пароля
    const password = document.getElementById(password_id);
    password.oninput = (e) => {
      setFormValue(password_id, e.target.value, validatePassword);
      updateButtonState();
    };

    const passwordRepeat = document.getElementById(password_repeat_id);
    passwordRepeat.oninput = (e) => {
        const isMatch = validatePasswordMatch(password.value, e.target.value);
        setFormValue(password_repeat_id, e.target.value, (value) => isMatch);
        updateButtonState();
    };

    const login_email = document.getElementById(login_email_id);
    if (login_email) {
        login_email.oninput = (e) => {
          setFormInValue(login_email_id, e.target.value, validateEmail);
          updateButtonState();
        };
    }

    const login_password = document.getElementById(login_password_id);
    if (login_password){
        login_password.oninput = (e) => {
          setFormInValue(login_password_id, e.target.value, validatePassword);
          updateButtonState();
        };
    }

    // 2. Реализовать форму авторизации по аналогии с формой регистрации.
    const switchToSignUpForm = () => {
        document.getElementById(sign_in_form_id).style.display = "none";
        document.getElementById(sign_up_form_id).style.display = "block";
    };

    const switchToSignInForm = () => {
        document.getElementById(sign_in_form_id).style.display = "block";
        document.getElementById(sign_up_form_id).style.display = "none";
    };

    document.getElementById(sign_in_link_id).onclick = (e) => {
        e.preventDefault();
        switchToSignInForm();
    };

    document.getElementById(sign_up_link_id).onclick = (e) => {
        e.preventDefault();
        switchToSignUpForm();
    };

    // 3. Блокировать кнопку регистрации/авторизации пока все поля не станут валидными
    signUpButton.onclick = (e) => {
        e.preventDefault();
        if (submitSignUpForm()) {
            alert("Registration successful!");
            switchToSignInForm();
        } else {
            alert("Please fill in all fields correctly.");
        }
    };
    signInButton.onclick = (e) => {
        e.preventDefault();

        if (submitSignInForm()) {
            alert("Login successful!");
        } else {
            alert("Please fill in all fields correctly.");
        }
    };

    updateButtonState();
});