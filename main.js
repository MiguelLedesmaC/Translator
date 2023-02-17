//Elementos del DOM
let translateFrom = document.querySelector('#translate__from')
let translateTo = document.querySelector('#translate__to')

let btnTranslate = document.querySelector('.btn')

let inputTranslate = document.querySelector('#input__translate')
let outputTranslate = document.querySelector('#output__translate')



//Conseguir la lista de lenguajes desde el servidor
const GET__URL = 'https://text-translator2.p.rapidapi.com/getLanguages'
const myKEY = KEY

const OPTIONS = {
    method:'get',
    headers: {
        'X-RapidAPI-Key': myKEY,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

let sourceLanguage = 'es';
let targetLanguage = 'de';


fetch(GET__URL, OPTIONS)
.then(res => res.json())
.then(objeto =>{
    let languages = objeto.data.languages;
   
    
    languages[88].name = 'Español'
    languages[30].name = 'Aleman'
//El codigo necesario para cargar el select

    languages.forEach((element) => {

        translateFrom.innerHTML += `
            <option value="${element.code}">${element.name}</option>`
        
        translateTo.innerHTML += `
            <option value="${element.code}">${element.name}</option>`
            
        
    })
    translateFrom.addEventListener('click',()=>{
        
        sourceLanguage = translateFrom.value
    })
    translateTo.addEventListener('click',()=>{
        targetLanguage = translateTo.value
    })
   
    
})
.catch(error => console.log(`Ha habido un error: ${error}`))

//Traduccion del texto introducido
//Recoger los datos tel input para enviarlos al servidor

btnTranslate.addEventListener('click',()=>{
    let textToTranslate = inputTranslate.value;




    const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", sourceLanguage);
        encodedParams.append("target_language", targetLanguage);
        encodedParams.append("text", textToTranslate);



const OPTIONS = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': myKEY,
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://text-translator2.p.rapidapi.com/translate', OPTIONS)
	.then(response => response.json())
	.then(response => outputTranslate.value = response.data.translatedText)
	.catch(err => console.error(err));
})

