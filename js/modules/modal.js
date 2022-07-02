import {closeModal, openModal} from './hideShowModal'

const modal = () => {
    const modal = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('[data-close]')
    const modalTrigger = document.querySelectorAll('[data-modal]')

    // Buttons
    modalTrigger.forEach((el) => {
        el.addEventListener('click', openModal)
    })
    modalCloseBtn.addEventListener('click', closeModal)
    // Outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal()
        }
    })
    // Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal()
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

    const modalTimerId = setTimeout(openModal, 15000)

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

}
export default modal