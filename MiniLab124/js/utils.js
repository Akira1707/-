const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде

export const validateNotEmpty = (value) => {
  return value.trim() !== '';
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(?:\+?\d{1,3})?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return String(phone).match(phoneRegex);
}

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return String(password).match(passwordRegex);;
}

export const validatePasswordMatch = (password, repeatPassword) => {
  return password === repeatPassword;
};

export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return String(email)
    .toLowerCase()
    .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue;
  if (validator !== undefined) {
    const isValid = validator(newValue);
    formValidation[valueKey] = isValid;

    const element = document.getElementById(valueKey);
    if (isValid) {
      element.classList.add("valid");
      element.classList.remove("invalid");
    } else {
      element.classList.add("invalid");
      element.classList.remove("valid");
    }
  }
};


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}

const formInValues = {}
const formInValidation = {}

export const getValidationStatusIn = () => {
  return Object.values(formInValidation).every((validationStatus) => !!validationStatus)
}

export const setFormInValue = (valueKey, newValue, validator) => {
  formInValues[valueKey] = newValue;
  if (validator !== undefined) {
    const isValid = validator(newValue);
    formInValidation[valueKey] = isValid;

    const element = document.getElementById(valueKey);
    if (isValid) {
      element.classList.add("valid");
      element.classList.remove("invalid");
    } else {
      element.classList.add("invalid");
      element.classList.remove("valid");
    }
  }
};

export const submitSignInForm = () => {
  if (!getValidationStatusIn()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formInValues)
  return true
}