 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDbPwvJmHRMxov5WO8nhcGGCYDrlGzJz9A",
  authDomain: "homework7-28ff4.firebaseapp.com",
  databaseURL: "https://homework7-28ff4.firebaseio.com",
  projectId: "homework7-28ff4",
  storageBucket: "homework7-28ff4.appspot.com",
  messagingSenderId: "640401754353"
};

firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Values

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";
  var nextArrival = "";
  var minsAway = "";
  
  //Conversion Values
  var newTime = "";
  var tRemainder = "";
  var tMinutesTillTrain;
  var nextTrain;

  //Data Referene
  var trainNameData = "";
  var destinationData = "";
  var arrivalData = "";
  var frequencyData = "";
  var MinuteAwayData = "";

  // Add on click function for submit button
  $("#submit").on("click", function() {
    event.preventDefault();

  // Get values from inputs
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();

  //Remove input info

$("#trainName").val("");
$("#destination").val("");
$("#trainTime").val("");
$("#frequency").val("");

// Conversions 

var currentTime = moment();
    diffTime = moment().diff(moment(trainTime), "minutes");

    //Time apart (remainder)
    tMinutesTillTrain = diffTime % frequency;

    //minutes until train

    tMinutesTillTrain = frequency - tRemainder;

    //Next train

    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nexTrainFormat = moment(nextTrain).format("hh:mm:ss a");


  // Pushing information to firebase database

  dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nexTrainFormat,
    minsAway: tMinutesTillTrain


  })

});

  //Add fire base watcher
  dataRef.ref().on("child_added", function(snapshot) {
    //Storing the snapshot.val in a variable
    
    var ss = snapshot.val();

      trainNameData = ss.trainName
      destinationData = ss.destination
      arrivalData = ss.nextArrival
      frequencyData = ss.frequency
      MinuteAwayData = ss.minsAway
    
      // Data Array

      var dataArray = [trainNameData, destinationData, frequencyData, arrivalData, MinuteAwayData];
      var newTr = $("<tr>")
      for (var i = 0; i < dataArray.length; i++) {
        var newTd = $("<td>");
        newTd.text(dataArray[i]);
        newTd.appendTo(newTr)
      }
      $("table tbody").append(newTr)
    });
  




  


    




