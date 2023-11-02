const openModal = document.getElementById('openModal')
const modal = document.getElementById('modal')

const closeModal = () => {
    if(event.target === modal || document.getElementById('closeModal')){
        modal.style.display = 'none'; 
    }
}

openModal.addEventListener('click', function() {
    modal.style.display = 'block';
})

modal.addEventListener('click', closeModal)

