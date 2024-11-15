// resolver.js
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('handle');

    if (!username) {
        document.body.innerHTML = JSON.stringify({ error: 'missing_handle' }, null, 2);
        return;
    }

    try {
        const handleUrl = `https://bsid.pvrz.lol/api/handle?handle=${username}`;
        const handleResponse = await fetch(handleUrl);
        const handleData = await handleResponse.json();

        if (handleData.error) {
            document.body.innerHTML = JSON.stringify({ error: 'invalid_handle' }, null, 2);
            return;
        }

        const handle = handleData.handle;

        const url = `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.body.innerHTML = JSON.stringify({ error: 'invalid_handle' }, null, 2);
            return;
        }

        document.body.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.body.innerHTML = JSON.stringify({ error: 'server_error' }, null, 2);
    }
});
