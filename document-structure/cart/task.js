const cartProducts = document.querySelector(".cart__products");
cartProducts.innerHTML = window.localStorage.getItem("localCart") || "";

function updateLocalCart() {
    window.localStorage.setItem("localCart", cartProducts.innerHTML);
}

function removeClick(event) {
    let cartProducts = this.closest(".cart__products");
    if(cartProducts.children.length === 1) {
        cartProducts.innerHTML = "";
    }
    else {
        this.parentElement.remove();
    }
    updateLocalCart();
}

for(let b of cartProducts.querySelectorAll(".cart__remove-product-btn")) {
    b.addEventListener("click", removeClick);
}

let quantityControls = document.querySelectorAll(".product__quantity-control");
for(let c of quantityControls) {
    c.addEventListener("click", function(event) {
        let countElement = this.parentElement.querySelector(".product__quantity-value");
        let count = +countElement.textContent;
        if(Array.from(this.classList).includes("product__quantity-control_dec")) {
            count ? countElement.textContent = count - 1 : 0;
        }
        if(Array.from(this.classList).includes("product__quantity-control_inc")) {
            countElement.textContent = count + 1;
        }
    });
}

let addControls = document.querySelectorAll(".product__add");
for(let a of addControls) {
    a.addEventListener("click", function(event) {
        let countElement = this.parentElement.querySelector(".product__quantity-value");
        let addCount = +countElement.textContent;
        if(!addCount) {
            return;
        }
        
        let product = this.closest(".product");
        let productId = product.dataset.id;
        let prodImg = product.querySelector(".product__image");
        
        let existingProduct = cartProducts.querySelector(`.cart__product[data-id='${productId}']`);
        let currentCount = 0;
        if(existingProduct) {
            currentCount = +existingProduct.querySelector(".cart__product-count").textContent;
        } else {
            cartProducts.innerHTML += `
                <div class="cart__product" data-id=${productId}>
                    <img class="cart__product-image" src=${prodImg.src}>
                    <div class="cart__product-count">${0}</div>
                    <button class="cart__remove-product-btn" type="button">x</button>
                </div>
            `;
            existingProduct = cartProducts.querySelector(`.cart__product[data-id='${productId}']`);
            existingProduct.querySelector(".cart__remove-product-btn").addEventListener("click", removeClick);
        }

        let cartProdImg = cartProducts.querySelector(`.cart__product-image[src='${prodImg.src}']`);
        
        // ------------------
        // floating animation
        // ------------------
        function animateFloatingImage() {
            // 1) creating and setting up floating image
            let floatingImg = document.createElement("img");
            floatingImg.src = prodImg.src;
            document.documentElement.appendChild(floatingImg);
            floatingImg.addEventListener("animationend", function() {
                currentCount++;
                existingProduct.querySelector(".cart__product-count").textContent = currentCount;
                this.remove();
                updateLocalCart();
            }, false);

            // 2) get starting and final coordinates of animation, assingment of those to css variables
            let { top: topStarting, left: leftStarting } = prodImg.getBoundingClientRect();
            let { top: topFinal, left: leftFinal } = cartProdImg.getBoundingClientRect();
            // if([topFinal, leftFinal].filter(e => e < 5).length) {
            //     // when hits - images float to the top left corner, where they should not float to
            //     // to recreate, one must add new product, while there are still products, flowing to the previously added position
            //     // so that previously flowing products suddenly start going wrong way
            //     debugger;
            // }
            floatingImg.style.cssText = `
                --top-starting: ${topStarting}px;
                --left-starting: ${leftStarting}px;
                --top-final: ${topFinal}px;
                --left-final: ${leftFinal}px;
            `;

            // 3) triggering animation
            floatingImg.classList = "floating-image product__image";
        }

        animateFloatingImage();
        let animateCount = addCount - 1;
        let animationInterval = animateCount ? setInterval(() => {
            if(animateCount) {
                animateFloatingImage();
                animateCount--;
            }
            else {
                clearInterval(animationInterval);
            }
        }, 600 / addCount) : 0;
    });
}