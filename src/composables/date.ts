import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayInfo, IDateData } from '@/types/date';

const getStartAndLastDay = (year: number, month: number) => {
  const monthIdx = month - 1;
  const thisMonthStart = new Date(year, monthIdx, 1);
  const thisMonthLast = new Date(year, monthIdx + 1, 0);
  return {
    start: (thisMonthStart.getDay() + 6) % 7,
    last: (thisMonthLast.getDay() + 6) % 7,
  };
};

export const makeCalendar = (year: number, month: number) => {
  const monthIdx = month - 1;
  const thisMonthLast = new Date(year, monthIdx + 1, 0);

  const thisLastDate = thisMonthLast.getDate();

  const thisMonthObj: { [key: number]: { rate: null | number; todo: any[] } } =
    {};

  for (let day = 1; day <= thisLastDate; day++) {
    thisMonthObj[day] = {
      rate: null,
      todo: [],
    };
  }

  AsyncStorage.setItem(`${year}-${month}`, JSON.stringify(thisMonthObj));
};

export const makeRateVal = (rate: number) => {
  const angle = rate * 3.6;
  if (rate) {
    return {
      background: `conic-gradient(#000000 0deg ${angle}deg, #d9d9d9 ${angle}deg 360deg)`,
    };
  } else {
    return {
      background: '#d9d9d9',
    };
  }
};

export const returnDateArr = async (
  year: number,
  month: number,
): Promise<
  { date: number | null; todo: any[] | null; rate: number | null }[][]
> => {
  try {
    const calendarKey = `${year}-${month}`;
    const localData = await AsyncStorage.getItem(calendarKey);
    let thisMonthData: DayInfo[] | null = null;
    if (localData === null) {
      makeCalendar(year, month);
      thisMonthData = JSON.parse(
        (await AsyncStorage.getItem(calendarKey)) as string,
      );
    } else {
      thisMonthData = JSON.parse(localData as string);
    }
    const { start, last } = getStartAndLastDay(year, month);
    const thisMonthDataLength = thisMonthData
      ? Object.keys(thisMonthData).length
      : 0;

    if (thisMonthDataLength < 1) {
      throw new Error('에러로 이동');
    }

    const createEmptyDays = (count: number) => {
      return Array.from({ length: count }, () => ({
        date: null,
        rate: null,
        todo: [],
      }));
    };

    const days: IDateData[] = [
      ...createEmptyDays(start),
      ...(thisMonthData
        ? Array.from({ length: thisMonthDataLength }, (_, idx) => ({
            date: idx + 1,
            ...thisMonthData[idx + 1],
          }))
        : []),
      ...createEmptyDays(6 - last),
    ];

    const result: IDateData[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
