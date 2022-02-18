import { updateUserStatistics, getUserStatistics } from "../../api/statistics";
import { getDate } from "./get-date";
import { reloadPageStatistics } from "../../components/react/reload";

export const checkDate = () => {
 // reloadPageStatistics();
  if(!localStorage.getItem('token')) {

     if(localStorage.getItem('startDate')) {
        return localStorage.getItem('startDate');
     } else {
        let date =  getDate()
        localStorage.setItem('startDate', date);
     }

  } else if(localStorage.getItem('token')) {

    if(localStorage.getItem('startDate')) {

    const getStata = async () => {

    let data = await getUserStatistics(localStorage.getItem('userId'));

    let state = {
        userId: localStorage.getItem('userId'),
        statistics: {
          "optional": {
            startDate: localStorage.getItem('startDate') ,
            percentAnswerRightSprint: data?.optional.percentAnswerRightSprint
            || JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0,
            longestAnswerRightSprint: data?.optional.longestAnswerRightSprint
            || +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0,
            percentRightAudioCall: data?.optional.percentRightAudioCall
            || JSON.parse(localStorage.getItem('audioCallStatistics'))?.percentAnswerRightAudioCall || 0,
            LongestAnswerRightAudioCall:  data?.optional.LongestAnswerRightAudioCall
            || +JSON.parse(localStorage.getItem('audioCallStatistics'))?.longestAnswerRightAudioCall || 0,
            percentAnswerForDay: data?.optional.percentAnswerForDay || localStorage.percentAnswerForDay || 0
        }
      }
    };

    updateUserStatistics(state);
    }
    getStata();
    }

    return getUserStatistics(localStorage.getItem('userId'));

   } else {
      let date = getDate()
      localStorage.setItem('startDate', date);

    return getUserStatistics(localStorage.getItem('userId'));
  }
}
