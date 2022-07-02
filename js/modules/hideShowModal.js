export function closeModal(modal) {
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
}
export function openModal(modal) {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
}