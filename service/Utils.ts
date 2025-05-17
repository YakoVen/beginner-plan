export function isEqual(obj1:any, obj2:any) {
  const props1:string[] = Object.getOwnPropertyNames(obj1);
  const props2:string[] = Object.getOwnPropertyNames(obj2);
  if (props1.length != props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i++) {
    const val1 = obj1[props1[i]];
    const val2 = obj2[props1[i]];
    const isObjects = isObject(val1) && isObject(val2);
    if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}
export async function getFileBody(url:string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer(); // Get raw binary data
  return arrayBuffer;
}

export async function urlToFile(url:string, filename:string ) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename);
}
export function isObject(object:any) {
  return object != null && typeof object === "object";
}
export const getDate = () => {
  const today = new Date();

  // Get the day of the month
  const dd = today.getDate();

  // Get the month (adding 1 because months are zero-based)
  const mm = today.getMonth() + 1;

  // Get the year
  const yyyy = today.getFullYear();

  let dd_string = dd+"";
  // Add leading zero if the day is less than 10
  if (dd < 10) {
    dd_string = "0" + dd;
  }
  let mm_string = mm+"";
  // Add leading zero if the month is less than 10
  if (mm < 10) {
    mm_string = "0" + mm;
  }
  const today_string = dd_string + "-" + mm_string + "-" + yyyy;
  return today_string;
};

export const validate = () => {
  const fields = document.querySelectorAll("[required]") ;
  for (const field of fields) {
    const inputField = field as HTMLInputElement; // ✅ TypeScript comprend maintenant

    if (!inputField.reportValidity()) {
      return false;
    }
  }
  return true;
};

export function Largest(array:any[]) {
  let largest = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i];
    }
  }
  return largest;
}

export function Timestamp2Date(unix_timestamp:number) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(unix_timestamp * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();

  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // Will display time in 10:30:23 format
  const formattedTime =
    day +
    "/" +
    month +
    "/" +
    year +
    "    " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
}

export function WithinLastMonth(timestamp:number) {
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const dateToCheck = new Date(timestamp * 1000);

  return dateToCheck >= oneMonthAgo && dateToCheck <= now;
}
export function WithinLastWeek(timestamp:number) {
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(now.getDate() - 7);

  const dateToCheck = new Date(timestamp * 1000);

  return dateToCheck >= oneMonthAgo && dateToCheck <= now;
}


