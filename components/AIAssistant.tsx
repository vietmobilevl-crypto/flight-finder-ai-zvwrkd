
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface AIAssistantProps {
  insights?: string[];
  onClose?: () => void;
}

export default function AIAssistant({ insights = [], onClose }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const defaultInsights = [
    'Best deals are typically found 6-8 weeks before departure',
    'Tuesday and Wednesday flights are usually cheaper',
    'Morning flights have fewer delays',
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <View style={{
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1000,
    }}>
      {/* AI Assistant Button */}
      <TouchableOpacity
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.3)',
          elevation: 6,
        }}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <Icon 
          name={isExpanded ? "close" : "sparkles"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>

      {/* AI Insights Panel */}
      {isExpanded && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            width: 280,
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 16,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
            elevation: 8,
            borderWidth: 1,
            borderColor: colors.border,
            height: animatedHeight,
            overflow: 'hidden',
          }}
        >
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <Icon name="sparkles" size={20} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600', fontSize: 16 }]}>
              AI Assistant
            </Text>
          </View>

          <Text style={[commonStyles.textSecondary, { fontSize: 14, marginBottom: 12 }]}>
            Here are some insights to help you find the best flight:
          </Text>

          {displayInsights.slice(0, 3).map((insight, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text style={[commonStyles.textSecondary, { fontSize: 12, marginRight: 8 }]}>
                •
              </Text>
              <Text style={[commonStyles.textSecondary, { fontSize: 12, flex: 1 }]}>
                {insight}
              </Text>
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}
