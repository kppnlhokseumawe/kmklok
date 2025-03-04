document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value;
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Ganti dengan API key Anda
    const url = `https://www.googleapis.com/drive/v3/files?q=name contains '${searchQuery}' and trashed=false&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.files && data.files.length > 0) {
                data.files.forEach(file => {
                    const fileElement = document.createElement('div');
                    fileElement.className = 'file-item';
                    fileElement.innerHTML = `
                        <strong>${file.name}</strong><br>
                        <a href="https://drive.google.com/file/d/${file.id}/view" target="_blank">Open</a>
                    `;
                    resultsDiv.appendChild(fileElement);
                });
            } else {
                resultsDiv.innerHTML = '<p>No files found.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
