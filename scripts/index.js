const db = [
    {
        "id": "1",
        "img": "./assets/img/1.png",
        "title": "Футболка UZcotton мужская",
        "quantity": 1,
        "stock": 3,
        "price": 522,
        "characteristics": {
            "color": "белый",
            "size": "56"
        },
        "old_price": 1051,
        "store": "Коледино WB",
        "shop": "OOO Вайлдберриз",
        "store_1": 3,

    },   

    {
        "id": "2",
        "img": "./assets/img/2.png",
        "title": "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
        "quantity": 200,
        "stock": 210,
        "price": 10500.235,
        "characteristics": {
            "color": "прозрачный",
        },
        "old_price": 11500.235,
        "store": "Коледино WB",
        "shop": "OOO Мегапрофстиль",
        "store_1": 184,
        "store_2": 26,


    },
    {
        "id": "3",
        "img": "./assets/img/3.png",
        "title": "Карандаши цветные Faber-Castell \"Замок\", набор 24 цвета, заточенные, шестигранные, Faber-Castell",
        "quantity": 2,
        "stock": 2,
        "price": 247,
        "characteristics": {
        },
        "old_price": 475,
        "store": "Коледино WB",
        "shop": "OOO Вайлдберриз",
        "store_1": 2,

    },
    
]

const cardsArray = [
    {
        name: 'mir',
        number: '1234 56•• •••• 1231',
        inUse: false,
    },
    {
        name: 'visa',
        number: '1234 56•• •••• 1232',
        inUse: true,

    },
    {
        name: 'master',
        number: '1234 56•• •••• 1233',
        inUse: false,

    },
    {
        name: 'union',
        number: '1234 56•• •••• 1234',
        inUse: false,
    },
]

const addressData = {
    home: [
        {
            address: 'Бишкек, улица Табышалиева, 57',
            inUse: true,

        },
        {
            address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
            inUse: false,

        },
        {
            address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
            inUse: false,

        },
    ],

    place: [
        {
            address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            rate: 4.99,
            inUse: true,

        },
        {
            address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            rate: 4.99,
            inUse: false,

        },
        {
            address: 'г. Бишкек, улица Табышалиева, д. 57',
            rate: 4.99,
            inUse: false,

        },        
    ]
}

// заказ
let selectedItems = {
    quantity: 0,
    itemsNoStockQuantity: [],
    itemsId: [],
    discount: 0,
    discountSum: 0, 
    price: 0,
    priceAll: 0
}

//form
const form = document.querySelector('.user_data_form')
const nameInput = form.querySelector('.fname')
const surnameInput = form.querySelector('.lname')
const emailInput = form.querySelector('.email')
const phoneInput = form.querySelector('.phone')
const innInput = form.querySelector('.inn')
const confirm = document.querySelector('.confirm_payment')
const orderButton = document.querySelector('.order_button')
//order
const totalSum = document.querySelector('.total_sum')
const totalGoods = document.querySelector('.total_goods')
const fullPrice = document.querySelector('.full_price')
const fullDiscount = document.querySelector('.full_discount')
const itemsHeader = document.querySelector('.collapse_info')
// cart
const price = document.querySelector('.main_price')
const itemsContainer = document.querySelector('.items_container')
const cartContainer = document.querySelector('.cart_items_wrapper')
const cart = document.querySelector('.cart_main')
const noStockHeader = document.querySelector('.no_stock_header')

// modal
const modal = document.querySelector('.modal')
//nav
const cartItemsQuantity = document.querySelector('.quantity_badge')

