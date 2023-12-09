let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
console.log(shopItemData);

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((acc,x)=> acc+x,0);
   
}
calculation();

let generateCartItem = ()=>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            console.log(x);
            let {id,item} = x;
            let search = shopItemData.find((y)=> y.id === id) || [];
            return `
            <div class="cart-item">
            <img width="100px" src = "${search.img}">
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p>$ ${search.price}</p>
            </h4>
            <i onclick = "removeItem(${id})" class="fa-solid fa-x exit-cart"></i>
            </div>
           
            <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-minus minus"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="fa-solid fa-plus plus"></i>
          
        </div>
        <h3>$ ${item * search.price}</h3>
            </div>
            </div>
            `
        }).join(""))
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="shop.html">
        <button class="btn-home">back to shopping</button>
        </a>
    `;
}
}
generateCartItem();
let increment = (id)=>{
   
    let selectItem = id;
    let search = basket.find((x)=> x.id === selectItem.id);
    if (search === undefined){
        basket.push({
            id: selectItem.id,
            item: 1,
        })
    }else{
        search.item += 1;
    }
    generateCartItem();
    update(selectItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
}
let decrement = (id)=>{

    let selectItem = id;
    let search = basket.find((x)=> x.id === selectItem.id);
    if(search === undefined)return;
    else if (search.item === 0)return;
    else{
        search.item -= 1;
    }
  
    update(selectItem.id);
    basket = basket.filter((x)=> x.item !== 0);
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
}
let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id)=>{
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}
let clearCart = ()=>{
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {id,item} = x;
            let search = shopItemData.find((y)=> y.id === id) || [];
            return item * search.price
        }).reduce((acc,x)=> acc+x,0);
        label.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">checkout</button> 
      <button onclick = "clearCart()" class="removeAll">clear Cart</button> 


    `
    }else return;
};

totalAmount()