
lucide.createIcons();

const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const imageGrid = document.getElementById('imageGrid')
const carBtn = document.getElementById('carBtn')
const natureBtn = document.getElementById('natureBtn')
const travelBtn = document.getElementById('travelBtn')
const loadBtn = document.getElementById('loadMoreBtn')
const picBtn = document.querySelectorAll(".pics-btn")

const Access_Key = "KEv6T0R2L5Mkzsd5X-2fa9i4q4qqKkBqFaREaHwXyJ0";


let currentQuery = "";
let page = 1;


async function getImages() {

    try{

        imageGrid.innerHTML = "<h2>Loading...</h2>";

    const response = await fetch("https://api.unsplash.com/photos/random?count=2",
        {
            headers: {
                Authorization: `Client-ID ${Access_Key}`
            }
        }
    );

    if(!response.ok){

        throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    imageGrid.innerHTML = "";

    data.forEach(photo => createCard(photo))
        
  }

  catch(error){

    imageGrid.innerHTML = '<h2>Unable to load images</h2>'
    console.error(error);
    
  }
}

getImages();



searchBtn.addEventListener('click',function () {
    
    const query = searchInput.value;
    
    if(query.trim() === ''){
        return;
    }


    currentQuery = query;
    page = 1;
    
    imageGrid.innerHTML = "";

    searchImage(currentQuery);

    loadBtn.style.display = "block";
})


async function searchImage(query){


try{


    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=5`;


    const response = await fetch(url,
        {
            headers: {
                Authorization: `Client-ID ${Access_Key}`
            }
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch images")
    }
    
    const data = await response.json();
    
         if(data.results.length === 0){

        imageGrid.innerHTML = "<h2>No images found</h2>"

        loadBtn.style.display = "none";

        return;
    }


    data.results.forEach(photo => createCard(photo))

}

catch(error){

imageGrid.innerHTML = "<h2>Something went wrong </h2>"

console.log(error);

}
    
}

carBtn.addEventListener('click',function (){

   currentQuery = "cars";
   page=1;
   imageGrid.innerHTML = "";

    loadBtn.style.display = "block";

   searchImage(currentQuery);
    
})

natureBtn.addEventListener('click',function(){

    currentQuery = "nature";
    page = 1;
    imageGrid.innerHTML = "";

    loadBtn.style.display = "block";

    searchImage(currentQuery);
})

travelBtn.addEventListener('click',function(){

   currentQuery = "travel";
   page=1;
   imageGrid.innerHTML = "";

    loadBtn.style.display = "block";

   searchImage(currentQuery);
})

loadBtn.addEventListener('click', async function() {


    if(currentQuery === ""){
        return;
    }

    page++;

    loadBtn.innerHTML = `
    <div class="loader"></div>`;
    loadBtn.disabled = true

   await searchImage(currentQuery);

   loadBtn.textContent = "Load More";
   loadBtn.disabled = false
});

function createCard(photo){

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
        <img src="${photo.urls.regular}"
        oneerror="this.style.display='none'"
        >
    `;

    imageGrid.appendChild(card);
}

searchInput.addEventListener('keydown',function(event){

    if(event.key === "Enter"){
        searchBtn.click();
    }
})

picBtn.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document
        .querySelectorAll(".pics-btn")
        .forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");
    });

});

gsap.from('.card',{
    opacity:0,
    y:50,
    duration:0.6,
    stagger:0.1
})

gsap.from(".navbar",{
    y:-100,
    duration:1
});

gsap.from(".sidebar",{
    x:-100,
    opacity:0,
    duration:1,
    delay:0.2
});