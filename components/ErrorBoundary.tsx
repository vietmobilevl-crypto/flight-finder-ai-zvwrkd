
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import Button from './Button';

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export default function ErrorBoundary({ 
  error = 'Something went wrong', 
  onRetry, 
  onGoHome 
}: ErrorBoundaryProps) {
  return (
    <View style={[commonStyles.container, commonStyles.centerContent, { padding: 20 }]}>
      <View style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.error,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <Icon name="alert-circle" size={40} color="white" />
      </View>
      
      <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
        Oops!
      </Text>
      
      <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 32 }]}>
        {error}
      </Text>

      <View style={{ width: '100%', maxWidth: 300 }}>
        {onRetry && (
          <Button
            text="Try Again"
            onPress={onRetry}
            style={[buttonStyles.primary, { marginBottom: 16 }]}
            textStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
          />
        )}
        
        {onGoHome && (
          <TouchableOpacity
            style={buttonStyles.secondary}
            onPress={onGoHome}
          >
            <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
              Go Home
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