//валидация полей
const validateField = (field, errorText) => {

    let textToShow = field.parentNode.querySelector('.inner_text')

    if (errorText) {
        field.classList.add('invalid_text')
        textToShow.textContent = `${errorText}`
        textToShow.classList.add('invalid_text')
        field.classList.add('invalid_border')
    } else {
        textToShow.textContent = ''
        field.classList.remove('invalid_border', 'invalid_text')
    }   
}
//отправка формы по кнопке
function onSubmit (e) {
    e.preventDefault()

    form.addEventListener('input', (evt)=> {
        if(evt.target === nameInput) {
            if (nameInput.value === '') {

                validateField(nameInput, 'Укажите имя')
                
            } else {
                validateField(nameInput)
            }
        }
        
        if(evt.target === surnameInput) {
            if (surnameInput.value === '') {
                validateField(surnameInput, 'Укажите фамилию')
        
            } else {
                validateField(surnameInput)
            }
        }

        if(evt.target === emailInput) {
            if (emailInput.value !== '' && !emailInput.value.includes('@')) { 
        
                validateField(emailInput, 'Проверьте адрес электронной почты')
              
            } else if(emailInput.value === '') {
                validateField(emailInput, 'Укажите электронную почту')      
        
            } else {
                validateField(emailInput)
                
            }
        }

        if(evt.target === phoneInput) {
            if(phoneInput.value.length !== 16 && phoneInput.value !== '') {
                validateField(phoneInput, 'Формат: +9 999 999 99 99')
           
            } else if(phoneInput.value === '') {
                validateField(phoneInput, 'Укажите номер телефона') 
        
            } else {
                validateField(phoneInput) 
            }
        }

        
        if(evt.target === innInput) {
            if (innInput.value.length > 1 && innInput.value.length < 14) {
                validateField(innInput, 'Проверьте ИНН') 
            } else if(innInput.value === '') {
                validateField(innInput, 'Укажите ИНН')         
            } else {
                validateField(innInput)         
        
            }
        }

        
    })

    if (nameInput.value === '') {

        validateField(nameInput, 'Укажите имя')
        
    } else {
        validateField(nameInput)
    }

    if (surnameInput.value === '') {
        validateField(surnameInput, 'Укажите фамилию')

    } else {
        validateField(surnameInput)
    }

    if (emailInput.value !== '' && !emailInput.value.includes('@')) { 
        
        validateField(emailInput, 'Проверьте адрес электронной почты')
      
    } else if(emailInput.value === '') {
        validateField(emailInput, 'Укажите электронную почту')      

    } else {
        validateField(emailInput)
        
    }

    
    if(phoneInput.value.length !== 16 && phoneInput.value !== '') {
        validateField(phoneInput, 'Формат: +9 999 999 99 99')
   
    } else if(phoneInput.value === '') {
        validateField(phoneInput, 'Укажите номер телефона') 

    } else {
        validateField(phoneInput) 
    }


    if (innInput.value.length > 1 && innInput.value.length < 14) {
        validateField(innInput, 'Проверьте ИНН') 
    } else if(innInput.value === '') {
        validateField(innInput, 'Укажите ИНН')         
    } else {
        validateField(innInput)         

    }
    
    console.log(form);
}

//обработка инкремента/декремента
const changePrices = (evt, id) => {
    const priceBlock = evt.target.closest('.item_quantity_wrapper')

    priceBlock.querySelector('.main_price').innerText = Math.round(db[id-1]["quantity"] * db[id-1]["price"])
    priceBlock.querySelector('.old_price').innerText = Math.round(db[id-1]["quantity"] * db[id-1]["old_price"])
}

