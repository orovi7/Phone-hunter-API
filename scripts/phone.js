// const loadPhon = () => {
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

const loadPhon = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phonInfos = data.data;
    // console.log(data);
    // console.log(phonInfos);
    displayPhones(phonInfos, isShowAll);
}


const displayPhones = (phones, isShowAll) => {   
//    console.log(phones);

const phoneContainer = document.getElementById('phone-container');
// clear phon container cards before adding new cards
phoneContainer.textContent = '';

//  show all  button hidden
const showAllButton = document.getElementById('show-all-container');
if(phones.length > 10 && !isShowAll){
  showAllButton.classList.remove('hidden');
}
else{
  showAllButton.classList.add('hidden');
}
// display only first ten product informations until clicking show all button
//   phones = phones.slice(0, 10);
  if(!isShowAll){
        phones = phones.slice(0, 10);
  }


  phones.forEach(phone => {
    // console.log(phone);

    // create a div
    const createDiv = document.createElement('div');
    createDiv.classList = `card bg-base-100 p-4 shadow-xl`;
    // set innerHTML 
    createDiv.innerHTML = `
     <figure class="px-10 pt-10">
    <img
      src="${phone.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button onclick = "showDetailsOfPhone('${phone.slug}');show_details_modal_5.showModal()"
       class="btn btn-primary">Show details</button>
    </div>
  </div>
    `;

    // append child

    phoneContainer.appendChild(createDiv); 
  });

  // hide loading spinner
toggleLoadingSpinner(false);
}

// handle search button

const handleSearchButton = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('input-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhon(searchText, isShowAll);
}

// handle search recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhon(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadSpinner = document.getElementById('loading-spinner');
  
  if(isLoading){
    loadSpinner.classList.remove('hidden');
  }
  else{
    loadSpinner.classList.add('hidden');
  }
}

// after clicking show all it should expand and show more phones
const showAllPhones = () => {
    handleSearchButton(true);
}

// by clicking on show details button we will see details of each phone
const showDetailsOfPhone = async (id) => {
  //  console.log(id);
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   console.log(data);
   const newData = data.data;
   showPhoneDetails(newData);
}


const showPhoneDetails = (phone) =>{
  console.log(phone);
  
  // const newPhoneName = document.getElementById('new-phone-name');
  // newPhoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src = "${phone.image}" class ="px-40" alt ="" />
    <h3 id="new-phone-name" class="text-2xl pt-4 font-bold">${phone.name}</h3>
    <p class = "pt-5"><span class = "font-bold">Storage:</span>${phone.mainFeatures.storage}</p>
    <p class = "pt-2"><span class = "font-bold">Display Size:</span>${phone.mainFeatures.displaySize}</p>
    <p class = "pt-2"><span class = "font-bold">Chipset:</span>${phone.mainFeatures.chipSet}</p>
    <p class = "pt-2"><span class = "font-bold">Memory:</span>${phone.mainFeatures.memory}</p>
    <p class = "pt-2"><span class = "font-bold">Storage:</span>${phone.releaseDate}</p>
    <p class = "pt-2"><span class = "font-bold">Brand:</span>${phone.brand}</p>

  `
  

   show_details_modal_5.showModal()
}



// loadPhon();