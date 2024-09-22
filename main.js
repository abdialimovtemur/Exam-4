const categories = document.querySelector(".categories")
const cards = document.querySelector(".cards")


// categoriyalarni render qilish

const categoriesRender = (catiegoriesNavData) => {
    categories.innerHTML = catiegoriesNavData.map((item) =>
        `<button class="text-xl font-semibold" data-item="${item}">${item}</button>
    `).join("");

    // birinchi kategoriyadagi cardlarni chiqarish
    if (catiegoriesNavData.length > 0) {
        defaultCategoryLoad(catiegoriesNavData[0]);
    }
}


// cardlarni render qilish

const cardsRender = (cardsData) => {
    cards.innerHTML = cardsData.map((item) =>
        `<div class="flex flex-col items-center border-2 border-[#F6F7F8] w-72 h-96 text-center gap-4 shadow-lg group hover:shadow-2xl">
            <div class="h-60 w-full overflow-hidden relative">
                <img src="${item.image}" alt="img" class="transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                <div class="absolute inset-0 z-20 bg-green-800 opacity-0 transition-opacity duration-[500ms] ease-in-out group-hover:opacity-100 rounded-lg flex items-center justify-center">
                    <div class="buttons flex flex-col gap-5 items-start">
                        <button class="text-white" data-id="${item.id}" data-action="showBtn"><i class="fa-regular fa-eye" style="color: #ffffff;"></i> Show</button>
                        <button class="text-white" data-id="${item.id}"><i class="fa-regular fa-heart" style="color: #ffffff;"></i> Like</button>
                        <button class="text-white" data-id="${item.id}" data-name="addCart"><i class="fa-solid fa-cart-plus" style="color: #ffffff;"></i> Add cart</button>
                     </div>
                </div>
            </div>
            <div class="px-4">
                <p class="font-mono">${item.title}</p>
                <div class="flex gap-3 justify-center pt-3">
                    <p class="font-semibold text-yellow-300 items-center">${item.rating.rate} rating ⭐</p>
                </div>
                <div class="flex gap-3 justify-center py-3">
                    <p class="font-bold text-sky-600">${Math.round(item.price - (item.price * (24 / 100)))}$</p>
                    <p class="line-through text-gray-500">${item.price}$</p>
                    <p class="font-bold text-red-700">24% off</p>
                </div>
            </div>
        </div>
        `).join("");
}



// categoriyalarli fetch qilish yani ichidagi elementlarni yechib olish

const getCatiegoriesNavUrl = async () => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/categories`)
        const catiegoriesNavData = await res.json()
        categoriesRender(catiegoriesNavData)

    } catch (error) {
        console.log("error");
    }
}
getCatiegoriesNavUrl()


// Default kategoriyani chiqarish

const defaultCategoryLoad = async (category) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const cardsData = await res.json();
        cardsRender(cardsData);
    } catch (error) {
        console.log("error");
    }
};


// cardlarni chiqarish uchun funksiya categoriyadagi itemlardan biri bosilganda cardlar chiqishi uchun

categories.addEventListener("click", (e) => {
    let item = e.target.dataset.item

    const getCardsUrl = async () => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/category/${item}`)
            const cardsData = await res.json()
            cardsRender(cardsData)

        } catch (error) {
            console.log("error");
        }
    }
    getCardsUrl()

})






// hero qismidagi slider uchun yozilgan kod


const slider = document.getElementById('sliderImages');
const slides = slider.children;
const totalSlides = slides.length;
let currentSlide = 0;

function updateSlidePosition() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// carusel o'tishi uchun buttonlar

document.getElementById('prevSlide').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

document.getElementById('nextSlide').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
});

// sliderni avto aylanib turishi uchun funksiya

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
}, 5000);







// carddagi modal uchun


const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");




// har bitta cardni olib berish uchun funksiya

// cardlardan id sini olib berish uchun

let cardId = null;
const cartPage = document.querySelector(".cartPage");
let cardsArray = JSON.parse(localStorage.getItem('cards')) || [];


let count = document.querySelector(".count")

cards.addEventListener("click", (e) => {
    const button = e.target.closest('button');
    if (button && button.dataset.name === "addCart") {
        const cardId = button.dataset.id;

        // countni hisoblash 
        count.innerHTML = cardsArray.length + 1;



        // card malumotlarini olib localStorage ga saqlash

        const getCardUrl = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${cardId}`);
                const cardData = await res.json();



                // bir xil mahsulotlarni ikki marta yoki undan ko'p bo'lib ketmasligi uchun 

                const exists = cardsArray.some(card => card.id === cardData.id);
                if (!exists) {
                    cardsArray.push(cardData);
                    localStorage.setItem('cards', JSON.stringify(cardsArray));
                    displayCards();
                } else {
                    console.log("Bir martadan ko'p savatga solish mumkinmasssss!!!!!!!!");
                }
            } catch (error) {
                console.log("Xato:", error);
            }
        };
        getCardUrl();
    }
});

const displayCards = () => {
    cartPage.innerHTML = cardsArray
        .map(item =>
            `<div class="card">
                <h3>${item.title}</h3>
                <p>${item.price}$</p>
                <img src="${item.image}" alt="${item.title}" style="width: 100px;"/>
            </div>`
        )
        .join('');
};

displayCards();














