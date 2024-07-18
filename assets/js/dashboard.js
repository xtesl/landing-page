document.addEventListener("DOMContentLoaded", function() {
     document.getElementById('welcome-msg').innerText = localStorage.getItem('firstname');
     
     getAffiliateData();
  });

  const amount = document.getElementById('amount');
  const net = document.getElementById('net');
  const sales =  document.getElementById('sales');

 function getAffiliateData(){
           const user_pk = localStorage.getItem('user_pk');
           const spinner = document.getElementById('spinner');
           spinner.style.display = 'block';
           fetch(`https://api.learnnet.africa/api/v1/affiliate/data/${user_pk}/`, {
             method: 'GET',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
             }
           }).then(response => {
            if(!response.ok){
                 if(response.status == '403'){
                   amount.innerText = '$ 0.00';
                   net.innerText = '$ 0.00';
                   sales.innerText = '0';
                 }
                 if(response.status=='401'){
                    localStorage.setItem('isLoggedIn', false);
                    window.location.href = 'login.html';
                 }

                throw new Error(`Error status: ${response.status}`);
            }
            return response.json();
           }).then(data =>{
              document.getElementById('withdraw').style.display = 'block';
               amount.innerText = `$ ${data.balance}`;
               net.innerText = `$ ${data.net_income}`;
               sales.innerText = data.sales;
           }).
           catch(error => console.error(error)).finally(()=>{
            spinner.style.display = 'none';
           });
 }