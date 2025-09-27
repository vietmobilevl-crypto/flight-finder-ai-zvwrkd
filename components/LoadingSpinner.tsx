
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingSpinner({ message = 'Loading...', subMessage }: LoadingSpinnerProps) {
  return (
    <View style={[commonStyles.centerContent, { flex: 1 }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center', fontSize: 18, fontWeight: '600' }]}>
        {message}
      </Text>
      {subMessage && (
        <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
          {subMessage}
        </Text>
      )}
    </View>
  );
}
