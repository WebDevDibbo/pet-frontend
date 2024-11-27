
const handleRegistration = (event) => {
    
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");

    if(password != confirm_password)
    {
        document.getElementById("error").innerText = "Password and Confirm password doesn't match";
        return;
    }
    document.getElementById("error").innerText = "";
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) == false)
    {
        document.getElementById("error").innerText = "Password must contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        return;
    }
    const info = {
        username,first_name,last_name,email,password,confirm_password
    }
    // console.log(info);
    fetch("http://127.0.0.1:8000/users/register/",{
        method : "POST",
        headers : {"content-type":"application/json"},
        body : JSON.stringify(info)
    })
    .then(res => {
        if (res.ok) {
            // Registration successful
            return res.json();
        } else {
            // Handle errors
            return res.json().then((error) => {
                throw new Error(JSON.stringify(error));
            });
        }
    })
    .then(data => {
        console.log('register successfully',data);
        window.location.href = '/'
    })
    .catch((error) => {
        console.error("Error:", error.message);
        alert("Registration failed: " + error.message);
    });    
}

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}
const loginbtn = document.getElementById('loginbtn');

const  showToast =() =>{
    const toast = document.getElementById('toast');
    toast.classList.add('visible'); 
    setTimeout(() => {
      toast.classList.remove('visible'); 
      window.location.href = '../user_profile.html';
    }, 1000); 
}

const handleLogin = (e) => {
    e.preventDefault();
    let username = getValue("username");
    let password = getValue("password");
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    fetch("http://127.0.0.1:8000/users/login/",{
        method : "POST",
        headers : {"content-type":"application/json"},
        body : JSON.stringify({username,password})
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.token)
            {
                localStorage.setItem('token',data.token)
                localStorage.setItem('userId',data.user_id)
                showToast();
                username = ''
                password = ''
            }
            else{
                errorMessage.textContent = data.errors || "Login failed. Please try again.";
                errorMessage.classList.remove("hidden");
            }

        })
        .catch((error) => {
            errorMessage.textContent = error.message;
            errorMessage.classList.remove("hidden");
        });
    
}


const handleLogout = () => {

    const token = localStorage.getItem("token")
    fetch('http://127.0.0.1:8000/users/logout',{
        method : "GET",
        headers : { Authorization : `Token ${token}`, "content-type":"application/json"}
    })
    .then(res => res.json())
    .then(data => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        window.location.href = '/'
    });
    
    
}