const changeBadgeQuantity = (id, counter, element) => {
    let item = document.querySelector('.delivery_data').querySelector(`.delivery_item_pic[data-item="${id}"]`)
    let itemNextElement = document.querySelector('.delivery_data').lastElementChild.querySelector(`.delivery_item_pic[data-item="${id}"]`)

    const generate = (element) => {

        const wrapperFirst = document.querySelector('.delivery_data').firstElementChild
    
        
        if(element) {
            element.insertAdjacentHTML('beforeend', `
            <div class="delivery_item_pic"  data-item=${id}>
                <img src="${db[id-1].img}">
                <span class="quantity_badge delivery_badge ${db[id-1].quantity > 1 ? '' : 'hidden'} ">${counter - db[id-1].store_1}</span>
            </div>
        `)
    
        } else {
            wrapperFirst.insertAdjacentHTML('beforeend', `
            <div class="delivery_item_pic"  data-item=${id}>
                <img src="${db[id-1].img}">
                <span class="quantity_badge delivery_badge ${db[id-1].quantity > 1 ? '' : 'hidden'} ">${counter - db[id-1].store_2}</span>
            </div>
            
        `)
        }
        
    }

    if (!item) {
        generate()
    }

    if (element) {
        if (!itemNextElement) {
            generate(element)
        }
        let badge = element.querySelector('.delivery_badge')

        if(counter - db[id-1].store_1 === 1) {
            badge.classList.add('hidden')

        } else if(counter - db[id-1].store_1 === 0) {
            badge.parentNode.remove()
        }else {
            badge.classList.contains('hidden') ? badge.classList.remove('hidden') : null           
        }    
        
        badge.innerText = counter - db[id-1].store_1
    } else {
        let item = document.querySelector('.delivery_data').querySelector(`.delivery_item_pic[data-item="${id}"]`)
       
        let badge = item.querySelector('.delivery_badge')

        
    
        if (counter < 2) {
            badge.classList.add('hidden')
            if(counter === 0) {
                badge.parentNode.remove()
            }
        
        } else {
            badge.classList.contains('hidden') ? badge.classList.remove('hidden') : null

            
        }
    
        badge.innerText = counter
    }
    

}


const increaseItem = (db, evt) => {

    const id = evt.target.closest('.cart_item').dataset.id
    const counter = evt.target.parentNode.querySelector('.item_count')

    const stockQuantity = evt.target.closest('.item_quantity_wrapper').querySelector('.item_stock')
    
    if (parseInt(counter.innerText) < db[id-1]['stock']) {
        counter.previousElementSibling.classList.contains('disabled_btn') ? 
        counter.previousElementSibling.classList.remove('disabled_btn') : null 
        
        counter.innerText++

        if (parseInt(counter.innerText) <= db[id-1].store_1) {
            changeBadgeQuantity(id, parseInt(counter.innerText))
        } else {
            const wrapperSecond = document.querySelector('.delivery_data').lastElementChild
            changeBadgeQuantity(id, parseInt(counter.innerText), wrapperSecond)
        }

        if (db[id-1]['stock'] - parseInt(counter.innerText) < 3) {
            stockQuantity.classList.remove('hidden')
            stockQuantity.innerText = `Осталось ${db[id-1]['stock'] - parseInt(counter.innerText)} шт.`
        }

        if(parseInt(counter.innerText) === db[id-1]['stock']) {
            counter.nextElementSibling.classList.add('disabled_btn')
            db[id-1]['quantity']++
            changePrices(evt, id)
            addNoStockElement(id, 0)

        } else {

            db[id-1]['quantity']++
            changePrices(evt, id)
        }   
    } 
 

}

const decreaseItem = (db, evt) => {

    const id = evt.target.closest('.cart_item').dataset.id
    const counter = evt.target.parentNode.querySelector('.item_count')
    const stockQuantity = evt.target.closest('.item_quantity_wrapper').querySelector('.item_stock')

    
    if (parseInt(counter.innerText) > 1) {
        
        db[id-1]['quantity']--      
        
        counter.nextElementSibling.classList.contains('disabled_btn') ? 
        counter.nextElementSibling.classList.remove('disabled_btn') : null           
        
        counter.innerText--
        changePrices(evt, id)

        if (parseInt(counter.innerText) >= db[id-1].store_1) {
            let nextDate = document.querySelector('.delivery_data').lastElementChild.querySelector(`.delivery_item_pic[data-item="${id}"]`)
            changeBadgeQuantity(id, parseInt(counter.innerText), nextDate)
            
        } else {
            changeBadgeQuantity(id, parseInt(counter.innerText))
        }
        
        
        if (db[id-1]['stock'] - parseInt(counter.innerText) < 3) {
            stockQuantity.innerText = `Осталось ${db[id-1]['stock'] - parseInt(counter.innerText)} шт.`

            addNoStockElement(id, 1)
        } else {
            stockQuantity.classList.add('hidden')
        }
    }
    else if(parseInt(counter.innerText) === 1) {
        counter.previousElementSibling.classList.contains('disabled_btn') ? 
        null : counter.previousElementSibling.classList.add('disabled_btn')
        db[id-1]['quantity']--        
        counter.innerText--

        changePrices(evt, id)
        changeBadgeQuantity(id, parseInt(counter.innerText))


        if (db[id-1]['stock'] - parseInt(counter.innerText) > 2) {
            stockQuantity.classList.add('hidden')
        } else {
            stockQuantity.innerText = `Осталось ${db[id-1]['stock'] - parseInt(counter.innerText)} шт.`
        }
        

    } else {

        return
    }
        
}


