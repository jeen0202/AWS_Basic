const backToTop = document.getElementById('backtotop')

const checkScroll= ()=> {
    // 브라우저에서 Page를 얼마나 Scroll확인했는지 확인할 수 있는 함수
    let pageYOffSet= window.pageYOffset;

    if(pageYOffSet !==0){
        backToTop.classList.add('show');
    }else{
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    if (window.pageYOffset >0){
        window.scrollTo({
            top :0,
            behavior: "smooth"
        })
    }
}

window.addEventListener('scroll',checkScroll);
backToTop.addEventListener('click', moveBackToTop);


function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');
    if (Number(activeLi) <0){
        activeLi = Number(activeLi) + 260;

        slidePrev.style.color ='#2f3059';
        slidePrev.classList.add('slide-next-hover');
        slidePrev.addEventListener('click',transformPrev);
    if(Number(activeLi) === 0){
        slideNext.style.color = "#cfd8dc";
        slideNext.classList.remove('slide-next-hover');
        slideNext.removeEventListener('click',transformNext);
    }
    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;
    
    //관련 ul 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    if (classList.clientWidth < (liList.length *260 + Number(activeLi))) {
        activeLi = Number(activeLi) - 260;
        if (classList.clientWidth > (liList.length * 260 + Number(activeLi)))
        slidePrev.style.color = "#cfd8dc";
        slidePrev.classList.remove('slide-prev-hover');
        slidePrev.removeEventListener('click',transformPrev);
    }
        slideNext.style.color ='#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click',transformNext);

   classList.style.transition = 'transform 1s';
   classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
   classList.setAttribute('data-position', activeLi);
}

const slidePrevList = document.getElementsByClassName("slide-prev")

for (let i = 0; i<slidePrevList.length; i++){
    let classList = slidePrevList[0].parentElement.parentElement.nextElementSibling
    let liList = classList.getElementsByTagName('li');
    if(classList.clientWidth < (liList.length*260)){
        slidePrevList[i].classList.add('slide-prev-hover')
        slidePrevList[i].addEventListener('click', transformPrev)
    } else{
        //부모 요소에서 removeChild를 통해 삭제
        const arrowContainer = slidePrevList[i].parentNode;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i])
    }
}




let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;


function processTouchMove(event) {
    event.preventDefault();

    let currentX = event.clientX || event.touches[0].screenX;
    nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX));

    currentClassList.style.transition = 'transform 0s linear';
    currentClassList.style.transform = "translateX(" + String(nowActiveLi) + "px)";
}

function processTouchStart(event){
    mouseStart = true;

    event.preventDefault();
    touchstartX = event.clientX || event.touches[0].screenX;
    currentImg = event.target;

    currentImg.addEventListener('mousemove',processTouchMove);
    currentImg.addEventListener('mouseup', processTouchEnd);

    currentImg.addEventListener('touchmove',processTouchMove);
    currentImg.addEventListener('touchend', processTouchEnd);

    currentClassList = currentImg.parentElement.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position');

}

function processTouchEnd(event){
    event.preventDefault();

    if(mouseStart === true){
        currentImg.removeEventListener('mousemove',processTouchMove);
        currentImg.removeEventListener('mouseup', processTouchEnd);

        currentImg.removeEventListener('touchmove',processTouchMove);
        currentImg.removeEventListener('touchend', processTouchEnd);

        currentClassList.style.transition = 'transform 1s ease';
        currentClassList.style.transform = "translateX(0px)";
        currentClassList.setAttribute('data-position', 0);

        //버튼 동기화
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0]
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1]
        eachLiList = currentClassList.getElementsByTagName('li');
        // let eachClassList = eachSlidePrev.parentNode.parentNode.nextElementSibling;
        if (currentClassList.clientWidth < (eachLiList.length*260)){
            eachSlidePrev.style.color = '#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click',transformPrev);

            eachSlideNext.style.color = '#cfd8dc';
            eachSlideNext.classList.remove('slide-next-hover');
            eachSlideNext.removeEventListener('click',transformNext);
        }
        mouseStart = false;
        // else{
        //     const eachViewAllNode = slidePrev.parentNode;
        //     eachViewAllNode.removeChild(slidePrev,nextElementSibling);
        //     eachViewAllNode.removeChild(slidePrev);
        // }
    }
       
}
//동적 반응
window.addEventListener('dragend', processTouchEnd);
window.addEventListener('mouseup', processTouchEnd);

const classImgList = document.querySelectorAll('ul li img');
for (let i =0; i<classImgList.length ; i++){
    classImgList[i].addEventListener('mousedown', processTouchStart);
    classImgList[i].addEventListener('touchstart', processTouchStart);       
}