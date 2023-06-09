const myform = document.getElementById("myform") 
const nameinput = document.getElementById("name")
const emailinput = document.getElementById("email")
const numberinput = document.getElementById("number")
const checkboxinput = document.getElementById("privacy-agreement")
const submitinput = document.getElementById("submit-btn")

checkboxinput.addEventListener("change", () => {
    if (checkboxinput.checked) {
        submitinput.removeAttribute ("disabled")
    } else {
        submitinput.setAttribute ("disabled",true)
    }
     
} )

myform.addEventListener("submit", (e) => {
    if (!checkboxinput.checked) {
        e.preventDefault()
        alert("Recuerda aceptar los términos y condiciones")

    } else{
        let user = {name:nameinput.value, 
                    email:emailinput.value, 
                    number: numberinput.value}

      userData(user)
      console.log("send");             
    }
    
}
)

async function userData(user) {
    const data = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    }
    await fetch('/user',data);
}


/*const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const privacyCheckbox = document.querySelector('.form-checkbox');
const submitBtn = document.querySelector('.form-btn');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputNumber = document.querySelector('#phone');
const inputPrivacy = document.querySelector('#privacy-agreement');

console.log(formInputs)
let inputStates = {
    hasName: false,
    hasEmail: false,
    hasPhone: false,
    hasAgree: false,
};
console.log(`inputStates:`);
console.log(inputStates)

const checkInputs = (event) => {
    //let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates;
    inputStates.hasName = inputName.value != '' ? true : false;
    inputStates.hasEmail = inputEmail.value != '' ? true : false;
    inputStates.hasPhone = inputPhone.value != '' ? true : false;
    inputStates.hasAgree = inputPrivacy.checked;

    console.log(`inputStates:`);
    console.table(inputStates);
    let { hasName, hasEmail, hasPhone, hasAgree } = inputStates

    if (hasName && hasEmail && hasPhone && hasAgree) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    return event;
}

privacyCheckbox.addEventListener('change', checkInputs);
formInputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


function resetInputs() {
    formInputs.forEach(input => {
        input.value = '';
    })
    privacyCheckbox.checked = false;
    submitBtn.disabled = true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    newUser = {
        name: inputName.value,
        email: inputEmail.value,
        number:inputNumber.value,
        privacyAgreement: inputPrivacy.checked
    };
    sendUserData(newUser);
    resetInputs();
    console.log(`submited:`);
    console.log(newUser);
});

async function sendUserData(userData) {
    console.log(':D POST');
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    return await fetch(`/user`, request);
}*/