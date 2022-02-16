import {arrTrueWordsID, arrFalseWordsID} from "./audio-call";

export function countingPercentAnswerRightAudioCall() {

    let arrTrueAnswerCopy = arrTrueWordsID.slice();
    let arrTrueAnswerCopyLength = arrTrueAnswerCopy.length;

    let arrFalseAnswerCopy = arrFalseWordsID.slice();
    let arrFalseAnswerCopyLength = arrFalseAnswerCopy.length;

    let percentRightAudioCall = 0;
    percentRightAudioCall = Math.floor((arrTrueAnswerCopyLength * 100) / (arrTrueAnswerCopyLength + arrFalseAnswerCopyLength));
    localStorage.setItem('percentRightAudioCall', percentRightAudioCall.toString());
}