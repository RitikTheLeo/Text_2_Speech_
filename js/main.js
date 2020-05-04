//Initialise SpeechSynth API
const synth=window.speechSynthesis;

//DOM elements
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const pitch=document.querySelector('#pitch');
const rateValue=document.querySelector('#rate-value');
const pitchValue=document.querySelector('#pitch-value');
const body=document.querySelector('body');

//Initialise voices array
let voices=[];

const getVoices=()=>{
    voices=synth.getVoices();

    //loop through voices and create option element for each
    voices.forEach(voice=>{
        const option=document.createElement('option');
        option.textContent=voice.name+'('+ voice.lang +')';

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
};

getVoices();
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged=getVoices;
}

//Speak
const speak=()=>{

    if(synth.speaking){
        console.log('Already Speaking...');
        return;
    }

    if(textInput.value!== ''){
        body.style.background='#141414 URL(img/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';

        const speakText=new SpeechSynthesisUtterance(textInput.value);

        speakText.onend=e=>{
            console.log('Done Speaking...');
            body.style.background='#141414';
        }

        speakText.onerror=e=>{
            console.log('Something went wrong...');
        }

        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice;
            }
        })
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        synth.speak(speakText);
    }
}

//event listeners
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
})

rate.addEventListener('change', e => rateValue.textContent=rate.value);
pitch.addEventListener('change', e => pitchValue.textContent=pitch.value);

voiceSelect.addEventListener('change', e => speak());