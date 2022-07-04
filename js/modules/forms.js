import {closeModal, openModal} from './modal'
import checkNumInput from './checkNumInput'
import {postData} from '../services/services'

const forms = (formsSelector, modalTimerId, url) => {
    const allForms = document.querySelectorAll(formsSelector)

    checkNumInput('.num-input')


    allForms.forEach((form) => {
        bindPostData(form)
    })

    const messages = {
        failure: 'Что-то пошло не так, повторите попытку позже',
        success: 'Спасибо! Заявка успешно отправлена',
        loading: 'img/form/spinner.svg',
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData(url, json)
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
        openModal('.modal', modalTimerId)

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
            closeModal('.modal')
        }, 4000)
    }
}
export default forms