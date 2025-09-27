
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';
import FlightCard from '../components/FlightCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFlightSearch } from '../hooks/useFlightSearch';
import { Flight } from '../types/flight';
import { getTravelInsights } from '../services/flightService';

export default function SearchResultsScreen() {
  const params = useLocalSearchParams();
  const { flights, loading, error, search, sortFlights } = useFlightSearch();
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'aiScore'>('aiScore');
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    console.log('Search params:', params);
    
    // Convert params to SearchParams format
    const searchParams = {
      fromCity: params.fromCity as string,
      toCity: params.toCity as string,
      departureDate: params.departureDate as string,
      returnDate: params.returnDate as string,
      passengers: parseInt(params.passengers as string) || 1,
      tripType: (params.tripType as 'oneWay' | 'roundTrip') || 'roundTrip',
    };
    
    search(searchParams);
    
    // Get AI travel insights
    const route = `${params.fromCity} to ${params.toCity}`;
    setInsights(getTravelInsights(route));
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      sortFlights(sortBy);
    }
  }, [sortBy]);

  const handleSortChange = (newSortBy: 'price' | 'duration' | 'aiScore') => {
    setSortBy(newSortBy);
  };

  const handleFlightSelect = (flight: Flight) => {
    console.log('Selected flight:', flight);
    router.push({
      pathname: '/booking',
      params: {
        flightId: flight.id,
        ...params,
      },
    });
  };



  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <LoadingSpinner 
          message="AI is finding the best flights for you..."
          subMessage="Analyzing prices, schedules, and preferences"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[commonStyles.container, commonStyles.centerContent]}>
        <Icon name="alert-circle" size={48} color={colors.error} />
        <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
          {error}
        </Text>
        <Button
          text="Try Again"
          onPress={() => search({
            fromCity: params.fromCity as string,
            toCity: params.toCity as string,
            departureDate: params.departureDate as string,
            returnDate: params.returnDate as string,
            passengers: parseInt(params.passengers as string) || 1,
            tripType: (params.tripType as 'oneWay' | 'roundTrip') || 'roundTrip',
          })}
          style={[buttonStyles.primary, { marginTop: 16 }]}
          textStyle={{ color: 'white' }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.row, { paddingTop: 20, marginBottom: 24 }]}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.backgroundAlt,
              padding: 12,
              borderRadius: 12,
              marginRight: 16,
            }}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>Flight Results</Text>
            <Text style={commonStyles.textSecondary}>
              {params.fromCity} → {params.toCity}
            </Text>
          </View>
        </View>

        {/* Sort Options */}
        <View style={[commonStyles.row, { marginBottom: 20 }]}>
          <TouchableOpacity
            style={[
              buttonStyles.outline,
              { flex: 1, marginRight: 4, paddingVertical: 8 },
              sortBy === 'aiScore' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSortChange('aiScore')}
          >
            <Text style={[
              { color: colors.primary, fontSize: 12, fontWeight: '600' },
              sortBy === 'aiScore' && { color: 'white' }
            ]}>
              AI Score
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              buttonStyles.outline,
              { flex: 1, marginHorizontal: 4, paddingVertical: 8 },
              sortBy === 'price' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSortChange('price')}
          >
            <Text style={[
              { color: colors.primary, fontSize: 12, fontWeight: '600' },
              sortBy === 'price' && { color: 'white' }
            ]}>
              Price
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              buttonStyles.outline,
              { flex: 1, marginLeft: 4, paddingVertical: 8 },
              sortBy === 'duration' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSortChange('duration')}
          >
            <Text style={[
              { color: colors.primary, fontSize: 12, fontWeight: '600' },
              sortBy === 'duration' && { color: 'white' }
            ]}>
              Duration
            </Text>
          </TouchableOpacity>
        </View>

        {/* AI Insights */}
        {insights.length > 0 && (
          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Icon name="bulb" size={16} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600', fontSize: 14 }]}>
                AI Travel Insights
              </Text>
            </View>
            {insights.map((insight, index) => (
              <Text key={index} style={[commonStyles.textSecondary, { fontSize: 12, marginBottom: 4 }]}>
                • {insight}
              </Text>
            ))}
          </View>
        )}

        {/* Flight Results */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {flights.length === 0 ? (
            <View style={[commonStyles.centerContent, { paddingVertical: 40 }]}>
              <Icon name="airplane" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No flights found
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
                Try adjusting your search criteria
              </Text>
            </View>
          ) : (
            flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={handleFlightSelect}
              />
            ))
          )}
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
