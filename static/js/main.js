window.addEventListener('DOMContentLoaded', ()=>{
    let body = document.getElementsByTagName('body')[0];
    let overlay = document.getElementById('strat-overlay');
    body.classList.remove('overflow-hidden');
    overlay.classList.add('d-none');
    overlay.setAttribute('loaded', 'true');

    setTimeout(() => {
        writeText('hero-inner', 200);
    }, 100);
    
});

const isVisibleByC = (elId, exact=false, onBottom=false) =>{
    let overlay = document.getElementById('strat-overlay');
    if(overlay.hasAttribute('loaded')){
        let elem = document.getElementById(elId);
        let scrollLen = window.scrollY;
        let innerH = window.innerHeight;
        let viewpToEl = elem.getBoundingClientRect().top;
        let viewpToElAtB = elem.getBoundingClientRect().bottom;
        if(onBottom){
            return innerH > viewpToElAtB
        }else{
          return exact ? (innerH/2) >= viewpToEl : innerH/1.03 > viewpToEl   
        }
        
    }else{
        return false
    }
};

const writeText = (elId, inter) =>{
    let element = document.getElementById(elId);
    let textToWrite = element.textContent;

    element.textContent = "";
    element.classList.remove('d-none');

    let i = 0
    let int = setInterval(() => {
        if(i<textToWrite.length){
            element.textContent += textToWrite[i]
            i++
        }else{
            let cursor = document.getElementById('cursor');
            setTimeout(() => {
                cursor.classList.add('d-none')
                cursor.classList.remove('An-1')  
            }, 100);
            clearInterval(int)
        }
    }, inter);
};

const countNumber = (num, elId, inter, end="") =>{
    let element = document.getElementById(elId);

    element.textContent = "";
    element.classList.remove('d-none');

    let i = 0
    let int = setInterval(() => {
        if(i <= num){
            element.textContent = i++;
        }else{
            if(end){
                element.textContent += end 
            }
            clearInterval(int)
        }
    }, inter);
};

/* Header Link */
document.querySelectorAll('.head-link').forEach((el)=>{
    el.addEventListener('click', ()=>{
        let allLinks = document.querySelectorAll('.head-link');
        allLinks.forEach((els)=>{
            els.classList.remove('text-warning');
            els.classList.add('text-dark');
        });
        el.classList.remove('text-dark');
        el.classList.add('text-warning');
    });
})

/* Responsive Menu Header */
document.getElementById('respo-btn').addEventListener('click', ()=>{
    let navResp = document.getElementsByTagName("ul")[0];
    let headItem = document.querySelectorAll('.head-link');
    let contactBtn = document.querySelector('.head-contact-btn');
    let closeBtn = document.getElementById('head-close-btn');
    const hideSidBar = () =>{
        navResp.classList.remove('show-nav');
    }
    navResp.classList.add('show-nav');

    headItem.forEach((el)=>{
        el.addEventListener('click', ()=>{
           hideSidBar(); 
        });
    });
    contactBtn.addEventListener('click', () =>{hideSidBar()});
    closeBtn.addEventListener('click', () =>{hideSidBar()});
});

/* contact Us */
document.querySelectorAll('.head-contact-btn').forEach((btn) =>{
        let contactForm = document.getElementById('contact-form');
        btn.addEventListener('click', ()=>{
        if(!contactForm.classList.contains('d-none')){
            let firstInput = document.getElementById('first_name');
            firstInput.focus();
        }else{
            document.getElementById('message-form').classList.add('top-70p');
            document.getElementById('close-message-form').addEventListener("click", 
            ()=>{
                document.getElementById('message-form').classList.remove('top-70p')
            });
        };
        
    });
});

/* head fixed */
const headFixed = () =>{
    let navB = document.getElementsByTagName('nav')[0]
    if(window.scrollY > 60){
        navB.classList.add('nav-fixed')
    }else{
        navB.classList.remove('nav-fixed')
    }
    
};
document.addEventListener('scroll', ()=>{
    headFixed();
});


/* contact us */
const validForm = () =>{
    let form = document.getElementById('contact-form');
    let allEl = form.querySelectorAll('*');
    let message = 'Please fill out this field with your';
    let message2 = 'Please fill out this field with a correct email adress';
    let validField = [];
    let inputNumber = 0;

    allEl.forEach(el => {
        (
            el.hasAttribute('name') && el.parentElement.childElementCount > 2 ? 
            el.parentElement.lastElementChild.classList.add('d-none') : null
        )
    });
    for(let el of allEl){
        if(el.hasAttribute('name')){
            inputNumber += 1;
            if(el.checkValidity() && el.value.length>1){
                validField.push(el);
            }else{
                let parentEl = el.parentElement;
                let errorConta = parentEl.querySelector(`#error-${el.id}`);
                if(errorConta){
                    errorConta.classList.remove('d-none');
                }else{
                    let pEl = document.createElement('p');
                    pEl.classList.add('text-danger', "mb-0", 'mt-1', 'fs-14');
                    pEl.textContent = el.name == "email" ? message2 : `${message} ${el.getAttribute('namV')}`;
                    pEl.setAttribute('id', `error-${el.id}`)
                    parentEl.appendChild(pEl);
                };
                el.focus();
                return
            }
        };
    };

    if(validField.length == inputNumber){
        let success = document.getElementById('form-success');
        form.classList.add('d-none');
        success.style.height = "500px";
        success.classList.remove('d-none');
    }
    
};
document.getElementById('contact-btn-submit').addEventListener('click', (event)=>{
    event.preventDefault()
    validForm();
})



