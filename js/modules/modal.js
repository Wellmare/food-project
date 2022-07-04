function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    if (modalTimerId) clearInterval(modalTimerId)
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
}


const modal = (triggersSelector, modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector)
    const modalCloseBtn = document.querySelector(`${modalSelector} [data-close]`)
    const modalTriggers = document.querySelectorAll(triggersSelector)

    // const modalTimerId = setTimeout(() => {
    //     openModal(modalSelector)
    // }, 60000)

    // Buttons
    modalTriggers.forEach((el) => {
        el.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId)
        })
    })
    modalCloseBtn.addEventListener('click', () => {
        closeModal(modalSelector, modalTimerId)
    })
    // Outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modalSelector)
        }
    })
    // Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector)
        }
    })

    //


    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

}
export default modal

export {openModal, closeModal}