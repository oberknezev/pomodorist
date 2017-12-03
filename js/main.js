var sessionTime    = 25,      // the desired Session Length, in minutes
    breakTime      = 5,       // the desired Break Length, in minutes
    sessionTimeSecs,          // the desired Session Length, in seconds
    breakTimeSecs,            // the desired Break Length, in seconds
    currentTime,              // the current time remaining, in seconds
    currentState   = "stop",  // the current timer state, "stop", "session" or "break"
    minTime        = 1,       // the minimum allowed time the user can set, in minutes
    maxTime        = 60,      // the maximum allowed time the user can set, in minutes
    sessionDisplay = $('.pomoSession'),
    breakDisplay   = $('.pomoBreak'),
    sessionBtnInc  = $('.pomoSessionInc'),
    sessionBtnDec  = $('.pomoSessionDec'),
    breakBtnInc    = $('.pomoBreakInc'),
    breakBtnDec    = $('.pomoBreakDec'),
    timerClock     = $('.timerClock');

var updateTimerOptions = function() {
    sessionTimeSecs = sessionTime * 60;
    breakTimeSecs = breakTime * 60;

    sessionDisplay.html(sessionTime);
    breakDisplay.html(breakTime);
}

$(document).ready(function() {
    updateTimerOptions();
});

/* Event Handlers for Setting Time */
sessionBtnInc.click(function() {
    sessionTime = (++sessionTime > maxTime) ? maxTime : sessionTime;
    sessionTimeSecs = sessionTime * 60;
    updateTimerOptions();
    timerStop();
});

sessionBtnDec.click(function() {
    sessionTime = (--sessionTime < minTime) ? minTime : sessionTime;
    sessionTimeSecs = sessionTime * 60;
    updateTimerOptions();
    timerStop();
});

breakBtnInc.click(function() {
    breakTime = (++breakTime > maxTime) ? maxTime : breakTime;
    breakTimeSecs = breakTime * 60;
    updateTimerOptions();
    timerStop();
});

breakBtnDec.click(function() {
    breakTime = (--breakTime < minTime) ? minTime : breakTime;
    breakTimeSecs = breakTime * 60;
    updateTimerOptions();
    timerStop();
});

/* Event Handling for Start/Stop */
// Clicking on Clock Time toggles between stop & session states
timerClock.click(function() {
    currentState = (currentState == "stop") ? "session" : "stop";
    timerReset();
});

/* Clock Actions */
setInterval(function() {
    if (currentState == "session" || currentState == "break") {
        currentTime --;
        updateTimer();
    }
}, 1000);

var timerStop = function() {
    currentState = "stop";
    timerReset();
}

var timerReset = function() {
    currentTime = sessionTimeSecs;
    updateTimer();
}

var updateTimer = function() {
    updateTimerClock();
    updateTimerBar();

    console.log('currentState', currentState);
    console.log('currentTime', currentTime);

    if (currentTime <= 0 && currentState == "session") {
        currentState = "break";
        currentTime  = breakTimeSecs;
    } else if (currentTime <= 0 && currentState == "break") {
        currentState = "session";
        currentTime  = sessionTimeSecs;
    }
}

var updateTimerClock = function() {
    var timeMin = Math.floor(currentTime / 60);
    var timeSec = currentTime % 60;

    if (timeSec < 10) { timeSec = "0" + timeSec; }

    $('.timerClock').html(timeMin + ":" + timeSec);
}

var updateTimerBar = function() {
    if (currentState == 'session' || currentState == 'stop') {
        percentDisplay = Math.floor(currentTime / sessionTimeSecs * 100);
        $('.timerBar').css('background', '#58B957');
    } else {
        percentDisplay = Math.floor(currentTime / breakTimeSecs * 100);
        $('.timerBar').css('background', '#DB524B');
    }

    $('.timerBar').css('width', percentDisplay + '%');
}