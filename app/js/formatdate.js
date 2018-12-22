const formatDate = (rawDate) => {
  if (!rawDate) { return '' }
  const _date = new Date(parseInt(rawDate));
  var mon = _date.getMonth()+1;
  var day = _date.getDate();
  var hour = _date.getHours();
  var min = _date.getMinutes();
  var dateString = _date.getFullYear()+"-"
                  +(mon<10? "0"+mon:mon)+"-"
                  +(day<10?"0"+day:day)+" "
                  +(hour<10?"0"+hour:hour)+":"
                  +(min<10? "0"+min:min);
  return dateString;
};

export { formatDate }
