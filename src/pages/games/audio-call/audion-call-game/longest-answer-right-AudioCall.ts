let  longestAnswerRightAudioCall: number = 0;
localStorage.setItem('LongestAnswerRightAudioCall', longestAnswerRightAudioCall.toString());

export function countingLongestAnswerRightAudioCall() {
  longestAnswerRightAudioCall++;
      if (+(localStorage.getItem('LongestAnswerRightAudioCall')) < longestAnswerRightAudioCall ) {
        localStorage.setItem('LongestAnswerRightAudioCall', longestAnswerRightAudioCall.toString());
      }
}; 

export function resetLongestAnswerRightAudioCall () {
    return longestAnswerRightAudioCall = 0;
};