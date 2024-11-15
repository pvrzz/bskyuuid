document.getElementById('resolverForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userhandle = document.getElementById('userhandle').value;
    const url = `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${userhandle}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError('Invalid handle. Please try again.');
            } else if (data.did) {
                clearError();
                window.location.href = `result.html?uuid=${data.did}`;
            } else {
                showError('User handle not found.');
            }
        })
        .catch(error => {
            showError('Error resolving user handle.');
            console.error('Error:', error);
        });
});

function showError(message) {
    const userhandleInput = document.getElementById('userhandle');
    userhandleInput.classList.add('error');
    userhandleInput.placeholder = message;
    userhandleInput.value = '';
    document.getElementById('result').innerText = '';
}

function clearError() {
    const userhandleInput = document.getElementById('userhandle');
    userhandleInput.classList.remove('error');
    userhandleInput.placeholder = 'Enter user handle';
}
