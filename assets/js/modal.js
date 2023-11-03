const openModal = document.getElementById('openModal')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('closeModal')



openModal.addEventListener('click', function() {
    modal.style.display = 'block';
})

window.onclick = function(event) {
    if(event.target === modal){
        modal.style.display = "none"
    }
}

closeModal.addEventListener('click', function() {
    modal.style.display = "none"
})
