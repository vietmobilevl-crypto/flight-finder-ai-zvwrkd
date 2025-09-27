
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { Flight } from '../types/flight';
import Icon from './Icon';
import Button from './Button';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const getAIScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity
      style={[commonStyles.card, { marginBottom: 16 }]}
      onPress={() => onSelect(flight)}
      activeOpacity={0.7}
    >
      {/* AI Score Badge */}
      <View style={[commonStyles.row, { marginBottom: 16 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
            {flight.airline}
          </Text>
          <Text style={commonStyles.textSecondary}>
            {flight.flightNumber}
          </Text>
        </View>
        
        <View style={{
          backgroundColor: getAIScoreColor(flight.aiScore),
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon name="sparkles" size={14} color="white" />
          <Text style={{
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
            marginLeft: 4,
          }}>
            AI {flight.aiScore}
          </Text>
        </View>
      </View>

      {/* Flight Details */}
      <View style={[commonStyles.row, { marginBottom: 16 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
            {flight.departure.time}
          </Text>
          <Text style={commonStyles.textSecondary}>
            {flight.departure.airport}
          </Text>
        </View>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            {flight.duration}
          </Text>
          <View style={{
            height: 1,
            backgroundColor: colors.border,
            width: '80%',
            marginVertical: 4,
          }} />
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Text>
        </View>
        
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600' }]}>
            {flight.arrival.time}
          </Text>
          <Text style={commonStyles.textSecondary}>
            {flight.arrival.airport}
          </Text>
        </View>
      </View>

      {/* Amenities */}
      {flight.amenities && flight.amenities.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {flight.amenities.slice(0, 3).map((amenity, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.backgroundAlt,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginRight: 8,
                  marginBottom: 4,
                }}
              >
                <Text style={[commonStyles.textSecondary, { fontSize: 11 }]}>
                  {amenity}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Price */}
      <View style={[commonStyles.row, { alignItems: 'center' }]}>
        <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
          ${flight.price}
        </Text>
        <View style={{ flex: 1 }} />
        <Button
          text="Select"
          onPress={() => onSelect(flight)}
          style={[buttonStyles.primary, { paddingHorizontal: 20, paddingVertical: 8 }]}
          textStyle={{ color: 'white', fontSize: 14, fontWeight: '600' }}
        />
      </View>
    </TouchableOpacity>
  );
}
