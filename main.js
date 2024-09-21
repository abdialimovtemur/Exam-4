const categories = document.querySelector(".categories")
const cards = document.querySelector(".cards")


// categoriyalarni render qilish

const categoriesRender = (catiegoriesNavData) => {
    categories.innerHTML = catiegoriesNavData.map((item) =>
    `<button class="text-xl font-semibold" data-item="${item}">${item}</button>
    `).join("")
}



// categoriyalarli fetch qilish yani ichidagi elementlarni yechib olish

const getCatiegoriesNavUrl = async() => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/categories`)
        const catiegoriesNavData = await res.json()
        categoriesRender(catiegoriesNavData)
        
    } catch (error) {
        console.log("error"); 
    }
}
getCatiegoriesNavUrl()


// cardlarni chiqarish uchun funksiya categoriyadagi itemlardan biri bosilganda cardlar chiqishi uchun

categories.addEventListener("click", (e) =>{
    let item = e.target.dataset.item

    const getCardsUrl = async() => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/ ${item}`)
    } catch (error) {
        console.log("error");
    }
}
    
})


