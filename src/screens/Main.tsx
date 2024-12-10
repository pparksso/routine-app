import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { container } from '@/styles/global';
import { returnDateArr } from '@/composables/date';
import { weekly } from '@/constants/calendar';
import { IDateData } from '@/types/date';

const Main: React.FC = () => {
  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();
  const nowDate = today.getDate();
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
    <View style={container.default}>
      <Text>2024년 12월 01일</Text>
      <View></View>
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
    </View>
  );
};

export default Main;

// const styles = StyleSheet.create({

// });
