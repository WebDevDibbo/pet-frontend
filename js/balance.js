const user_Id = localStorage.getItem('userId');
const token = localStorage.getItem('token')

function userBalance(){
    if(user_Id)
        {
            fetch(`http://127.0.0.1:8000/users/list/${user_Id}`,{
                method : 'GET',
                headers: { Authorization : `Token ${token}`},
            })
            .then(res => res.json())
            .then(data => {
                const bal = document.getElementById('bal');
                const btnbal = document.getElementById('balbtn');
                btnbal.style.display = 'inline-block';
                bal.innerHTML = data.balance;
            })
        }
}
userBalance()

