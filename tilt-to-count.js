// _____ Instructions_____
// go here ??? xxx

// _____ todo sunday_____

// do best score variable.... ???
// do func for set color setLed(4,4,4)
// add functionality to coiunt by 10 and all others to check for win

// _____ CONSTANTS _____

// for the loop forever, loop requires a delay or error
var YIELD_DELAY = 0.2;

// set to false when developing, true for production
var VOICE_HELP = false;

// set to true when developing
var VOICE_HELP_DEV = true;

// delay after speaking a number, min. about 1.2
var SPEAK_NUMBER_DELAY = 1.2;

// these set how much Sphero has to tilt.
var ORIENTATION_1 = 12;
var ORIENTATION_2 = 35;
var ORIENTATION_3 = 45;


var RANDOM_NUMBER_MIN = 1;
var RANDOM_NUMBER_MAX = 10;

var RESETTING_MESSAGE = 'Resetting number to zero and getting new random number.';

// messages as constants
var START_MESSAGE =
  'Welcome. Please put your thumb on the blue tail light.' +
  'Hold Sphero level, tilt towards you to count up, tilt away from you to count down.' +
  'You can count by tens by tilting at more than a 45 degree angle.' +
  'Please wait until you hear Sphero say  "ready".';

var READY_MESSAGE = 'Ready';

var WINNING_MESSAGE = 'You won, the winning number was:';

var RANDOM_NUMBER_MESSAGE ='Random number is :';

var BEST_TIME_MESSAGE = 'best time is: ';

var TOOK_TO_SOLVE_MESSAGE = 'You took to solve:';

var SECONDS = ' seconds.';



// _____ global variables ___________________________________________

var number = 0;
var randomNumber = 0;

var startTime = 0;
var endTime = 0;
var elapsedTime = 0;
var bestTime = 0;

// _____ register events ________________________________



// _____ functions ______________________________________

async function speakDelay(message, bright) {
  // 10 letters will delay 1 second
  // speak (message);
  //await delay(message.length / 10 );
  //message = START_MESSAGE;

  // numb = numb.toFixed(2);

  // bright - will flash while speaking
  //
  if (bright) {
    //speak('flash');await delay(1);
    setColorStart();

  }

  pause = +(message.length / 15).toFixed(1);
  // await delay(2);
  // speak (' pause is:' + pause);
  //	await delay(3);
  // for short messages, must allow more time
  if (pause < 1) {
    pause = 1.5;
  }


  speak(message);
  await delay(pause);
  // speak ('end');
  return;
}

async function blink() {
  playSound(Sound.Effects.Click);
  //setMainLed({ r: 10, g: 0 ,b: 0 });
  setLed(10, 0, 0);	
  await delay(1.0);
  //setMainLed({ r: 0, g: 10, b: 0 });
  setLed(0, 10, 0);
  await delay(1.0);
  //setMainLed({ r: 0, g: 0, b: 0 });
  setLed(0, 0, 0);	
}

async function clickCount() {
  //await setColorCounting();
 // playSound(Sound.Effects.Click);
 // await delay(0.2);
}

async function getRandomNumber() {
  randomNumber = getRandomInt(RANDOM_NUMBER_MIN, RANDOM_NUMBER_MAX);
  if (VOICE_HELP_DEV) {
    await setColorStart();
    await speakDelay(RANDOM_NUMBER_MESSAGE + randomNumber);
     await delay(1);
  }
}

async function checkWinningNumber() {
  if (number === randomNumber) {
	  await setColorAlert();

    endTime = new Date().getTime() / 1000;

    // this returns a string not a number


    elapsedTime = (endTime - startTime).toFixed(1);
    playSound(Sound.Game.LevelUp);
    await delay(2);
    if (bestTime < elapsedTime) {
      bestTime = elapsedTime;
    } else {

    }
		// bestTime = elapsedTime;
		await delay(2);	await speakDelay(BEST_TIME_MESSAGE + bestTime + SECONDS);
		await delay(2);

			await speakDelay(TOOK_TO_SOLVE_MESSAGE + elapsedTime + SECONDS);

		await delay(2);
		  await speakDelay(WINNING_MESSAGE + number, false);
		await resetRandomNumber();
		await speakDelay('elapased time:' + elapsedTime + SECONDS);



      }
}

