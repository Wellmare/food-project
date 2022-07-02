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
export default tabs