orderButton.addEventListener('click', onSubmit)

confirm.addEventListener('change', (e) => {
    if(e.target.checked) {
        orderButton.textContent = 'Оплатить ' + totalSum.textContent
        document.querySelector('.withdraw') ? document.querySelector('.withdraw').remove() : null
    } else {
        document.querySelector('.withdraw') ? null 
        :
        document.querySelector('.payment').insertAdjacentHTML('beforeend',
            '<p class="return_text withdraw">Спишем оплату с карты при получении</p>'
        )
    }
})


//закрытие окна

const closeWindow = (element) => {

    element.addEventListener('click', ()=> {

        modal.classList.remove('visible')

        let modalContainer = document.querySelector('.modal_wrapper')

        if(modalContainer) {

            modalContainer.innerHTML = ''
        }


    })
}


// генерация разметки товаров в корзине
const addSelectedItems = (products, element, incertPlace) => {
    products.map ((item)=> {

        item.stock === item.quantity ? addNoStockElement(item.id, 0) : null

        element.insertAdjacentHTML(incertPlace,

        `<article class="cart_item" data-id=${item.id}>
            <div class="item_main_info">
                <div class="check">
                    <label  class="check_all">
                        <input type="checkbox" class="check_input">
                        <span class="check_box"></span>                        
                    </label>
                </div>

                <div class="item_pic">
                    <img src=${item.img}>
                </div>

                <div class="item_info">

                    <h3>${item.title}</h3>

                    <div class="item_description">
                        <p class="item_character">
                            <span>${item.characteristics.color ? "Цвет: " : ''}</span><span>${item.characteristics.color ? item.characteristics.color : ''}</span>
                            <span class="char">${item.characteristics.size ? "Размер: " : ''}</span><span class="item_size ${item.characteristics.size ? '' : 'hidden'}">${item.characteristics.size ? item.characteristics.size : ''}</span>
                        </p>                            
                        <p class="item_location">${item.store}</p>
                        <div class="item_owner">

                            <p>${item.shop}</p>

                            <div class="bubble_info tooltip">
                                <span class="owner_info">i</span>
                                <div class="tooltip_text">
                                    <h4>OOO «МЕГАПРОФСТИЛЬ»</h4>
                                    <p>ОГРН: 5167746237148</p>
                                    <p>129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34</p>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>

            <div class="item_quantity_wrapper">

                <div class="counter_wrapper">

                    <div class="counter">
                        <p class="item_decrem">-</p>
                        <p class="item_count">${item.quantity}</p>
                        <p class="item_increm ${item.quantity === item.stock ? 'disabled_btn' : ''}">+</p>
                    </div>
                    
                    
                    <p class="item_stock_container"><span class="item_stock ${item.stock - item.quantity < 3 ? '' : 'hidden'}">Осталось ${item.stock - item.quantity < 3 ? item.stock - item.quantity : '' } шт.</span></p>
                    
                    <div class="item_handle">
                        <div>
                            <svg class="like_svg" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z" />
                            </svg>
                        </div>
                        <div>
                            <svg class="delete_svg" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
                            </svg>                                        
                        </div>
                    </div>
                </div>

                <div class="item_price">                    
                    <p class="price_wrapper"> <span class="main_price">${item.price * item.quantity} </span><span> сом</span></p>
                    <div class="old_price_wrapper tooltip">
                                                  
                        <div class="tooltip_text">
                            <p><span>Скидка 55%</span><span>−300 сом</span></p>
                            <p><span>Скидка покупателя 10%</span><span>−30 сом</span></p>
                        </div>
                            
                        <span class="old_price">${item.old_price * item.quantity} </span><span> сом</span>

                    </div>
                </div>

            </div>
        </article>`
        )
    })
}