async function resetRandomNumber() {
		      await blink()
	    await speakDelay(RESETTING_MESSAGE);
		await delay(1);
	  await getRandomNumber();
	await delay(1);
      number = 0;
      //await delay(2);
      await setColorWaiting();
}

// color functions

async function setLed(red, green, blue) {
  setMainLed({ r: red, g: green, b: blue })
}

async function setColorWaiting() {
  //setMainLed({ r: 1, g: 1, b: 1 })
  setLed(1, 1, 1);	
}

async function setColorAlert() {
  //setMainLed({ r:0, g: 0, b: 121})
  setLed(0, 0, 121);		
}
async function setColorCountBy1() {
  //setMainLed({ r: 0, g: 6, b: 0 });
  setLed(0, 6, 0);		
}

async function setColorCountBy10() {
  //setMainLed({ r: 0, g: 30, b: 0 });
  setLed(0, 30, 0);	
}

async function setColorStart() {
  // setMainLed({ r: 122, g: 122, b: 15 });
  setLed(122, 122, 15);		
}


// start of main program - - - - - - - - - - - -


async function startProgram() {
	startTime = new Date().getTime() / 1000 ;
	await delay(3);
	endTime = new Date().getTime() / 1000 ;
	// this returns a string not a number
	elapsedTime = (endTime - startTime).toFixed(2);
	speak (' elapased time: '  + elapsedTime);
	await delay(2);
	await delay(2);
	await getRandomNumber();
	await delay(2);

  	playSound(Sound.Effects.Rewind);
  	await blink();
  	setBackLed(191);

  	await setColorWaiting();

  	await spin(460, 1.5);
	await setLed(255, 255, 255);
	

  // shut off stabilization so the ball can be tilted
  setStabilization(false);
  setBackLed(6);

  // MUST use await, to let function complete with delay

  /*
	await speakDelay('This is  a test.') ;
await delay(2)
	speak(' after function ');
	 await delay(2)

	//speak('ready top');
	*/

  if (VOICE_HELP) {
    await speakDelay(START_MESSAGE, true);
  }

	// seems to need a few delays(), especially when Sphero runs the first time
  await delay(1);
  playSound(Sound.Game.Coin);
  await delay(1);
  await speakDelay(READY_MESSAGE, true);
  await setColorStart();

  await setColorWaiting();
	  await delay(1);

 await setColorWaiting();
// await speakDelay('Ready!', false);

  // main loop of program
  while (true) {
    var pitch = getOrientation().pitch;
    var roll = getOrientation().roll;
    var yaw = getOrientation().yaw;
    // speak('pitch is:' + pitch);
    // await delay(2);


    if ((roll <= -ORIENTATION_2)) {
      // await blink();

	await setColorAlert();
	// await clickCount();
      // speak('you selected: ' + number);
	await speakDelay('Your number is currently: ' + number);
      // await delay(2);
     await setColorWaiting();
    }

    if ((roll >= ORIENTATION_2)) {
		await resetRandomNumber();
    }

    // count by 1

    if ((pitch > ORIENTATION_1) && (pitch < ORIENTATION_2)) {
    	number = (number + 1);
		await clickCount();
		setColorCountBy1();
		await speakDelay('' + number, false);

		await checkWinningNumber();
		await setColorWaiting();
    }


    // count by -1

	if ((pitch < -ORIENTATION_1) && (pitch > -ORIENTATION_2)) {
      number = (number - 1);

		// await clickCount();

      setColorCountBy1();
		  await speakDelay('' + number, false);

await checkWinningNumber();

      await setColorWaiting();
    }



    if (pitch >= ORIENTATION_3) {


      await clickCount();
      setColorCountBy10();
      number = (number + 10);




      //speak('' + number);
      await speakDelay('' + number, false);
      await setColorWaiting();
    }

    if (pitch <= -ORIENTATION_3) {

      number = (number - 10);
      setColorCountBy10();
      speak('' + number);
      await delay(1);
      await setColorWaiting();
    }



    await delay(YIELD_DELAY);
  }
}
