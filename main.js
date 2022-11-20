prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '">';
    });
}
console.log("ml5 version - ",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/u1bMe6ZTS/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}
function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error); 
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction=results[0].label;
        speak();
        if (results[0].label == "Good") {
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Victory") {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "Stop") {
            document.getElementById("result_emoji").innerHTML = "&#9995;";
        }
    }

}
function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "This prediction is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}