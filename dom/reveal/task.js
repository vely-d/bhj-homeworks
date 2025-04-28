let elsToReveal = document.querySelectorAll(".reveal");

let scrollEventAllowed = true;

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener("scroll", (event) => {
    if(!scrollEventAllowed) {
        return;
    }
    // let currentY = window.scrollY;
    let n = Math.ceil(Math.log2(elsToReveal.length));
    let left = 0;
    let right = elsToReveal.length - 1;
    let mid = Math.floor(elsToReveal.length / 2);

    for(let i = 0; i <= n; i++) {
        mid = left + Math.floor((right - left) / 2);

        if(isInViewport(elsToReveal[mid])) {
            elsToReveal[mid].classList.add("reveal_active");
            break;
        }

        if(elsToReveal[mid].getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    scrollEventAllowed = false;
    setTimeout(() => { scrollEventAllowed = true; }, 500);
});