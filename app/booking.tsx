
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookingScreen() {
  const params = useLocalSearchParams();
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [selectedSeat, setSelectedSeat] = useState('');
  const [addBaggage, setAddBaggage] = useState(false);
  const [totalPrice, setTotalPrice] = useState(299);

  useEffect(() => {
    console.log('Booking params:', params);
    // Calculate total price based on selections
    let price = 299; // Base flight price
    if (addBaggage) price += 25;
    if (selectedSeat) price += 15;
    setTotalPrice(price);
  }, [addBaggage, selectedSeat]);

  const handleBooking = () => {
    console.log('Processing booking:', { passengerInfo, selectedSeat, addBaggage, totalPrice });
    
    if (!passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email) {
      Alert.alert('Missing Information', 'Please fill in all required passenger information');
      return;
    }

    // Simulate booking process
    Alert.alert(
      'Booking Confirmed!',
      `Your flight has been booked successfully. Total: $${totalPrice}`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/booking-confirmation'),
        },
      ]
    );
  };

  const updatePassengerInfo = (field: keyof PassengerInfo, value: string) => {
    setPassengerInfo(prev => ({ ...prev, [field]: value }));
  };

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
            <Text style={commonStyles.title}>Complete Booking</Text>
            <Text style={commonStyles.textSecondary}>
              {params.fromCity} → {params.toCity}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Flight Summary */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Icon name="airplane" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Flight Summary
              </Text>
            </View>
            
            <Text style={[commonStyles.text, { marginBottom: 4 }]}>
              SkyLine Airways - SL 1234
            </Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
              {params.departureDate} • 08:30 - 11:45 • Direct
            </Text>
            <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', color: colors.primary }]}>
              Base Price: $299
            </Text>
          </View>

          {/* Passenger Information */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="person" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Passenger Information
              </Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                  First Name *
                </Text>
                <TextInput
                  style={[commonStyles.input, { marginBottom: 0 }]}
                  placeholder="Enter first name"
                  placeholderTextColor={colors.textSecondary}
                  value={passengerInfo.firstName}
                  onChangeText={(value) => updatePassengerInfo('firstName', value)}
                />
              </View>
              
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                  Last Name *
                </Text>
                <TextInput
                  style={[commonStyles.input, { marginBottom: 0 }]}
                  placeholder="Enter last name"
                  placeholderTextColor={colors.textSecondary}
                  value={passengerInfo.lastName}
                  onChangeText={(value) => updatePassengerInfo('lastName', value)}
                />
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                Email Address *
              </Text>
              <TextInput
                style={[commonStyles.input, { marginBottom: 0 }]}
                placeholder="Enter email address"
                placeholderTextColor={colors.textSecondary}
                value={passengerInfo.email}
                onChangeText={(value) => updatePassengerInfo('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text style={[commonStyles.textSecondary, { marginBottom: 8, fontSize: 14, fontWeight: '500' }]}>
                Phone Number
              </Text>
              <TextInput
                style={[commonStyles.input, { marginBottom: 0 }]}
                placeholder="Enter phone number"
                placeholderTextColor={colors.textSecondary}
                value={passengerInfo.phone}
                onChangeText={(value) => updatePassengerInfo('phone', value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Seat Selection */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="car-seat" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Seat Selection
              </Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <TouchableOpacity
                style={[
                  buttonStyles.outline,
                  { flex: 1, marginRight: 8, paddingVertical: 12 },
                  selectedSeat === 'economy' && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setSelectedSeat('economy')}
              >
                <Text style={[
                  { color: colors.primary, fontSize: 14, fontWeight: '600', textAlign: 'center' },
                  selectedSeat === 'economy' && { color: 'white' }
                ]}>
                  Economy
                </Text>
                <Text style={[
                  { color: colors.textSecondary, fontSize: 12, textAlign: 'center' },
                  selectedSeat === 'economy' && { color: 'white' }
                ]}>
                  Included
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  buttonStyles.outline,
                  { flex: 1, marginLeft: 8, paddingVertical: 12 },
                  selectedSeat === 'premium' && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setSelectedSeat('premium')}
              >
                <Text style={[
                  { color: colors.primary, fontSize: 14, fontWeight: '600', textAlign: 'center' },
                  selectedSeat === 'premium' && { color: 'white' }
                ]}>
                  Premium
                </Text>
                <Text style={[
                  { color: colors.textSecondary, fontSize: 12, textAlign: 'center' },
                  selectedSeat === 'premium' && { color: 'white' }
                ]}>
                  +$15
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add-ons */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="bag" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Add-ons
              </Text>
            </View>

            <TouchableOpacity
              style={[commonStyles.row, { alignItems: 'center' }]}
              onPress={() => setAddBaggage(!addBaggage)}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: addBaggage ? colors.primary : colors.border,
                backgroundColor: addBaggage ? colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                {addBaggage && <Icon name="checkmark" size={14} color="white" />}
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                  Checked Baggage (23kg)
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Add checked baggage to your booking
                </Text>
              </View>
              
              <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                +$25
              </Text>
            </TouchableOpacity>
          </View>

          {/* Price Summary */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="receipt" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Price Summary
              </Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.text}>Base Flight Price</Text>
              <Text style={commonStyles.text}>$299</Text>
            </View>
            
            {selectedSeat === 'premium' && (
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textSecondary}>Premium Seat</Text>
                <Text style={commonStyles.textSecondary}>+$15</Text>
              </View>
            )}
            
            {addBaggage && (
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textSecondary}>Checked Baggage</Text>
                <Text style={commonStyles.textSecondary}>+$25</Text>
              </View>
            )}
            
            <View style={{
              height: 1,
              backgroundColor: colors.border,
              marginVertical: 12,
            }} />
            
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700' }]}>
                Total
              </Text>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
                ${totalPrice}
              </Text>
            </View>
          </View>

          {/* Book Button */}
          <Button
            text="Complete Booking"
            onPress={handleBooking}
            style={[buttonStyles.primary, { marginBottom: 40 }]}
            textStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
