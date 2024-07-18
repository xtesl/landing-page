const email = document.getElementById('email');
const password = document.getElementById('password');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const submit = document.getElementById('submit');
const spinner = document.getElementById('spinner');
const message = document.getElementById('modal_message');
const modal = document.getElementById('shareModal');


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

const signUp = (e)=>{
    e.preventDefault();
    spinner.style.display = 'block';
    fetch('https://api.learnnet.africa/api/v1/auth/signup/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                'first_name': firstname.value.trim(),
                'last_name': lastname.value.trim(),
                'email': email.value.trim(),
                'password': password.value.trim(),
                'username': username.value.trim()
            }
        ) 
    }).then(response => {

        if(!response.ok){
             message.innerText = "Invalid input";
             modal.style.display = 'block';
            throw new Error(`Error code: ${response.status}`)
        }
    }).
    then((data)=>{
        window.location.href = 'login.html';
    }).
catch(error => {
    if(error instanceof TypeError){
        message.innerText = "Connection Failed!";
        modal.style.display = 'block';
    }
}).finally(()=>{
        spinner.style.display = 'none';
    });
    

}


function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
  }

submit.addEventListener('click', signUp, false);
  