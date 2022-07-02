/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('.calculating__result span')

    let gender, ratio, height, weight, age
    const activeClass = 'calculating__choose-item_active'

    getDataFromLS()
    calcTotal()

    getStaticInformation('#gender')
    getStaticInformation('#activity')

    getDynamicInformation('#weight')
    getDynamicInformation('#height')
    getDynamicInformation('#age')

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            return (result.textContent = '----')
        }
        if (gender === 'female') {
            return (result.textContent = Math.round(ratio * (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age)))
        }
        if (gender === 'male') {
            return (result.textContent = Math.round(ratio * (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age)))
        }
    }

    function getStaticInformation(parentSelector) {
        const choiceItems = document.querySelectorAll(`${parentSelector} .calculating__choose-item`)

        document
            .querySelector(parentSelector)
            .addEventListener('click', (e) => {
                if (e.target.classList.contains('calculating__choose-item')) {
                    choiceItems.forEach((item) => item.classList.remove(activeClass))
                    e.target.classList.add(activeClass)

                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio')
                        localStorage.setItem('ratio', ratio)
                    } else {
                        gender = e.target.getAttribute('id')
                        localStorage.setItem('gender', gender)
                    }
                    calcTotal()
                }
            })
    }

    function getDynamicInformation(inputSelector) {
        const input = document.querySelector(inputSelector)
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '')

            switch (e.target.id) {
                case 'weight':
                    weight = +input.value
                    localStorage.setItem('weight', weight)
                    break
                case 'height':
                    height = +input.value
                    localStorage.setItem('height', height)
                    break
                case 'age':
                    age = +input.value
                    localStorage.setItem('age', age)
                    break
            }
            calcTotal()
        })
    }

    function getDataFromLS() {
        if (localStorage.getItem('gender')) gender = localStorage.getItem('gender')
        else gender = 'female'

        if (localStorage.getItem('ratio')) ratio = localStorage.getItem('ratio')
        else ratio = 1.375

        document.querySelector(`#gender #${gender}`).classList.add(activeClass)
        document
            .querySelector(`#activity .calculating__choose-item[data-ratio="${ratio}"]`)
            .classList.add(activeClass)

        if (localStorage.getItem('height')) {
            height = localStorage.getItem('height')
            document.querySelector('#height').value = height
        }
        if (localStorage.getItem('weight')) {
            weight = localStorage.getItem('weight')
            document.querySelector('#weight').value = weight
        }
        if (localStorage.getItem('age')) {
            age = localStorage.getItem('age')
            document.querySelector('#age').value = age
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hideShowModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hideShowModal */ "./js/modules/hideShowModal.js");


const forms = () => {
    const allForms = document.querySelectorAll('form')

    allForms.forEach((form) => {
        bindPostData(form)
    })

    const messages = {
        failure: 'Что-то пошло не так, повторите попытку позже',
        success: 'Спасибо! Заявка успешно отправлена',
        loading: 'img/form/spinner.svg',
    }

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST', headers: {'Content-type': 'application/json'}, body: data,
        })

        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = messages.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)
            console.log(formData)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data)
                    showThanksModal(messages.success)
                    statusMessage.remove()
                })
                .catch((e) => {
                    console.log(e)
                    showThanksModal(messages.failure)
                    statusMessage.remove()
                })
                .finally(() => {
                    form.reset()
                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        prevModalDialog.classList.add('hide')
        prevModalDialog.classList.remove('show')
        ;(0,_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.openModal)()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.remove('hide')
            prevModalDialog.classList.add('show')
            ;(0,_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.closeModal)()
        }, 4000)
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/getZero.js":
/*!*******************************!*\
  !*** ./js/modules/getZero.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getZero);

/***/ }),

/***/ "./js/modules/hideShowModal.js":
/*!*************************************!*\
  !*** ./js/modules/hideShowModal.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modal) {
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
}
function openModal(modal) {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
}

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const menu = () => {
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.desc = desc
            this.price = price
            this.classes = classes
            this.transfer = 27
            this.parent = document.querySelector(parentSelector)
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = +this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className)
                })
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`
            this.parent.append(element)
        }
    }

// async function getResources(url) {
//     const response = await fetch(url)
//
//     if (!response.ok) {
//         throw new Error(response.status)
//     }
//     return await response.json()
// }
//
// getResources('http://localhost:3000/menu')
//     .then(data => {
//         data.forEach(({img, altimg, title, descr, price}) => {
//             new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render()
//         })
//     })
    axios
        .get('http://localhost:3000/menu', {
            json: true,
        })
        .then((res) => {
            res.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render()
            })
        })

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hideShowModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hideShowModal */ "./js/modules/hideShowModal.js");