//генерация разметки адресов
const generateAddressHtml = (address, element, array) => {

    if (address === 'courier') {
        array.map((address, idx) => {
            element.insertAdjacentHTML('beforeend', `
                <div class="modal_adress_wrapper">
                    <label class="card_number_wrapper card_type address_type">
                        <input name="address" type="radio" value="${idx}" ${address.inUse ? 'checked' : ''}>
                        <span class="radio_btn"></span>
                        <p class="card_number modal_adress_info">${address.address}</p>
                        
                    </label> 
                    
                    <svg class="delete_svg modal_adress" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
                    </svg>                              
                </div>              
            `)        
        })  
    }

    if (address === 'office') {
        array.map((address, idx) => {
            element.insertAdjacentHTML('beforeend', `
                <div class="modal_adress_wrapper">
                    <label class="card_number_wrapper card_type address_type">
                        <input name="address" type="radio" value="${idx}" ${address.inUse ? 'checked' : ''}>
                        <span class="radio_btn"></span>
                        
                        <p class="card_number modal_adress_info">
                            ${address.address}                            
                        </p>

                        <div class="hidden">
                            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922"/>
                            </svg>
                            <span class="rate">${address.rate} </span> <span>Пункт выдачи</span>
                        </div>

                        
                    </label> 
                    
                    <svg class="delete_svg modal_adress" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
                    </svg>                              
                </div>              
            `)        
        })  
    }
}

//функция выбора карты
const changeCardHtml = (cardArray, element, incertPlace) => {

    element.insertAdjacentHTML(incertPlace, `
        <form class="card_form">
        <h2 class="modal_header"> Способ оплаты
            <span class="close"></span>
        </h2>
        </form>
        <button class="order_button change_card">Выбрать</button> 
    `)

    let form = element.querySelector('.card_form')

    cardArray.map((card) => {
        form.insertAdjacentHTML(incertPlace, `
        
        <label class="card_number_wrapper card_type">
            <input name="card" type="radio" value="${card.name}" ${card.inUse ? 'checked' : ''}>
            <span class="radio_btn"></span>
            <div class="card_pic card_margin ${card.name}"></div>
            <p class="card_number">${card.number}</p>
        </label>     
        `)        
    })  
}
//функция замены разметки адреса
const changeAddressHtml = (addressArray, element, incertPlace) => {

    element.insertAdjacentHTML(incertPlace, `
         <form class="card_form">
                <h2 class="modal_header"> Способ доставки
                    <span class="close"></span>
                </h2>
                <div class="place_change">
                    <div class="place_to office">
                        В пункт выдачи
                    </div> 
                    <div class="place_to courier">
                        Курьером
                    </div>
                </div>
                <div class="user_adresses"><h4>Мои адреса</h4></div>
                <div class="address_container"></div>  
            </form>        
            <button class="order_button change_address">Выбрать</button>
    `)

    let container = element.querySelector('.address_container')


    addressArray.map((address, idx) => {
        container.insertAdjacentHTML(incertPlace, `
            <div class="modal_adress_wrapper">
                <label class="card_number_wrapper card_type address_type">
                    <input name="address" type="radio" value="${idx}" ${address.inUse ? 'checked' : ''}>
                    <span class="radio_btn"></span>
                    <p class="card_number modal_adress_info">${address.address}</p>
                </label> 
                
                <svg class="delete_svg modal_adress" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
                </svg>                              
            </div>              
        `)        
    })  
}

