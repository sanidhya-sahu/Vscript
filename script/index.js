var data = "";
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support the Speech Recognition API.');
} else {
    mic.style.filter = "invert(0.3)";
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    // recognition.interimResults = true;

    recognition.onstart = function () {
        recognizing = true;
        mic.style.filter = "invert(1)";
    };
    recognition.onend = function () {
        if (ignore_onend) {
            mic.style.filter = "invert(0.3)";
            recognizing = false;
            return;
        }
        recognition.start();
    };
    // recognition.onspeechend = function () {
    //     if (recognizing==true) {
    //         console.log("sound end")
    //         // recognition.start();
    //     }
    // }
    recognition.onresult = (event) => {
        console.log(event.results[event.results.length - 1][0].transcript)
        // result = event.results[event.results.length - 1][0].transcript;
        if (event.results[event.results.length - 1].isFinal == true) {
            console.log(event.results)
            data = data + " " + event.results[event.results.length - 1][0].transcript;
        }
        // data = data +" "+ result;
        output.textContent = data;
    };
}
function startButton(event) {
    // if (recognizing) {
    //     recognition.stop();
    //     return;
    // }
    if (mic.style.filter== "invert(0.3)") {
        recognition.start();
        mic.style.filter = "invert(1)";
        ignore_onend = false;
    }
    else{
        mic.style.filter = "invert(1)";
        recognition.stop();
    }
}
function downloadData(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}
$(document).ready(function() {
    $('#downloadbtn').click(function() {
        const data = output.textContent;
        const date = new Date();
        // console.log(date.getDate)
        const nam = `Transcript_${date}`
        downloadData(data,nam);
        $('#downloadLink')[0].click();
    });
});

function whatsapp() {
    window.open(`https://wa.me/?text=${output.textContent}`)
}