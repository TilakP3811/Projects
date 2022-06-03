const randomQoute = 'https://api.quotable.io/random';
const displayQuote = document.getElementById('quote')
const quoteInput = document.getElementById('typing-area')
const timerDisplay = document.getElementById('timer')
async function quoteGenerator(){
    return fetch(randomQoute)
        .then(response=>response.json())
        .then(data=>data.content)
}

quoteInput.addEventListener('input', () => {
    const quoteArray = displayQuote.querySelectorAll('span')
    const inputArray = quoteInput.value.split('')
    quoteArray.forEach((characterSpan, index) => {
        const character = inputArray[index]
        if(character==null){
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("incorrect")
        }
        else if(characterSpan.innerText === character){
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        }
        else{
            characterSpan.classList.add("incorrect")
            characterSpan.classList.remove("correct")
        }
    })
});

async function getNextQuote(){
    startTimer()
    const quote = await quoteGenerator()
    displayQuote.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayQuote.appendChild(characterSpan)
    });
    quoteInput.value = null
}
let StartTimer
function startTimer(){
    timerDisplay.innerText = 0
    StartTimer = new Date()
    setInterval(() => {
        timer.innerText = getTimer()
    }, 1000);
}

function getTimer(){
   return Math.floor((new Date()-StartTimer)/1000)
}

getNextQuote()