import { menuArray } from './data.js'

const checkoutForm = document.getElementById('checkout-form');
const orderListEl = document.getElementById('order-list');
const order = document.getElementById('order');
const totalPriceEl = document.getElementById('total-price'); 
const onTheWay = document.getElementById('on-the-way')
const name = document .getElementById('name')
let orders = []



document.addEventListener('click', function(e){
     if (e.target.id === 'order-complete-btn'){
        completeOrderForm()
    } else if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }else if (e.target.id === 'checkout-pay-button'){
        handleCheckoutClick(e)
    }
})




function getMenuHtml(){
    let menuHtml = ``
    menuArray.forEach(function(menuItem){  
        menuHtml += `
                <div class="menu-item" id="pizza">
                    <p class="menu-item-emoji">${menuItem.emoji}</p>
                    <div class="menu-description">
                        <h2>${menuItem.name}</h2>
                        <p>${menuItem.ingredients}</p>
                        <h3>$${menuItem.price}</h3>
                    </div>
                    <div class="menu-add">
                        <button class="menu-add-btn" data-add="${menuItem.id}"> + </button>
                    </div> 
                </div>
    
        `
    })  
    return menuHtml
}

function getOrderHtml(orderArr){
    return orderArr.map(property => {
        const {
            name,
            price,
            id,
            number 
        } = property;

        return `
            <li>
                <div class="one-order-item">
                    <div class="order-item-name">
                        <h3>${name}</h3>
                        <button class="order-item-remove-btn" data-remove=${id}>remove</button>
                    </div>
                    <div class="order-item-price">
                        <p>x${number}</p>
                        <h3>$${price * number}</h3>
                    </div>
                </div>
            </li>`
    }).join('');
    
}

function handleAddClick(itemId){
    const menuItem = menuArray.find(item => item.id === parseInt(itemId));
    const existingOrder = orders.find(order => order.id === menuItem.id);
 
    if(existingOrder){
        existingOrder.number++
    }else{
        orders.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            number : 1
        });
    }

    if (orders.length > 0){
        document.getElementById('order').style.display = 'block';
    }

    render();
        
    
}

function handleRemoveClick(itemId){
    const existingOrder = orders.find(order => order.id === parseInt(itemId));

    if (existingOrder) {
        if (existingOrder.number > 1) {
            existingOrder.number -= 1;
        } else {
            orders = orders.filter(order => order.id !== existingOrder.id);
            if (orders.length === 0) {
                document.getElementById('order').style.display = 'none';
            }
        }
    }

    render();

}

function completeOrderForm(){
    checkoutForm.style.display = 'inline'
}

function getTotalPrice(){
    return orders.reduce(function(total, order){
        return total + (order.price * order.number);
    }, 0);
}

function handleCheckoutClick(e) {
    e.preventDefault();

    const form = document.getElementById('checkout-form');

    if (form.checkValidity()) {
        const userName = document.getElementById('name').value;

        document.getElementById('checkout-form').style.display = 'none';
        document.getElementById('order').style.display = 'none';

        document.getElementById('on-the-way').innerHTML = `
            <div class="on-its-way-container">
                <h2>Thanks ${userName}, your order is on its way!</h2>
            </div>
        `;
        document.querySelectorAll('.menu-add-btn').forEach(btn => btn.disabled = true);
        document.getElementById('on-the-way').style.display = 'block';
    } else {
         form.reportValidity();
    }
 }


function render(){
    document.getElementById('menu').innerHTML = getMenuHtml()  
    orderListEl.innerHTML = getOrderHtml(orders);
    totalPriceEl.innerHTML = `$${getTotalPrice()}`;
}


render()