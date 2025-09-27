
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateInputProps {
  label: string;
  value: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function DateInput({ label, value, onDateChange, placeholder = 'Select date', required = false }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      onDateChange(formattedDate);
    }
  };

  const openDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
        {label} {required && '*'}
      </Text>
      
      <TouchableOpacity
        style={[
          commonStyles.input,
          { 
            marginBottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }
        ]}
        onPress={openDatePicker}
      >
        <Text style={[
          { fontSize: 16, color: value ? colors.text : colors.textSecondary }
        ]}>
          {value || placeholder}
        </Text>
        <Icon name="calendar" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}