const modal = () => {
    const modal = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('[data-close]')
    const modalTrigger = document.querySelectorAll('[data-modal]')

    // Buttons
    modalTrigger.forEach((el) => {
        el.addEventListener('click', _hideShowModal__WEBPACK_IMPORTED_MODULE_0__.openModal)
    })
    modalCloseBtn.addEventListener('click', _hideShowModal__WEBPACK_IMPORTED_MODULE_0__.closeModal)
    // Outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            (0,_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.closeModal)()
        }
    })
    // Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            (0,_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.closeModal)()
        }
    })

    // function closeModal() {
    //     modal.classList.remove('show')
    //     modal.classList.add('hide')
    //     document.body.style.overflow = ''
    // }
    //
    // function openModal() {
    //     modal.classList.add('show')
    //     modal.classList.remove('hide')
    //     document.body.style.overflow = 'hidden'
    //     // clearInterval(modalTimerId)
    // }

    const modalTimerId = setTimeout(_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.openModal, 15000)

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            (0,_hideShowModal__WEBPACK_IMPORTED_MODULE_0__.openModal)()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getZero */ "./js/modules/getZero.js");


const slider = () => {
    const allSlides = document.querySelectorAll('.offer__slide')
    const slider = document.querySelector('.offer__slider')

    const totalCountSlidesNode = document.querySelector('#total')
    const currentCountSlidesNode = document.querySelector('#current')

    const prevBtnNode = document.querySelector('.offer__slider-prev')
    const nextBtnNode = document.querySelector('.offer__slider-next')

    const slidesWrapperNode = document.querySelector('.offer__slider-wrapper')
    const slidesFieldNode = document.querySelector('.offer__slider-inner')

    const width = window.getComputedStyle(slidesWrapperNode).width.slice(0, -2)

    let activeSlideIndex = 0

    totalCountSlidesNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(allSlides.length)
    currentCountSlidesNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(activeSlideIndex + 1)

    slidesFieldNode.style.width = allSlides.length * 100 + '%'

    allSlides.forEach((slide) => {
        slide.style.width = width
    })

    nextBtnNode.addEventListener('click', () => {
        if (activeSlideIndex >= allSlides.length - 1) {
            activeSlideIndex = 0
        } else {
            activeSlideIndex++
        }
        setSlide(activeSlideIndex)
    })
    prevBtnNode.addEventListener('click', () => {
        if (activeSlideIndex <= 0) {
            activeSlideIndex = allSlides.length - 1
        } else {
            activeSlideIndex--
        }
        setSlide(activeSlideIndex)
    })

    slider.style.position = 'relative'

    const dots = document.createElement('ol')
    dots.classList.add('carousel-indicators')

    for (let i = 0; i < allSlides.length; i++) {
        const dot = document.createElement('li')
        dot.classList.add('dot')
        dot.setAttribute('data-slide-to', i)

        dots.append(dot)
    }
    dots.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-slide-to')) {
            setSlide(+e.target.getAttribute('data-slide-to'))
            // document.querySelectorAll('.dot').forEach(item => item.classList.remove('dot-active'))
            // e.target.classList.add('dot-active')
        }
    })

    slider.append(dots)

    function setSlide(slideIndex) {
        activeSlideIndex = slideIndex
        slidesFieldNode.style.transform = `translateX(-${activeSlideIndex * width}px)`
        currentCountSlidesNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(activeSlideIndex + 1)
        document
            .querySelectorAll('.dot')
            .forEach((item) => item.classList.remove('dot-active'))
        document
            .querySelector(`.dot[data-slide-to="${slideIndex}"]`)
            .classList.add('dot-active')
    }

    setSlide(0)

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = () => {
    const tabsNode = document.querySelectorAll('.tabheader__item')
    const tabsContentNode = document.querySelectorAll('.tabcontent')
    const tabsParentNode = document.querySelector('.tabheader__items')

    function hideTabContent() {
        tabsContentNode.forEach((el) => {
            el.classList.add('hide')
            el.classList.remove('show', 'fade')
        })
        tabsNode.forEach((el) => {
            el.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(index = 0) {
        tabsContentNode[index].classList.add('show', 'fade')
        tabsContentNode[index].classList.remove('hide')

        tabsNode[index].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParentNode.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabsNode.forEach((el, i) => {
                if (target === el) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getZero */ "./js/modules/getZero.js");


const timer = () => {
    const deadline = '2022-05-24:14:27'

    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date())

        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((total / (1000 * 60)) % 60)
        const seconds = Math.floor((total / 1000) % 60)

        return {
            total, days, hours, minutes, seconds,
        }
    }



    function setClock(selector, endTime) {
        const timerNode = document.querySelector(selector)

        const daysNode = timerNode.querySelector('#days')
        const hoursNode = timerNode.querySelector('#hours')
        const minutesNode = timerNode.querySelector('#minutes')
        const secondsNode = timerNode.querySelector('#seconds')

        let timeInterval

        if (getTimeRemaining(endTime).total > 0) {
            timeInterval = setInterval(updateClock, 1000)
            updateClock()
        }

        function updateClock() {
            const timeRemainingObject = getTimeRemaining(endTime)

            daysNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(timeRemainingObject.days)
            hoursNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(timeRemainingObject.hours)
            minutesNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(timeRemainingObject.minutes)
            secondsNode.textContent = (0,_getZero__WEBPACK_IMPORTED_MODULE_0__["default"])(timeRemainingObject.seconds)

            if (timeRemainingObject.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline)
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");








document.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])()
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])()
    ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])()
    ;(0,_modules_menu__WEBPACK_IMPORTED_MODULE_3__["default"])()
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])()
    ;(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])()
    ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])()
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map