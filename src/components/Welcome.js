import React from 'react'
import welcomeGif from '../images/welcomegif.gif'

const Welcome = () => {

//     var rectangle;
//     var speechBubble;


// rectangle.hover(
    
//   function() {
//     speechBubble.css({
//       "animation-name": "expand-bounce",
//       "animation-duration": "0.25s"
//     });
//   },
//   function() {
//     speechBubble.css({
//       "animation-name": "shrink",
//       "animation-duration": "0.1s"
//     });
//   }
// );

    return (
        <div>
            <div class="grid place-items-center w-full h-full">
            <img src={welcomeGif} alt='welcome gif'/>

            <div id="SpeechBubble">I'm a rectangle</div>
            {/* <div class="dynamic-txts"> */}  
            {/* <span>Let's catch app!</span> */}
            {/* </div> */}
            </div>
        </div>
    )
}

export default Welcome
