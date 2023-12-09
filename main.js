

/***** nav start */
let toggler = document.querySelector(".toggle-menu");
let uls = document.querySelector("#ul");
let close = document.querySelector(".close")
toggler.onclick = function(){
    uls.classList.add("open");
}
close.onclick = function(){
    uls.classList.remove("open")
}
document.onkeyup = function(e){
    if(e.key === "escape"){
        uls.classList.remove("open")
    }
}
///***  nav end */


