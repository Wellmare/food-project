const checkNumInput = (inputsSelector) => {
    const inputs = document.querySelectorAll(inputsSelector)

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '')
        })
    })
}
export default checkNumInput