// const loadPhon = () => {
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

const loadPhon = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phonInfos = data.data;
    // console.log(data);
    // console.log(phonInfos);
    displayPhones(phonInfos);
}


const displayPhones = phones => {   
//    console.log(phones);

const phoneContainer = document.getElementById('phone-container');
// clear phon container cards before adding new cards
phoneContainer.textContent = '';

//  show all  button hidden
const showAllButton = document.getElementById('show-all-container');
if(phones.length > 10){
  showAllButton.classList.remove('hidden');
}
else{
  showAllButton.classList.add('hidden');
}
// display only first ten product informations
  phones = phones.slice(0, 10);

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
      <button class="btn btn-primary">Buy Now</button>
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

const handleSearchButton = () => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('input-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhon(searchText);
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

// loadPhon();