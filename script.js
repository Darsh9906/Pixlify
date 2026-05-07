lucide.createIcons();

const imageGrid = document.getElementById('imageGrid')

const Access_Key = "KEv6T0R2L5Mkzsd5X-2fa9i4q4qqKkBqFaREaHwXyJ0";

async function getImages() {

    const response = await fetch("https://api.unsplash.com/photos/random?count=12",
        {
            headers: {
                Authorization: `Client-ID ${Access_Key}`
            }
        }
    );

    const data = await response.json();

    console.log(data);
    
}

getImages();