import axios from 'axios'

const menu = (url) => {
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
        .get(url, {
            json: true,
        })
        .then((res) => {
            res.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render()
            })
        })

}
export default menu