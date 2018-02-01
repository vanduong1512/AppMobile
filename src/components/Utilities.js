export const convertStringToDate = ((strDate) => {
    let dateSplited = strDate.split('/');

    return (new Date(parseInt(dateSplited[2]), parseInt(dateSplited[1]) - 1, parseInt(dateSplited[0])));
})

export const convertDateToString = ((dateTime) => {
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let date = dateTime.getDate();

    return(date.toString() + '/' + month.toString() + '/' + year.toString());
})

export const makeID = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }