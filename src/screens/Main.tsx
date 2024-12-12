import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { container } from '@/styles/global';
import { returnDateArr } from '@/composables/date';
import { weekly } from '@/constants/calendar';
import { IDateData } from '@/types/date';
import RateGradient from '@comp/RateGradient';
import Nav from '@comp/Nav';

const Main: React.FC = () => {
  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();
  const nowDate = Number(today.getDate().toString().padStart(2, '0'));
  const nowDay = today.getDay();

  const [dateArr, setDateArr] = useState<IDateData[][] | null>(null);
  const [year, setYear] = useState<number>(nowYear);
  const [month, setMonth] = useState<number>(nowMonth + 1);
  const [date, setDate] = useState<number>(nowDate);
  const [day, setDay] = useState<string>(weekly[(nowDay + 6) % 7]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await returnDateArr(year, month);
        console.log(result);
        if (result && JSON.stringify(result) !== JSON.stringify(dateArr)) {
          setDateArr(result);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [month, year, dateArr]);

  return (
    <View style={[container.default, styles.mainContainer]}>
      <Text style={styles.todayTxt}>{`${year}년 ${month}월 ${date}일`}</Text>
      <View style={styles.line}></View>
      <View style={styles.calendarContainer}>
        <View style={styles.weeklyBox}>
          {weekly.map(w => (
            <Text
              style={[styles.weeklyTxt, w === '일' && styles.sundayColor]}
              key={w}>
              {w}
            </Text>
          ))}
        </View>
        <View>
          {dateArr &&
            dateArr.map((week, i) => {
              return (
                <View style={styles.weekBox} key={'w' + i}>
                  {week.map((d, dIdx) => {
                    return (
                      <View style={styles.dateBox} key={dIdx}>
                        <Text
                          style={[
                            dIdx === 6 && styles.sundayColor,
                            styles.dateTxt,
                          ]}>
                          {d.date}
                        </Text>
                        <View style={styles.rateBox}>
                          {d.date && (
                            <>
                              <RateGradient rate={d.rate ? d.rate : 0} />
                              <Text>{d.rate ? d.rate : ' '}</Text>
                            </>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </View>
      </View>
      <Nav />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
  },
  todayTxt: {
    fontSize: 22,
    fontWeight: 600,
    paddingLeft: 3,
  },
  line: {
    height: 2,
    backgroundColor: '#f3f3f3',
    marginTop: 17,
  },
  calendarContainer: {
    paddingHorizontal: 25,
    paddingTop: 17,
  },
  weeklyBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 13,
  },
  weeklyTxt: {
    fontSize: 14,
    fontWeight: 300,
  },
  weekBox: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  dateBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateTxt: {
    marginBottom: 15,
  },
  rateBox: {
    width: 30,
    height: 30,
  },
  sundayColor: {
    color: '#A80D0D',
  },
});
