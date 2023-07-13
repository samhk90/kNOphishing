async function checkPhishingLink(url, apiKey) {
  const apiUrl = 'https://phish.report/api/submit/';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`
    },
    body: JSON.stringify({
      url: url
    })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking phishing link:', error);
    return null;
  }
}

function handleClick(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const apiKey = 'secret_crbymnrtl3wg_K5GF2pzJSQAHX3YODckDutbJTTqaLdWp';
  const linkInput = document.getElementById('url');
  const link = linkInput.value;

  if (link.trim() === '') {
    alert('Please enter a URL');
    return;
  }
  
  checkPhishingLink(link, apiKey)
    .then(result => {
      if (result && result.results && result.results[0].verified) {
        alert('Phishing link detected');
      } else {
        alert('Not a phishing link');
      }
    });
}
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', handleClick);
