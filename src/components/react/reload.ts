
export  let reloadPageStatistics = () => {

  document.querySelector('.nav-part').addEventListener('click', (event) => {

    const target = event.target as HTMLElement;

    if(target.getAttribute('href') == "#/statistics") {

      window.location.hash = "#/statistics";
      window.location.reload();

    }
  })
}

export let reloadPageStatisticsTextbook = () => {

  document.querySelector('.nav-part').addEventListener('click', (event) => {

    // const target = event.target as HTMLElement;

    // if(target.getAttribute('href') == "#/textbook") {

    //   window.location.hash = "#/";
    //   // window.location.reload();

    // }

    return ;
  })
}

