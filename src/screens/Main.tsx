import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { container } from '@/styles/global';
import { returnDateArr } from '@/composables/date';
import { weekly } from '@/constants/calendar';
import { IDateData } from '@/types/date';
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
      <Text style={styles.dateTxt}>{`${year}년 ${month}월 ${date}일`}</Text>
      <View style={styles.line}></View>
      <View>
        {weekly.map(w => (
          <Text key={w}>{w}</Text>
        ))}
      </View>
      <View>
        {dateArr &&
          dateArr.map((week, i) => {
            return (
              <View key={'w' + i}>
                {week.map((d, dIdx) => {
                  return <Text key={dIdx}>{d.date}</Text>;
                })}
              </View>
            );
          })}
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
  dateTxt: {
    fontSize: 22,
    fontWeight: 600,
    paddingLeft: 3,
  },
  line: {
    height: 2,
    backgroundColor: '#f3f3f3',
    marginTop: 17,
  },
});
