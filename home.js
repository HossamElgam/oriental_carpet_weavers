
/* **** start slider image ****/
const slider = document.querySelector(".image-slider");
const arrLeft = document.querySelector(".arrow-left");
const arrRight = document.querySelector(".arrow-right");
const heading = document.querySelector(".caption");
const images = ["slide-1.webp","slide-2.webp","slide-3.webp"];
let id = 0;


function slide(id){
    slider.style.backgroundImage = `url(image/${images[id]})`;
    slider.classList.add('image-fade');
    setTimeout(()=>{
        slider.classList.remove('image-fade')
    },550)
}

arrLeft.addEventListener('click',function () {
        id--;
        if (id < 0) {
            id = images.length - 1;
        }
        slide(id);
    });
    
arrRight.addEventListener('click',()=>{
    id++;
    if(id > images.length - 1){
        id = 0;
    }
    slide(id);
});

/**** end slider image */

let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((acc,x)=> acc+x,0);
   
}
calculation();