//функция смены адреса
const onChangeAddress = (button, dataArray, addresesNode) => {

    const allAddresses = addresesNode.querySelectorAll('input[name="address"]')

    button.addEventListener('click', ()=> {
    
        let addressIndex = 0
        
        for (let item of allAddresses) {
            
            if(item.checked) {        
                addressIndex = item.value
            }
        }
        
        dataArray.forEach ( (address) => {
            if (address.inUse === true) {
                address.inUse = false
            }                
        })

        dataArray[addressIndex].inUse = true

        //here we can send newed data to server
        
        document.querySelector('.aside_adress').innerText = dataArray[addressIndex].address
        document.querySelector('.delivery_adress').innerText = dataArray[addressIndex].address
                 
    
        modal.classList.remove('visible')

        document.querySelector('.modal_wrapper').innerHTML = ''
        
    })



}

//функция генерации разметки отсутствующего товара
const addNoStockElement = (id, quantity) => {

    const element = db[id-1]

    selectedItems.itemsNoStockQuantity.includes(id) ? null : selectedItems.itemsNoStockQuantity.push(id)

    selectedItems.itemsNoStockQuantity.length > 0 ? noStockHeader.classList.remove('hidden') : null

    noStockHeader.firstElementChild.innerText = selectedItems.itemsNoStockQuantity.length

    const noStockContainer = document.querySelector('.no_stock')

    if (quantity < 1) {
        noStockContainer.insertAdjacentHTML('beforeend', `
        <article class="cart_item" data-id=${id}>
            <div class="item_main_info">             

                <div class="item_pic">
                    <img class="grey_image" src=${element.img}>
                </div>

                <div class="item_info">

                    <h3>${element.title}</h3>

                    <div class="item_description">
                        <p class="item_character">
                            <span>${element.characteristics.color ? "Цвет: " : ''}</span><span>${element.characteristics.color ? element.characteristics.color : ''}</span>
                            <span class="char">${element.characteristics.size ? "Размер: " : ''}</span><span class="item_size ${element.characteristics.size ? '' : 'hidden'}">${element.characteristics.size ? element.characteristics.size : ''}</span>
                        </p>                           
                    </div>
                </div>
            </div>

            <div class="item_quantity_wrapper">

                <div class="counter_wrapper">
                    <div class="item_handle">
                        <div>
                            <svg class="like_svg" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z" />
                            </svg>
                        </div>
                        <div>
                            <svg class="delete_svg" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
                            </svg>                                        
                        </div>
                    </div>
                </div>           
            </div>
        </article>
        `)
    } else {
        noStockContainer.querySelector(`.cart_item[data-id="${id}"]`) ? 
        noStockContainer.querySelector(`.cart_item[data-id="${id}"]`).remove() :
        null

        selectedItems.itemsNoStockQuantity.includes(id) ? 
        selectedItems.itemsNoStockQuantity = selectedItems.itemsNoStockQuantity.filter((item)=> item != id) 
        : null

        selectedItems.itemsNoStockQuantity.length === 0 ? noStockHeader.classList.add('hidden') : null

        noStockHeader.firstElementChild.innerText = selectedItems.itemsNoStockQuantity.length


    }
}


addSelectedItems(db, itemsContainer, 'beforeend')


itemsContainer.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('item_decrem')) {
        decreaseItem(db, evt)
    }
    if(evt.target.classList.contains('item_increm')) {
        increaseItem(db, evt)
    }
})
//удаление в корзине 
cartContainer.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('delete_svg')) {
        evt.target.closest('.cart_item').remove()

    }

    if(evt.target.classList.contains('like_svg')) {
        const like = evt.target.parentNode.querySelector('.like_svg')
        like.classList.contains('fill_like') ? like.classList.remove('fill_like') 
        :
        like.classList.add('fill_like')
    }
    
})


