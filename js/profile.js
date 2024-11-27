const user_id = localStorage.getItem('userId')
if(!user_id)
{
    const profile = document.getElementById('profile-drawer');
    profile.style.display ='none'
}

const handleProfile = (btnname) => {

    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    fetch(`http://127.0.0.1:8000/users/list/${userId}`,{
      method : 'GET',
      headers: { Authorization : `Token ${token}`},
    })
    .then(res => res.json())
    .then(data => displayProfile(data,btnname))
}
const displayProfile = (profile,btnname) => {
    
    const mainContent = document.getElementById('main-content');
    if(btnname == 'btn1')
    {
    mainContent.innerHTML = 
    `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow rounded-lg p-6 w-full max-w-md">
    
    <h2 class='text-2xl font-bold bg-green-400 text-center rounded mb-6 p-2 primary'>Balance : $${profile.balance}</h2>

    <!-- Avatar Section -->
    <div class="flex justify-center mb-4">
      <div class="avatar">
        <div class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="../images/avatar.png" alt="User Avatar">
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <form onsubmit="onclick=handleUpdate(event)" class="space-y-4">
      <!-- username Field -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input 
          id="username" 
          type="text" 
          value='${profile.username}' 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <!-- first name Field -->
      <div>
        <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
        <input 
          id="firstname" 
          type="text" 
          value='${profile.first_name}' 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <!-- last_name Field -->
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input 
          id="lastname" 
          type="text" 
          value='${profile.last_name}' 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <!-- email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          id="email" 
          type="email" 
          value='${profile.email}'
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>


      <!-- Save Button -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>

    `
    }
    else if(btnname == 'btn2')
    {
        const token = localStorage.getItem('token')
        fetch('http://127.0.0.1:8000/adoption/adopt/',{
            method : 'GET',
            headers : { Authorization : `Token ${token}`, "content-type":"application/json"},
        })
        .then(res => res.json())
        .then(data => displayOrder(data))
    
    }
    else 
    {
      mainContent.innerHTML = 
      `
    <form onsubmit="onclick=handlePassword(event)" id="changePasswordForm" class="max-w-sm mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg space-y-6">
      <!-- Old Password Field -->
      <div>
          <label for="old_password" class="block text-sm font-medium text-gray-700">Old Password</label>
          <input type="password" id="old_password" name="old_password" required
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <!-- New Password Field -->
      <div>
          <label for="new_password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input type="password" id="new_password" name="new_password" required
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <!-- Confirm Password Field -->
      <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input type="password" id="confirm_password" name="confirm_password" required
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <!-- Submit Button -->
      <div>
          <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Change Password</button>
              <div id="errorMessages" class="mt-4 text-red-500 text-sm"></div>
      </div>
    </form>

      `
    }
document.getElementById('my-drawer').checked = false; 
}

const displayOrder = (orders) => {
    const mainContent = document.getElementById('main-content');
    let tableContent;
    if(orders.length > 0)
    {
    tableContent = `
    <div class="overflow-x-auto mt-20 px-20">
        <table class="table border border-teal-500">
            <!-- head -->
            <thead >
                <tr>
                    <th class='primary text-lg'>Id</th>
                    <th class='primary text-lg'>Name</th>
                    <th class='primary text-lg'>Price</th>
                    <th class='primary text-lg'>Age</th>
                    <th class='primary text-lg'>Purchase Date</th>
                </tr>
            </thead>
            <tbody>
    `;
    orders.forEach(order => {
        tableContent += `
            <tr>
                <th class='font-bold secondary'>${order.id}</th>
                <td>
                    <div class="flex items-center gap-3">
                        <div class="avatar">
                            <div class="mask mask-squircle h-12 w-12">
                                <img src="http://127.0.0.1:8000/media/${order.image}" alt="Avatar" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold secondary">${order.name}</div>
                        </div>
                    </div>
                </td>
                <td class='font-bold secondary'>
                    $${order.price}
                </td>
                <td class='font-bold secondary'>${order.age} year</td>
                <td class='font-bold secondary'>${order.adoption_date}</td>
            </tr>
        `;
    });

    tableContent += `
    </tbody>
    </table>
    </div>
    `;
    }
    else
    {
        tableContent = 'No data Found'
    }
    mainContent.innerHTML = tableContent 
    
}


const handleUpdate = (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const first_name = document.getElementById('firstname').value;
  const last_name = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const userId = localStorage.getItem('userId');
  const user = {
    username : username,
    first_name : first_name,
    last_name : last_name,
    email : email
  }
  fetch(`http://127.0.0.1:8000/users/list/${userId}/`,{
    method : 'PATCH',
    headers : {'content-type':'application/json'},
    body : JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    if(data)
      alert('updated data successfully')
  })
}

const handlePassword = (e) => {
  e.preventDefault();
  const old_password = document.getElementById('old_password').value;
  const new_password = document.getElementById('new_password').value;
  const confirm_password = document.getElementById('confirm_password').value;
  const token = localStorage.getItem('token');

  if (new_password !== confirm_password) {
    document.getElementById('errorMessages').innerHTML = "New passwords do not match.";
    return;
  }
  const passdata = {
    old_password : old_password,
    new_password : new_password,
    confirm_password : confirm_password,
  }
  fetch('http://127.0.0.1:8000/users/changepassword/',{
    method : 'POST',
    headers : {Authorization : `Token ${token}`, 'Content-Type': 'application/json'},
    body : JSON.stringify(passdata)
  })
  .then(res => res.json())
  .then(data => {
    if(data)
    {
      if (data.error) {
        document.getElementById('errorMessages').innerHTML = data.error;
      }
      else{
        alert('Password Changed Successfully')
        window.location.href = './'
      }
      
    }
  });
  
}