
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';

export default function BookingConfirmationScreen() {
  const bookingReference = 'FL' + Math.random().toString(36).substr(2, 6).toUpperCase();

  const handleNewSearch = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 40 }}>
          {/* Success Icon */}
          <View style={[commonStyles.centerContent, { marginBottom: 32 }]}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.success,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              <Icon name="checkmark" size={40} color="white" />
            </View>
            
            <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
              Booking Confirmed!
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 16 }]}>
              Your flight has been successfully booked
            </Text>
          </View>

          {/* Booking Details */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <Icon name="document-text" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                Booking Details
              </Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                Booking Reference
              </Text>
              <Text style={[commonStyles.text, { fontWeight: '700', color: colors.primary }]}>
                {bookingReference}
              </Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={commonStyles.text}>Flight</Text>
              <Text style={commonStyles.text}>SL 1234</Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={commonStyles.text}>Route</Text>
              <Text style={commonStyles.text}>JFK → LAX</Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={commonStyles.text}>Date</Text>
              <Text style={commonStyles.text}>Dec 25, 2024</Text>
            </View>

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={commonStyles.text}>Time</Text>
              <Text style={commonStyles.text}>08:30 - 11:45</Text>
            </View>

            <View style={{
              height: 1,
              backgroundColor: colors.border,
              marginVertical: 16,
            }} />

            <View style={[commonStyles.row]}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700' }]}>
                Total Paid
              </Text>
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.success }]}>
                $299
              </Text>
            </View>
          </View>

          {/* Next Steps */}
          <View style={[commonStyles.card, { marginBottom: 24 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="information-circle" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                What&apos;s Next?
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                ✈️ Check-in opens 24 hours before departure
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                📧 Confirmation email sent to your inbox
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                📱 Download boarding pass after check-in
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14 }]}>
                🆔 Bring valid ID to the airport
              </Text>
            </View>
          </View>

          {/* AI Recommendations */}
          <View style={[commonStyles.card, { marginBottom: 32 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Icon name="sparkles" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
                AI Travel Tips
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                🌤️ Weather forecast: Sunny, 75°F in Los Angeles
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                🚗 Book airport transfer now and save 15%
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14, marginBottom: 8 }]}>
                🏨 Hotel deals near LAX starting from $89/night
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14 }]}>
                ⏰ Arrive at airport 2 hours before departure
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ marginBottom: 40 }}>
            <Button
              text="Search New Flight"
              onPress={handleNewSearch}
              style={[buttonStyles.primary, { marginBottom: 16 }]}
              textStyle={{ color: 'white', fontSize: 16, fontWeight: '600' }}
            />
            
            <TouchableOpacity
              style={[buttonStyles.secondary]}
              onPress={() => console.log('View booking details')}
            >
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                View Booking Details
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