// контент модалки
cart.addEventListener('click', (evt)=> {
    let modalContainer = document.querySelector('.modal_wrapper')
   

    if(evt.target.classList.contains('edit_card')) {

        modal.classList.toggle('visible')


        changeCardHtml(cardsArray, modalContainer, 'beforeend' )
        //закрытие
        const close = document.querySelector('.close')

        closeWindow(close)

        const changeBtn = document.querySelector('.change_card')
        const cardForm = document.querySelector('.card_form')


        const allCards = cardForm.querySelectorAll('input[name="card"]')
        

        let cardImges = cart.querySelectorAll('.card_pic')
        let cardNumbers = cart.querySelectorAll('.card_number')
        
        changeBtn.addEventListener('click', ()=> {
            
            let card_name = ''
        
            for (let card of allCards) {

                if(card.checked) {        
                   card_name = card.value
                }
            }
        
            cardImges.forEach( (node) => {
                node.className = ""
                node.classList.add('card_pic', `${card_name}`)
            } )

            const count = cardsArray.find ((item) => item.name === card_name)


            cardNumbers.forEach( (node) => {
                node.innerText = count.number
            } )
           
        
            modal.classList.toggle('visible')
            modalContainer.innerHTML = ''
            
        })

    }

    if(evt.target.classList.contains('edit_address')) {
        modal.classList.toggle('visible')



        changeAddressHtml(addressData.home, modalContainer, 'beforeend' )

        //закрытие
        const close = document.querySelector('.close')

        closeWindow(close)
     
        //кнопки выбора способа доставки и сохранения
        const changeAddress = document.querySelector('.change_address')
        const container = modalContainer.querySelector('.address_container')

        container.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('delete_svg')) {
                evt.target.closest('.modal_adress_wrapper').remove()

            }           
        })

        const btns = document.querySelector('.place_change')
        
        //смена адреса по умолчанию      
        onChangeAddress(changeAddress, addressData.home, container )

        // в зависимости от выбора отрисовка данных и сохранение
        btns.addEventListener('click', (evt) => {
            
            if (evt.target.classList.contains('courier')) {
                container.innerHTML = ''
                generateAddressHtml('courier', container, addressData.home)
                btns.querySelector('.office').classList.remove('selectedBtn')
                evt.target.classList.add('selectedBtn')
                
                onChangeAddress(changeAddress, addressData.home, container)
                

            }

            if (evt.target.classList.contains('office')) {
                container.innerHTML = ''
                generateAddressHtml('office', container, addressData.place)
                btns.querySelector('.courier').classList.remove('selectedBtn')
                evt.target.classList.add('selectedBtn')

                onChangeAddress(changeAddress, addressData.place, container )
                
            }

        })      
       

    }

    //сворачивание блоков
    if(evt.target.closest('.hide_button')) {
        let close = evt.target.closest('.hide_button')
        close.parentNode.nextElementSibling.classList.toggle('hide_show_block')
        close.classList.toggle('rotate_button')
        
        let header = evt.target.closest('.cart_header')
        
        if(header.querySelector('.check')) {
            header.querySelector('.check').classList.toggle('hidden')
        }

        if(header.querySelector('.hidden_items')) {
            
            header.querySelector('.hidden_items').classList.toggle('hidden')        
        }
    }
})

//проверка для инпута инн
function validate(evt) {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}


