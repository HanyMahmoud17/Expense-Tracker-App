// export function getFormatedDate(date) {
//     // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
//     return date.toISOString().slice(0, 10);
//     // return date.toISOString();

// //     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
// //   return date.toLocaleDateString(undefined, options);
// }


export function getFormatedDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      // Handle the case where date is not a valid Date object
      return 'Invalid Date';
    }
  
    return date.toISOString().slice(0, 10);
  }
  
export function getDateMinusDays(date,days) {
    return new Date(date.getFullYear(),date.getMonth(),date.getDate() - days)
}