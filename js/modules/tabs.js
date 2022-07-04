const tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) => {
    const tabsNode = document.querySelectorAll(tabsSelector)
    const tabsContentNode = document.querySelectorAll(tabsContentSelector)
    const tabsParentNode = document.querySelector(tabsParentSelector)

    function hideTabContent() {
        tabsContentNode.forEach((el) => {
            el.classList.add('hide')
            el.classList.remove('show', 'fade')
        })
        tabsNode.forEach((el) => {
            el.classList.remove(activeClass)
        })
    }

    function showTabContent(index = 0) {
        tabsContentNode[index].classList.add('show', 'fade')
        tabsContentNode[index].classList.remove('hide')

        tabsNode[index].classList.add(activeClass)
    }

    hideTabContent()
    showTabContent()

    tabsParentNode.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains(tabsSelector.replace(/\./g, ''))) {
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