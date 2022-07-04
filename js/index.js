import tabs from './modules/tabs'
import modal, {openModal} from './modules/modal'
import slider from './modules/slider'
import menu from './modules/menu'
import timer from './modules/timer'
import forms from './modules/forms'
import calculator from './modules/calculator'

document.addEventListener('DOMContentLoaded', () => {
    const secToTimer = 60
    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId)
    }, secToTimer * 1000)


    const deadline = '08.03.2022, 12:00'


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    modal('[data-modal]', '.modal', modalTimerId)
    menu('http://localhost:3000/menu')
    timer(deadline, '.timer')
    calculator()
    forms('form', modalTimerId, 'http://localhost:3000/requests')
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    })
})
