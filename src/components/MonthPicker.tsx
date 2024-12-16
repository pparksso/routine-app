import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface MonthPickerProps {
  visible: boolean;
  selectedYear: number;
  selectedMonth: number;
  onClose: (year: number, month: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  visible,
  selectedYear,
  selectedMonth,
  onClose,
}) => {
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [currentMonth, setCurrentMonth] = useState(selectedMonth);

  const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleClose = () => {
    onClose(currentYear, currentMonth);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* 화면 밖 클릭 감지 */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            {/* MonthPicker 메인 영역 */}
            <View style={styles.container}>
              {/* 연도와 월 표시 */}
              <View style={styles.header}>
                <Text style={styles.headerText}>{currentYear}년</Text>
                <Text style={styles.headerText}>{currentMonth}월</Text>
              </View>
              <View style={styles.scrollContainer}>
                {/* 연도 스크롤 */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.yearScroll}>
                  {years.map(year => (
                    <Text
                      key={year}
                      style={[
                        styles.scrollItem,
                        year === currentYear && styles.selectedItem,
                      ]}
                      onPress={() => setCurrentYear(year)}>
                      {year}년
                    </Text>
                  ))}
                </ScrollView>

                {/* 월 스크롤 */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.monthScroll}>
                  {months.map(month => (
                    <Text
                      key={month}
                      style={[
                        styles.scrollItem,
                        month === currentMonth && styles.selectedItem,
                      ]}
                      onPress={() => setCurrentMonth(month)}>
                      {month}월
                    </Text>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearScroll: {
    width: '45%',
    maxHeight: 200,
  },
  monthScroll: {
    width: '45%',
    maxHeight: 200,
  },
  scrollItem: {
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  selectedItem: {
    color: '#2a9d8f',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MonthPicker;
