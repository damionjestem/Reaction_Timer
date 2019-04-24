// Ilość prób
var howManyTrials = 5;
// Zmierzone czasy reakcji
var reactionTimes = [];
//Rozpoczęcie pomiaru czasu
var trialStart = 0;
// Koniec pomiaru czasu
var trialEnd = 0;

//Licznik próby
var trialCounter = 0;
//Po jakim czasie ma się pojawić zielony przycisk;
var randomTimer = 0;


// Resetowanie czasów reakcji
function ResetTimes() {
    for (var i = 0; i < howManyTrials; i++) {
        reactionTimes[i] = 0;
    }
}

// Rozpocznij odliczanie do pomiaru czasu
function StartIdle() {
    document.getElementById("button").src = "Images/buttonBlue.png";
    document.getElementById("button").onclick = function () { FalseStart(); };

    if (trialCounter > howManyTrials - 1) {
        ResetTimes();
        trialCounter = 0;

        UpdateTable(0);
    }

    trialCounter++;

    randomTimer = Math.floor(Math.random() * 1000 + 500);
    setTimeout(StartTimer, randomTimer);
}

// Rozpoczęcie pomiaru czasu reakcji
function StartTimer() {
    document.getElementById("button").src = "Images/buttonGreen.png";
    document.getElementById("button").onclick = function () { StopTimer(); };

    //Aktualny czas
    trialStart = new Date().getTime();
}

// False start - kara za za szybkie klikanie
function FalseStart() {
    trialStart = new Date().getTime() - 1000;
    StopTimer();
}

// Zakończenie pomiaru czasu reakcji i wyświetlenie wyniku
function StopTimer() {
    document.getElementById("button").src = "Images/buttonRed.png";
    document.getElementById("button").onclick = function () { StartIdle(); };

    // Średnia
    var average = 0;
    // Wyliczony czas
    trialEnd = new Date().getTime() - trialStart;
    reactionTimes[trialCounter - 1] = trialEnd;

    UpdateTable(average);

    if (trialCounter > howManyTrials - 1) {
        for (var i = 0; i < trialCounter; i++) {
            average += reactionTimes[i];
        }
        //wyliczanie średniej wyników
        average = Math.round(average / howManyTrials);

        UpdateTable(average);
        alert("Your average reaction time: " + average + "ms");
    }

}

//Odświeżanie tabeli
function UpdateTable(average) {
    document.getElementById("timesTable").innerHTML = "";
    // Wyświetlanie czasu reakcji
    document.getElementById("timesTable").innerHTML +=
        '<tr>' +
        '<th> Attempt No. </th>' +
        '<th> Reaction time </th>' +
        '</tr>';

    // wyświetlenie czasu reakcji
    for (var i = 0; i < howManyTrials; i++) {
        document.getElementById("timesTable").innerHTML +=
            '<tr>' +
            '<td> Attempt' + (i + 1) + '</td>' +
            '<td>' + reactionTimes[i] + 'ms </td>' +
            '</td>';
    }
    document.getElementById("timesTable").innerHTML +=
        '<tr>' +
        '<td> Average </td>' +
        '<td>' + average + 'ms </td>' +
        '</tr>';
}