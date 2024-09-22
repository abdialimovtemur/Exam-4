const cartPage = document.querySelector(".cartPage");
let cardsArray = JSON.parse(localStorage.getItem('cards')) || [];

// Karta elementlarini ekranga chiqarish funksiyasi
const displayCards = () => {
    cartPage.innerHTML = cardsArray
        .map(
            (item, index) =>
                `<div class="card flex gap-4 items-center border-y py-4 border-blue-500 h-40" data-id="${item.id}">
                   <div>
                         <button class="close-btn text-red-700 mr-4" data-index="${index}">close</button>
                         <button class="show-btn text-green-500" data-index="${index}">show</button>
                   </div>
                     <img src="${item.image}" alt="${item.title}" style="width: 100px;"/>
                     <div class="flex flex-col">
                        <h3>${item.title}</h3>
                           <p class="font-bold text-sky-600">${Math.round(item.price - (item.price * (24 / 100)))}$</p>
                           <p class="line-through text-gray-500">${item.price}$</p>
                           <p class="font-bold text-red-700">24% off</p>
                      </div>
                </div>`
        )
        .join('');

    // Close tugmasi uchun hodisalar qo'shish
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeCard(index);
        });
    });

    // Show tugmasi uchun hodisalar qo'shish
    document.querySelectorAll('.show-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            showCardDetails(index);
        });
    });
};

const removeCard = (index) => {
    cardsArray.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    displayCards();
};




const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

// card malumotlarini modalga chiqarish

const showCardDetails = (index) => {
    const card = cardsArray[index];
    modalContent.innerHTML = `
        <h2>${card.title}</h2>
        <img src="${card.image}" alt="${card.title}" style="width: 200px;" />
        <p>Price: ${card.price}$</p>
        <p>Discounted Price: ${Math.round(card.price - (card.price * (24 / 100)))}$</p>
        <p>Rating: ${card.rating.rate} ⭐</p>
        <button id="closeModalBtn" class="bg-red-500 text-white px-4 py-2 mt-4">Close</button>
    `;
    modal.style.display = "flex";


    // Modalni o'chirish
    const closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
};

// Modalni ekrandan tashqariga bosilganda yopish
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

displayCards();
