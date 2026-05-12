
lucide.createIcons();

const imageGrid = document.getElementById('imageGrid')

const Access_Key = "KEv6T0R2L5Mkzsd5X-2fa9i4q4qqKkBqFaREaHwXyJ0";

async function getImages() {

    const response = await fetch("https://api.unsplash.com/photos/random?count=3",
        {
            headers: {
                Authorization: `Client-ID ${Access_Key}`
            }
        }
    );

    const data = await response.json();

    console.log(data);
    

    data.forEach(photo => {
        
        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

        <img src="${photo.urls.regular}">

        <div class="card-info">

        <h3>${photo.alt_description}</h3>
        <p>By ${photo.user.name}</p>

        </div>
        `;

        imageGrid.appendChild(card);
    });
}

getImages();