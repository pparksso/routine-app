export type DayInfo = {
  rate: number | null;
  todo: any[] | null;
};

export interface IDateData extends DayInfo {
  date: number | null;
}