//маска для инпута телефона
document.addEventListener("DOMContentLoaded", () => {
    let eventCallback = function (e) {
        let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        defaultMask = "+7(___) ___-__-__",
        mask = pattern ? pattern : defaultMask,
        i = 0,
        def = mask.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");

        if (clearVal !== 'false' && e.type === 'blur') {
            // if (val.length < mask.match(/([\_\d])/g).length) {
            if (val.length < 2) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = mask.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    // let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    // for (let elem of phone_inputs) {
    //     for (let ev of ['input', 'blur', 'focus']) {
    //         elem.addEventListener(ev, eventCalllback);
    //     }
    // }
    let phone_input = document.querySelector('[data-phone-pattern]');    
        for (let evts of ['input', 'blur', 'focus']) {
            phone_input.addEventListener(evts, eventCallback);
        }    
});

//товары в иконке корзины
cartItemsQuantity.innerText = db.length


//заполение корзины для оплаты

const changeOrderText = () => {
    totalSum.innerText = selectedItems.price.toLocaleString("ru-RU")
    totalGoods.innerText = selectedItems.quantity
    fullPrice.innerText = (selectedItems.price + selectedItems.discount).toLocaleString("ru-RU")
    fullDiscount.innerText = selectedItems.discount.toLocaleString("ru-RU")
    itemsHeader.firstChild.innerText = selectedItems.quantity + ' товара'
    itemsHeader.lastChild.innerText = selectedItems.price.toLocaleString("ru-RU") + ' сом'
}

const createItemObject = () => {

    const changeOrderObject = (item, operator ) => {

        if (operator === '+') {
            selectedItems.quantity += parseInt(item.querySelector('.item_count').innerText)
            selectedItems.price += parseInt(item.querySelector('.main_price').innerText)
            selectedItems.discount += parseInt(item.querySelector('.old_price').innerText)
        } else {
            selectedItems.quantity -= parseInt(item.querySelector('.item_count').innerText)
            selectedItems.price -= parseInt(item.querySelector('.main_price').innerText)
            selectedItems.discount -= parseInt(item.querySelector('.old_price').innerText)
        }
    }

    const checkboxes = cartContainer.querySelectorAll('.check_input')
    

    checkboxes.forEach( (checkbox) => {

        checkbox.addEventListener('change', (evt) => {

            if(evt.target.classList.contains('main_check')) {
                checkboxes.forEach((checkbox) => {
                    const item = checkbox.closest('.cart_item')

                    if(evt.target.checked === true && checkbox.checked === false) {
                        checkbox.checked = true
                        changeOrderObject(item, '+')
                       
                        console.log(selectedItems, 'after check all +');
                        changeOrderText()
                      

                    } else if(evt.target.checked === false && checkbox.checked === true){
                        checkbox.checked = false
                        changeOrderObject(item, '-')

                        console.log(selectedItems, 'after check all + -');

                        changeOrderText()
                        
                    }

                })
            } else {
                const item = evt.target.closest('.cart_item')
                
                if(evt.target.checked) {
                    changeOrderObject(item, '+')

                    console.log(selectedItems, 'first if');
                    
                    changeOrderText()

                } else {
                    changeOrderObject(item, '-')
               
                    console.log(selectedItems, 'second if');

                    changeOrderText()                   
                }        

            }
 
    
        })
            
    })
    
    
   
}



// разметка для доставки
const addDeliveryTime = (date) => {

    const generateContainer = (date) => {
        document.querySelector('.delivery_data').insertAdjacentHTML('beforeend', `
        <div class="delivery_place">
            <h3 class="place">${date}—${date+1} февраля</h3>
            <div class="delivery_items_wrapper">
                                  
            </div>
        </div>
    `)
    }

    generateContainer(date)
    

    const wrapper = document.querySelector('.delivery_data').lastElementChild.querySelector('.delivery_items_wrapper')
    db.forEach ((item) => {
        if(item.store_1) {
            wrapper.insertAdjacentHTML('beforeend', `
            <div class="delivery_item_pic"  data-item=${item.id}>
                <img src="${item.img}">
                <span class="quantity_badge delivery_badge ${item.quantity > 1 ? '' : 'hidden'} ">${item.store_1}</span>
            </div>
        `)
        }

        if(item.store_2) {
            generateContainer(date+2)
            const wrapper = document.querySelector('.delivery_data').lastElementChild.querySelector('.delivery_items_wrapper')
            wrapper.insertAdjacentHTML('beforeend', `
            <div class="delivery_item_pic"  data-item=${item.id}>
                <img src="${item.img}">
                <span class="quantity_badge delivery_badge ${item.quantity > 1 ? '' : 'hidden'} ">${item.quantity - item.store_1}</span>
            </div>
        `)
        }        
    })    
}


//change input placeholder
window.addEventListener('resize', changePlaceholder);

changePlaceholder.call(window);

function changePlaceholder() {
    emailInput.setAttribute('placeholder', this.innerWidth >= 640 ? 'Почта' : 'Электронная почта');
}


createItemObject()

addDeliveryTime(5)

