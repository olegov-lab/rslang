let  longestAnswerRightAudioCall: number = 0;
localStorage.setItem('LongestAnswerRightAudioCall', longestAnswerRightAudioCall.toString());

export function isLongestAnswerRightAudioCall() {
  longestAnswerRightAudioCall++;
      if (+(localStorage.getItem('LongestAnswerRightAudioCall')) < longestAnswerRightAudioCall ) {
        localStorage.setItem('LongestAnswerRightAudioCall', longestAnswerRightAudioCall.toString());
      }
}; 

export function resetLongestAnswerRightAudioCall () {
    return longestAnswerRightAudioCall = 0;
};