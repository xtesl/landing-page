const paymentForm = document.getElementById('paymentForm');
const course = JSON.parse(localStorage.getItem('course'));
const message = document.getElementById('modal_message');
const modal = document.getElementById('shareModal');
const spinner =  document.getElementById('spinner');

document.addEventListener('DOMContentLoaded', ()=>{
 
paymentForm.addEventListener("submit", payWithPaystack, false);


});

async function getRef() {
    const token = localStorage.getItem('accessToken');
    spinner.style.display = 'block';
    try {
        const response = await fetch('https://api.learnnet.africa/api/v1/payment/course/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'course': course.id
            })
        });

        if (!response.ok) {
            if (response.status == '401') {
                localStorage.setItem('isLoggedIn', false);
                window.location.href = 'login.html';
                return;
            }
            if (response.status == '400') {
                message.innerText = 'You have already purchased this course.';
                modal.style.display = 'block';
                return;
            }
            throw new Error(`Error code: ${response.status}`);
        }

        const data = await response.json();
        return data.data.transaction_id;
    } catch (error) {
        if(error instanceof TypeError){
            modal.style.display = 'block';
            message.innerText = 'Connection Failed';
        }
    } finally{

        spinner.style.display = 'none';
    }
}


async function payWithPaystack(e) {
    e.preventDefault();
    const ref = await getRef();
    if(ref){
    let handler = PaystackPop.setup({
        key: 'pk_live_0b93823827837a2005ccc05489e50ea5c6858607',
        email: document.getElementById("email-address").value,
        amount: document.getElementById("amount").value * 100,
        ref: ref,
        currency: 'GHS',
        channels: ['mobile_money', 'card', 'ussd'],
        onClose: function() {
            modal.style.display = 'block';
            message.innerText = 'You are cancelling the payment process';
        },
        callback: function(res) {
            const ref = res.reference;
            spinner.style.display = 'block';
            fetch(`https://api.learnnet.africa/api/v1/payment/verify/${ref}`,
                {
                     method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            ).then(response => {
                 
                if(!response.ok){
                    if (response.status == '504'){
                        modal.style.display = 'block';
                        message.innerText = 'Failed to verify payment, if your payment was successful, please contact customer care.';
                    }
                    if(response.status == '401'){
                        localStorage.setItem('isLoggedIn', false);
                        window.location.href = 'login.html';
                    }
                    if(response.status == '403'){
                        modal.style.display = 'block';
                        message.innerText = 'Your payment was not successful.'
                    }
                    throw new Error(`Error code: ${response.status}`)
                }

                return response.json();
            }).then(data=>{

            }).catch(error=>{

            }).finally(()=>{
               spinner.style.display = 'none';
            })
        }
    });

    handler.openIframe();
}
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}
