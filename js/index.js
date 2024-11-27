
const loadPets = () => 
{
  fetch("http://127.0.0.1:8000/pet/pet-list/")
  .then((res) => res.json())
  .then((data) => displayPets(data));
};


const displayPets = (pets) => {
  pets.forEach((pet) => {
  const parent = document.getElementById("pet-container");
  const div = document.createElement("div");
  div.classList.add("card",'shadow-lg','shadow-cyan-500/50');
  div.style.width = '18rem';
  div.style.borderRadius = "0";
  div.innerHTML = `
  <img style='height:25vh;' src="${pet.image}" class="card-img-topobject-fit-cover" alt="...">
  <div class="card-body p-4">
  <h5 class="card-title secondary">${pet.name}</h5>
  <p class="text-left secondary">${pet.description.slice(0,100)}..</p>
  <h5 class='mb-3 primary font-medium text-lg text-left'>Price : <span class='text-red-500 font-semibold'> $${pet.price}</span> </h5>
  <div class='secondary text-left mb-4 font-semibold'>Category : <span class="bg-teal-600 text-white p-2 rounded">${pet.species}</span></div>
  <button class="btn btn-primary"><a href='pet_details.html?petId=${pet.id}'>View Details</a></button>
  </div>`
  parent.appendChild(div);
  });
};

const userId = localStorage.getItem('userId')
const profilebtn = document.getElementById('profile-btn')
if(userId)
{
  const loginbtn = document.getElementById('loginbtn');
  loginbtn.style.display = 'none'
  
}
else
{
  const logoutbtn = document.getElementById('logoutbtn');
  logoutbtn.style.display = 'none'
  profilebtn.style.display = 'none'
}

loadPets();

   