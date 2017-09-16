async function startProgram() {
        // Write code here

        speak('throw the ball in the air to hear that scrambled word, collide with the ball to hear the solution');
        await delay(8);
        var word = "JAMES";
        var hint = 'A first name for a man';
        var ans = word;
        var wordLength = word.length;
        var scrambled = "";

        for (var i = 0; i < wordLength; i++) {
                var charIndex = Math.floor(Math.random() * word.length);
                scrambled += word.charAt(charIndex) + ' , ';
                word = word.substr(0, charIndex) + word.substr(charIndex + 1);
        }
        speak('The scrambled word is:' + scrambled);
        await delay(wordLength);
        speak('The answer is:' + ans);
        await delay(wordLength);



        //varFirstLetter =
        speak('Here is a hint, The word starts with the letter: ' + ans.substring(0, 1) + hint)
        // Put the other hand here
}
