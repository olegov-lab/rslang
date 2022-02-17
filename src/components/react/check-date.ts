import { updateUserStatistics, getUserStatistics } from "../../api/statistics";
import { getDate } from "./get-date";

export function checkDate() {

  if(!localStorage.getItem('token')) {

     if(localStorage.getItem('startDate')) {
        return localStorage.getItem('startDate');
     } else {
        let date =  getDate()
        localStorage.setItem('startDate', date);
     }

  } else if(localStorage.getItem('token')) {

    if(localStorage.getItem('startDate')) {

    //   let state = {
    //     userId: localStorage.getItem('userId'),
    //     statistics: {
    //       "optional": {
    //         startDate: localStorage.getItem('startDate') ,
    //         percentAnswerRightSprint: JSON.parse(localStorage.getItem('SprintStatistics'))?.percentAnswerRightSpring || 0,
    //         longestAnswerRightSprint: +JSON.parse(localStorage.getItem('SprintStatistics'))?.longestAnswerRightSprint || 0,
    //         percentRightAudioCall: +localStorage.getItem('percentRightAudioCall') || 0,
    //         LongestAnswerRightAudioCall: localStorage.getItem('LongestAnswerRightAudioCall') || 0,
    //         percentAnswerForDay: localStorage.percentAnswerForDay
    //     }
    //   }
    // };

      //updateUserStatistics(state);
    }

    return getUserStatistics(localStorage.getItem('userId'));

   } else {
      let date = getDate()
      localStorage.setItem('startDate', date);

    return getUserStatistics(localStorage.getItem('userId'));
  }
}
