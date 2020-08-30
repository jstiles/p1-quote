// ----------------------------------------------------------------------------
// -- Udemy Portfolio Class : Quote Generator project
// --
// --
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// --
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// ----------------------------------------------------------------------------
// -- loading spinner while retrieving quote
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// ----------------------------------------------------------------------------
// -- getQuote()
// -- Get quote using forismatic API
// -- TODO: cache quotes locally (db or file). If t/o hit load local.

async function getQuote() {
  loading();
  // -- proxyUrl used to solve CORS problem.  See class appendix for how to
  // -- create your own proxy.  This one may not always be there.  Possibly
  // -- find alternative.  Kind of goofie.
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === '') {
      authorText.innerText = '--' + 'Unknown'
    } else {
      authorText.innerText = '--' + data.quoteAuthor;
    }
    // -- Need to reduce font size for long quotes.  Verify by seeing to 50.
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove(long-quote);
    }
    quoteText.innerText = data.quoteText;

    // --Stop loader show quote text
    complete();

  } catch (error) {
    // -- Sometimes get unexpected token or char in quote.  Play it again Sam.
    getQuote();
  }
}

// ----------------------------------------------------------------------------
// -- Tweet Quote.  Need to login to twitter to complete tweet.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// ----------------------------------------------------------------------------
// -- Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ----------------------------------------------------------------------------
// -- generate quote when page loads
getQuote();
