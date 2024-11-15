// resolver.js
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('handle');

    if (!username) {
        window.location.href = '/?error=missing_handle';
        return;
    }

    try {
        const handleUrl = `https://bsid.pvrz.lol/api/handle?handle=${username}`;
        const handleResponse = await fetch(handleUrl);
        const handleData = await handleResponse.json();

        if (handleData.error) {
            window.location.href = '/?error=invalid_handle';
            return;
        }

        const handle = handleData.handle;

        const url = `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            window.location.href = '/?error=invalid_handle';
            return;
        }

        if (data.did) {
            window.location.href = `/result.html?uuid=${data.did}`;
            return;
        }

        window.location.href = '/?error=not_found';
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/?error=server_error';
    }
});
