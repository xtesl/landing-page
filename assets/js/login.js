const email = document.getElementById('exampleInputEmail1');
const password = document.getElementById('exampleInputPassword1');
const submit = document.getElementById('submit');
const spinner = document.getElementById('spinner');
const message = document.getElementById('modal_message');
const modal = document.getElementById('shareModal');


const login = (e)=>{
    e.preventDefault();
      spinner.style.display = 'block';
     fetch('https://api.learnnet.africa/api/v1/auth/login/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': email.value.trim(),
            'password': password.value.trim(),
        })

     }).then((response)=>{
        if(!response.ok){
            if (response.status == '429'){
                message.innerText = "Too many attempts, try again later"
                modal.style.display = 'block';
            }
            if(response.status == '400'){
                message.innerText = "Incorrect credentials";
                modal.style.display = 'block';
            }
            if(response.status == '500'){
                message.innerText = 'Something went wrong, please try again later';
                modal.style.display = 'block';
            }
          throw new Error(`Error with status: ${response.status}`)
        }

        return response.json();
        
     }).
     then((data)=>{
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('user_pk', data.user.pk);
        localStorage.setItem('firstname', data.user.first_name);
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'dashboard.html';
     }).catch((error)=>{
        if(error instanceof TypeError){
            message.innerText = "Connection Failed!";
            modal.style.display = 'block';
        }
     }).
     finally(()=>{
       spinner.style.display = 'none';
     });
}

submit.addEventListener('click', login, false);


function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
  }