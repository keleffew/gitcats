document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const catImage = document.getElementById('catImage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    generateButton.addEventListener('click', generateCat);

    async function generateCat() {
        loadingSpinner.classList.remove('hidden');
        catImage.classList.add('hidden');

        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            
            if (data && data.length > 0) {
                catImage.src = data[0].url;
                catImage.alt = 'Random cat image';
                catImage.onload = () => {
                    loadingSpinner.classList.add('hidden');
                    catImage.classList.remove('hidden');
                };
            } else {
                throw new Error('No cat image found');
            }
        } catch (error) {
            console.error('Error fetching cat image:', error);
            loadingSpinner.classList.add('hidden');
            alert('Failed to fetch a cat image. Please try again.');
        }
    }
});
