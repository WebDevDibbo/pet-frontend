
const handleDeposit = (e) => {
    e.preventDefault();
    const amountamountField = document.getElementById('deposit');
    const amount = amountamountField.value;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('userId');
    if(amount <= 0) alert('deposit amount cant be negative');
    if(userId)
    {
      const loginbtn = document.getElementById('loginbtn');
      loginbtn.style.display = 'none'
    }
    else
    {
      const logoutbtn = document.getElementById('logoutbtn');
      logoutbtn.style.display = 'none'
    }

    if(!userId) return alert('login first to deposit');


    fetch('http://127.0.0.1:8000/transactions/transaction/',{
        method : 'POST',
        headers : {Authorization : `Token ${token}`, 'Content-Type': 'application/json'},
        body : JSON.stringify({
            amount : amount,
            transaction_type: 'deposit',
        })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
        amountamountField.value = "";
        alert('deposited successfully')
    })
}

const userId = localStorage.getItem('userId');

if(userId)
{
  const loginbtn = document.getElementById('loginbtn');
  loginbtn.style.display = 'none'
}
else
{
  const logoutbtn = document.getElementById('logoutbtn');
  logoutbtn.style.display = 'none'
}