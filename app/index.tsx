import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';
import AIAssistant from '../components/AIAssistant';
import DateInput from '../components/DateInput';

export default function FlightSearchScreen() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');

  const handleSearch = () => {
    console.log('Searching flights:', { fromCity, toCity, departureDate, returnDate, passengers, tripType });
    
    if (!fromCity || !toCity || !departureDate) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (tripType === 'roundTrip' && !returnDate) {
      Alert.alert('Missing Information', 'Please select a return date');
      return;
    }

    // Navigate to search results
    router.push({
      pathname: '/search-results',
      params: {
        fromCity,
        toCity,
        departureDate,
        returnDate: tripType === 'roundTrip' ? returnDate : '',
        passengers,
        tripType,
      },
    });
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingTop: 20, marginBottom: 32 }}>
          <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 8 }]}>
            <Icon name="airplane" size={28} color={colors.primary} />
            <Text style={[commonStyles.title, { marginLeft: 12, marginBottom: 0 }]}>
              FlightAI
            </Text>
          </View>
          <Text style={[commonStyles.textSecondary, { fontSize: 16 }]}>
            AI-powered flight search for the best deals
          </Text>
        </View>

        {/* Trip Type Selector */}
        <View style={[commonStyles.section, { marginBottom: 24 }]}>
          <View style={[commonStyles.row, { marginBottom: 20 }]}>
            <TouchableOpacity
              style={[
                buttonStyles.outline,
                { flex: 1, marginRight: 8 },
                tripType === 'roundTrip' && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => setTripType('roundTrip')}
            >
              <Text style={[
                { color: colors.primary, fontSize: 14, fontWeight: '600' },
                tripType === 'roundTrip' && { color: 'white' }
              ]}>
                Round Trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                buttonStyles.outline,
                { flex: 1, marginLeft: 8 },
                tripType === 'oneWay' && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => setTripType('oneWay')}
            >
              <Text style={[
                { color: colors.primary, fontSize: 14, fontWeight: '600' },
                tripType === 'oneWay' && { color: 'white' }
              ]}>
                One Way
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Flight Search Form */}
        <View style={commonStyles.card}>
          {/* From and To Cities */}
          <View style={{ marginBottom: 20 }}>
            <View style={[commonStyles.row, { alignItems: 'flex-end' }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                  From
                </Text>
                <TextInput
                  style={[commonStyles.input, { marginBottom: 0 }]}
                  placeholder="Departure city"
                  placeholderTextColor={colors.textSecondary}
                  value={fromCity}
                  onChangeText={setFromCity}
                />
              </View>
              
              <TouchableOpacity
                style={{
                  backgroundColor: colors.backgroundAlt,
                  padding: 12,
                  borderRadius: 12,
                  marginHorizontal: 12,
                  marginBottom: 1,
                }}
                onPress={swapCities}
              >
                <Icon name="swap-horizontal" size={20} color={colors.primary} />
              </TouchableOpacity>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                  To
                </Text>
                <TextInput
                  style={[commonStyles.input, { marginBottom: 0 }]}
                  placeholder="Destination city"
                  placeholderTextColor={colors.textSecondary}
                  value={toCity}
                  onChangeText={setToCity}
                />
              </View>
            </View>
          </View>

          {/* Dates */}
          <View style={[commonStyles.row, { marginBottom: 20 }]}>
            <View style={{ flex: 1, marginRight: tripType === 'roundTrip' ? 8 : 0 }}>
              <DateInput
                label="Departure"
                value={departureDate}
                onDateChange={setDepartureDate}
                placeholder="Select departure date"
                required
              />
            </View>
            
            {tripType === 'roundTrip' && (
              <View style={{ flex: 1, marginLeft: 8 }}>
                <DateInput
                  label="Return"
                  value={returnDate}
                  onDateChange={setReturnDate}
                  placeholder="Select return date"
                  required
                />
              </View>
            )}
          </View>

          {/* Passengers */}
          <View style={{ marginBottom: 24 }}>
            <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
              Passengers
            </Text>
            <TextInput
              style={[commonStyles.input, { marginBottom: 0 }]}
              placeholder="Number of passengers"
              placeholderTextColor={colors.textSecondary}
              value={passengers}
              onChangeText={setPassengers}
              keyboardType="numeric"
            />
          </View>

          {/* Search Button */}
          <Button
            text="Search Flights"
            onPress={handleSearch}
            style={buttonStyles.primary}
            textStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
          />
        </View>

        {/* AI Features */}
        <View style={[commonStyles.card, { marginTop: 24 }]}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Icon name="sparkles" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              AI-Powered Features
            </Text>
          </View>
          
          <View style={{ marginBottom: 12 }}>
            <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 4 }]}>
              • Smart price predictions
            </Text>
            <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 4 }]}>
              • Best time to book recommendations
            </Text>
            <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 4 }]}>
              • Alternative route suggestions
            </Text>
            <Text style={[commonStyles.text, { fontSize: 14 }]}>
              • Real-time price alerts
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      
      <AIAssistant />
    </SafeAreaView>
  );
}
