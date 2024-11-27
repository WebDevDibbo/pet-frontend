
const petDetailsParam = () => 
{
    const token = localStorage.getItem('token')
    const param = new URLSearchParams(window.location.search).get("petId");
    console.log(param);
    fetch(`http://127.0.0.1:8000/pet/pet-list/${param}`)
    .then(res => res.json())
    .then(data => displayDetails(data))
    
}
const displayDetails = (pet) => {
    const petDetails = document.getElementById('pet-details-container');
    const div = document.createElement('div');
    div.classList.add('flex','flex-col','md:flex-row','justify-center','gap-8','mt-20','px-8')
    div.innerHTML = 
    `
    <div class="image">
    <img src='${pet.image}'/>
    </div>
    <div class="details ">
    <div class='relative'>
    <h2 class='text-5xl mb-8 font-bold secondary'>Meet ${pet.name} </h2>
    <p class='absolute top-14  h-1 w-72 text-red-500 bg-red-500'></p>
    </div>
    <div class='grid grid-cols-2 gap-y-2 mb-3'>
    <h4 class='secondary font-semibold'><span class='font-semibold  text-md'>Gender</span>: ${pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</h4>
    <h4 class='secondary font-semibold'><span class='font-semibold  text-md'>Age</span>: ${pet.age}</h4>
    <h4 class='secondary font-semibold'><span class='font-semibold  text-md'>Species</span>: ${pet.species}</h4>
    <h4 class='secondary font-semibold'><span class='font-semibold  text-md'>Availability</span>: ${pet.is_available == true? 'Available' : 'Not Available'}</h4>
    </div>
    <h5 class='mb-3 text-teal-500 font-semibold'><span class='font-semibold secondary text-md'>Price</span>: $${pet.price}</h5>
    <p class='mb-6 font-semibold secondary'>${pet.description}</p>
    <button class="btn btn-accent" id="buyBtn-${pet}">Buy Now 👋</button>
    <button class="btn btn-info" onclick="my_modal_5.showModal()"><i class="fa-regular fa-comment"></i>Comment</button>
    </div>
    `
    petDetails.appendChild(div);
    const buyButton = document.getElementById(`buyBtn-${pet}`);
    buyButton.addEventListener('click', () => handlePetBuy(pet));
}

const handleComment = (event) => {
    const userId = localStorage.getItem('userId');
    if(!userId)
    {
        alert('login first');
    }
    event.preventDefault();
    const token = localStorage.getItem('token');
    const petId = new URLSearchParams(window.location.search).get("petId")
    const review_text = document.getElementById('review-text').value;
    const ratings = document.getElementById('ratings').value;

    if (!petId || !review_text || !ratings) {
        alert('All fields must be filled out');
        return;
    }

    

    fetch('http://127.0.0.1:8000/adoption/review/',{
        method : 'POST',
        headers : { Authorization : `Token ${token}`, "content-type":"application/json"},
        body: JSON.stringify({
            pet : petId,
            review_text : review_text,
            ratings : ratings,
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            
            alert(data.error);
            return;
        }
        alert('Review Submitted Successfully')
    })
    
}


const handlePetBuy = (pet) => 
{
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('userId');
    const amount = pet.price;
    fetch('http://127.0.0.1:8000/transactions/transaction/',{
        method : 'POST',
        headers : {Authorization : `Token ${token}`, 'Content-Type': 'application/json'},
        body : JSON.stringify({
            amount : amount,
            transaction_type: 'adoption',
            id : pet.id,
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error)
        {
         alert(data.error);
            
        }
        alert('You have Adopted the pet successfully');
        window.location.href='../user_profile.html'
    })
}

const handleReviews = () => {
    const petId = new URLSearchParams(window.location.search).get("petId");
    fetch(`http://127.0.0.1:8000/adoption/reviews/${petId}`)
    .then(res => res.json())
    .then(data => displayReviews(data))
}
const displayReviews = (Reviews) => {
    const len = Reviews.length
    const reviews = document.getElementById('review_container');
    const nodata = document.getElementById('reviews');
    if(len == 0)
    {
        nodata.style.display = 'none';
        return;
        
    }
    nodata.style.display = 'block'
    Reviews.forEach(review => {
        const div = document.createElement('div');
        div.classList.add(
            'border', 
            'border-base-300', 
            'pb-4', 
            'mb-2', 
            'rounded-lg', 
            'max-w-3xl', 
            'p-4'
        );
        div.innerHTML = `
            <div class="flex items-center mb-2">
            <span class="font-bold text-lg text-gray-700 mr-4">${review.user}</span>
            <span class="text-yellow-500 inline-block">${review.ratings}</span>
            </div>
            <p class="text-gray-600">${review.review_text}</p>
        
        `
        reviews.appendChild(div);
    })

    
}
handleReviews()
petDetailsParam()
