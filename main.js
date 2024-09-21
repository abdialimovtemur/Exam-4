const categories = document.querySelector(".categories")
const cards = document.querySelector(".cards")


// categoriyalarni render qilish

const categoriesRender = (catiegoriesNavData) => {
    categories.innerHTML = catiegoriesNavData.map((item) =>
        `<button class="text-xl font-semibold" data-item="${item}">${item}</button>
    `).join("");

    // Sahifa yuklanganda birinchi kategoriyaga tegishli kartochkalarni chiqarish
    if (catiegoriesNavData.length > 0) {
        defaultCategoryLoad(catiegoriesNavData[0]);
    }
}


// cardlarni render qilish

const cardsRender = (cardsData) => {
    cards.innerHTML = cardsData.map((item) =>
        `<div class="flex flex-col items-center border-2 border-[#F6F7F8] w-72 h-96 text-center gap-4 shadow-lg">
    <div class="h-60 w-full overflow-hidden"><img src="${item.image}" alt="img" class="w-full h-full object-contain"></div>
    <div class="px-4">
        <p class="font-mono">${item.title}</p>
    <div class="flex gap-3 justify-center pt-3">
        <p class="font-bold text-sky-600">${Math.round(item.price - (item.price * (24 / 100)))}$</p>
        <p class="line-through text-gray-500">${item.price}$</p>
        <p class="font-bold text-red-700">24% off</p>
    </div>

    <div class="flex gap-3 justify-center py-3">
        <p class="font-semibold text-yellow-300">${item.rating.rate} rating</p>
        <p class="font-semibold text-blue-950">${item.rating.count} pcs</p>
    </div>
    </div>

</div>
`).join("")

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
