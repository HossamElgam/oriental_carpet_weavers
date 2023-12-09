// start shopping
let shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = ()=>{
    return (shop.innerHTML= shopItemData.map((x)=>{
        let {id,name,price,img} = x;
        let search = basket.find((x)=> x.id === id) || []
        return `
        <div id = product-id-${id} class="item">
            <img src=${img} alt="">
            <div class="details">
                <p>${name}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus minus"></i>
                        <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus plus"></i>
                      
                    </div>
                </div>
              
            </div>
        </div>`
    }).join(""))
}
generateShop();
/// increment and decrement
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
    //console.log(basket);
   
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
    //console.log(basket);
    update(selectItem.id);
    basket = basket.filter((x)=> x.item !== 0);
   
    localStorage.setItem("data",JSON.stringify(basket));
}
let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}


let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((acc,x)=> acc+x,0);
    //console.log(basket.map((x)=>x.item).reduce((acc,x)=> acc+x))
}
calculation();
/* end shopping */ 