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

export default calculator