/* Logo and Websites created */
const logodisplay = () =>{
    let el = document.getElementById('img-logo-container');
    let elScrollWidth = el.scrollWidth;
    let elScrollWVisib = el.offsetWidth;
    let rest = elScrollWidth - elScrollWVisib

    let start = 1;
    let forward = true;
    setInterval(() => {
        if(start <= rest && forward){
            el.scrollTo(start, 0);
            start++
        }else{
            start--;
            el.scrollTo(start, 0);
            start == 1 ? forward = true : forward = false
        }
    }, 70);
};
window.addEventListener('scroll', ()=>{
    let el = document.getElementById('web-count-container');
    if(isVisibleByC('web-count-container', false, true)){
        if(el.hasAttribute('displaying')){
           null;  
        }else{ 
            countNumber(86, "web-count", 50, "+");
            el.setAttribute("displaying", "on");
        }; 
    }
});


/* Portf Display */
const displayPortf = (backOrFor=true) =>{
    let backBtn = document.getElementById('portf-btn-back');
    let forwBtn = document.getElementById('portf-btn-forward');
    let container = document.getElementById('portf-container');
    let curStep = (
        container.hasAttribute('step') ?  
        parseInt(container.getAttribute('step')) : 0
    )

    let nexStep = 0
    if(!backOrFor && curStep >= 1){
        nexStep = curStep - 1
    }else if(backOrFor){
        nexStep = curStep + 1
    };

    let visibleWidth = container.offsetWidth;
    let totalScroll = container.scrollWidth;
    let elLength = container.children.length - 1;
    
    if(backOrFor){
       container.scrollTo(visibleWidth*nexStep, 0); 
    }else{
        let restToScrol = elLength - curStep;
        let scrollX = (visibleWidth*restToScrol) + visibleWidth*2
        container.scrollTo(totalScroll - scrollX, 0);
    };
    

    if(nexStep >= elLength){
        container.setAttribute('step', `${elLength}`)
    }else{
        container.setAttribute('step', `${nexStep}`);
    };       
    

    if(nexStep >= elLength){
        forwBtn.classList.add('d-none');
    }else {
        forwBtn.classList.remove('d-none');
    }
    
    if(nexStep <= 0){
        backBtn.classList.add('d-none');
    }else{
        backBtn.classList.remove('d-none');
    };
};
document.getElementById('portf-btn-forward').addEventListener('click', ()=>{
    displayPortf(true);
});
document.getElementById('portf-btn-back').addEventListener('click', ()=>{
    displayPortf(false);
});


/* How we help and step*/
document.addEventListener('scroll', ()=>{
    document.querySelectorAll('.Tr-1').forEach((el)=>{
        if(isVisibleByC(el.id, false, true)){
            el.classList.add('An-4')
        }
    });
});

/* Process */
document.addEventListener('scroll', ()=>{
    document.querySelectorAll('.process').forEach((el)=>{
        if(isVisibleByC(el.id, false, true)){
            el.firstElementChild.lastElementChild.classList.add('bg-warning')
        }
    })
});


/* Review */
document.querySelectorAll('.An-5').forEach((el)=>{
    el.addEventListener('click', ()=>{
        el.classList.remove('An-5')
    });
});
const displayReview = (backOrFor=true) =>{
    let reviewContainer = document.getElementById('review-container');
    let backBtn = document.getElementById('review-btn-back');
    let nextBtn = document.getElementById('review-btn-forward');
    let visibleWidth = reviewContainer.offsetWidth;
    let totalScroll = reviewContainer.scrollWidth;
    let currentScrollWidth = (
        reviewContainer.hasAttribute('scr') ? parseInt(reviewContainer.getAttribute('scr')) :
        0
    );
    
    let nextScroll = 0;
    if(!backOrFor && currentScrollWidth > 0){
        nextScroll = (
            currentScrollWidth == visibleWidth ? currentScrollWidth - visibleWidth : 
            currentScrollWidth - visibleWidth*2 
        );
    }else if(backOrFor){
        nextScroll = (
            currentScrollWidth == 0 ? currentScrollWidth + visibleWidth*2 : 
            currentScrollWidth + visibleWidth
        );
    }
    

    if(backOrFor){
        reviewContainer.scrollTo(
            currentScrollWidth + visibleWidth, 0
        );
    }else{
        reviewContainer.scrollTo(
            currentScrollWidth - (visibleWidth*2), 0
        );
    };

    if(nextScroll >= totalScroll){
      reviewContainer.setAttribute('scr', `${totalScroll}`) ;
    }else{
        reviewContainer.setAttribute('scr', `${nextScroll}`) ;
    }
    

    if(nextScroll >= totalScroll){
        nextBtn.classList.add('d-none');
    }else{
        nextBtn.classList.contains('d-none') ? nextBtn.classList.remove('d-none') : null;
    };

    if(nextScroll <= 0){
        backBtn.classList.add('d-none');
    }else{
        backBtn.classList.contains('d-none') ? backBtn.classList.remove('d-none') : null;
    };

};
document.getElementById('review-btn-forward').addEventListener('click', ()=>{
    displayReview(true);
});
document.getElementById('review-btn-back').addEventListener('click', ()=>{
    displayReview(false);
});