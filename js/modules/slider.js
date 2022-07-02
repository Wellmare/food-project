import getZero from "./getZero";

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

    totalCountSlidesNode.textContent = getZero(allSlides.length)
    currentCountSlidesNode.textContent = getZero(activeSlideIndex + 1)

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
        currentCountSlidesNode.textContent = getZero(activeSlideIndex + 1)
        document
            .querySelectorAll('.dot')
            .forEach((item) => item.classList.remove('dot-active'))
        document
            .querySelector(`.dot[data-slide-to="${slideIndex}"]`)
            .classList.add('dot-active')
    }

    setSlide(0)

}
export default slider