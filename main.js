https://teachablemachine.withgoogle.com/models/9SrlVptxl/
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
   Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML='<img id="resultimage" src=" '+data_uri+' "/>';
   }) ;
}

console.log("ml5 version" , ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9SrlVptxl/model.json" , modelLoaded)

function modelLoaded() {
    console.log("Model is loaded")
}

function check() {
    img = document.getElementById("resultimage");
    classifier.classify(img , gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
    

    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    toSpeak = "";
    if (results[0].label = "victory") {
        toSpeak = "That was a marvellous victory";
        document.getElementById("update_emoji").innerHTML= "&#9996;"
    }
    else if(results[1].label = "thumbs-up") {
        toSpeak = "All the best";
        document.getElementById("update_emoji").innerHTML= "&#128077;"
    }
    else if (results[2].label = "superb") {
        toSpeak = "Amazing";
        document.getElementById("update_emoji").innerHTML= "&#128076;"
    }
    speak();
}
}

function speak() {
    var synth= window.speechSynthesis;
    speechdata= toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speechdata);
    synth.speak(utterThis);
}
