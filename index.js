// TODO Form listners

function formSubmitListener() {
  $('#form-container').on('submit', (event) => {
    event.preventDefault();
    let username = $('#username').val();
    fetchFromAPI(username);
    $('#username').val('');
  });
}

// TODO .fetch from API (post-formatting)

function fetchFromAPI(username) {
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/vnd.github.mercy-preview+json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`https://api.github.com/users/${username}/repos?accept=application/vnd.github.v3+json`, requestOptions)
    .then((response) => response.json())
    .then((result) => displayResults(result))
    .catch((error) => console.log('error', error));
}

// TODO Format the results and apply them to the results-container

function displayResults(responseJson) {
  $('#results-container').html(createResultsString(responseJson));
  $('#results-container').removeClass('hidden');
}

// TODO Create the string for the results function

function createResultsString(responseJson) {
  let results = [];
  for (let i = 0; i < responseJson.length; i++) {
    if (responseJson[i].description) {
      results.push(`
        <div class="single-result">
          <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
          <p>${responseJson[i].description}</p>
        </div>
        `);
    } else {
      results.push(`
        <div class="single-result">
          <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
          <p>No description</p>
        </div>            
            `);
    }
  }
  return results.join('');
}

// TODO main function to initiate the form listners

function main() {
  formSubmitListener();
}

$(main());
