//  ======load data with api ==============
// const apiData = () => {
// 	fetch('https://openapi.programming-hero.com/api/phones?search=samsung')
// 	.then(res => res.json())
// 	.then(data =>DisplayPhone(data))
// }

const loadData = async(seachText ='sam',isShowMore) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${seachText}`;
	const res = await fetch(url);
	const data = await res.json();
	DisplayPhone(data.data,isShowMore);
}
loadData();

const DisplayPhone = (phone,isShowMore) => {
	// console.log(isMore);
	const PhoneContainer = document.getElementById('simplePhoneContainer');
	const errorMessage = document.getElementById('error');
	const showMoreContainer = document.getElementById('showMoreContainer');
	PhoneContainer.innerHTML = '';
	const phones = phone;
	// show more 
	if(phones.length >= 6 && !isShowMore) {
		showMoreContainer.classList.remove('hidden')
	} else {
      showMoreContainer.classList.add('hidden')
	}
	// error message 
	if (phones.length > 0) {
		errorMessage.classList.add('hidden');
	} else {
		errorMessage.classList.remove('hidden');
	}
	
	phoneData = phones
    if(!isShowMore) {
		phoneData = phones.slice(0,6)
	}
     

	phoneData.forEach((Phone) => {
    //  console.log(Phone);
	 const div = document.createElement("div");
	 div.innerHTML = `
	 <div class="card w-96 bg-base-100 shadow-xl grid">
	 <figure class="px-10 pt-10">
	   <img src=${Phone.image} alt="Shoes" class="rounded-xl" />
	 </figure>
	 <div class="card-body items-center text-center">
	 <h2 class="card-title">${Phone.brand}</h2>
	   <p>If a dog chews shoes whose shoes does he choose?</p>
	   <h3 class="font-semibold text-xl items-start">Price :$850</h3>
	   <div class="card-actions">
		 <button onclick="showModal('${Phone.slug}')" class="btn btn-primary mt-3">show details</button>
	   </div>
	 </div>
   </div>
	 `;

	 PhoneContainer.appendChild(div);
	});
	loadingPage(false);
};

// search phone 
const searchPhone = (isMore) => {
	loadingPage(true);
      const searchField = document.getElementById('search-field').value;
	// console.log( searchField);
	
	if (searchField === '') {
		loadData(searchField ='iphone', isMore );
	}
	loadData(searchField,isMore);
}

// loading part 
const loadingPage = (isLoading) => {
	const loading = document.getElementById('loading');

	if (isLoading){
		loading.classList.remove('hidden');
	} else {
		loading.classList.add('hidden');
	}
}
// show more part 
const showMore = () => {
	searchPhone(true)
}

// show modal 
const showModal = async(id) => {
	const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
	const data =await res.json();
	showModalDetails(data.data);
	console.log(data.data);

	my_modal_1.showModal()
}

const showModalDetails = (phone) => {
	const modalDetails = document.getElementById('show-modal-details');

	
	modalDetails.innerHTML = `
	                <img class="mx-auto" src="${phone?.image}">
	                <h3 class="text-2xl font-bold mt-2 mb-2">${phone?.brand}</h3>
	                <h3 class="text-xl font-semibold ">${phone?.name}</h3>
	                <h3 class="text-xl font-semibold ">${phone?.mainFeatures?.memory}</h3>
	                <h3 class="text-xl font-semibold ">${phone?.releaseDate}</h3>
					
	`
	
}

