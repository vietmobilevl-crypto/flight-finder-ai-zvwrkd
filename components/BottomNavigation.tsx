
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { router, usePathname } from 'expo-router';
import Icon from './Icon';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Search', icon: 'search', route: '/' },
    { name: 'My Trips', icon: 'airplane', route: '/my-trips' },
    { name: 'Deals', icon: 'pricetag', route: '/deals' },
    { name: 'Profile', icon: 'person', route: '/profile' },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingVertical: 8,
      paddingHorizontal: 16,
      boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
      elevation: 8,
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        
        return (
          <TouchableOpacity
            key={item.name}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
            }}
            onPress={() => {
              if (item.route !== pathname) {
                console.log(`Navigating to ${item.name}`);
                // Only navigate to home for now, others are placeholders
                if (item.route === '/') {
                  router.push('/');
                }
              }
            }}
            activeOpacity={0.7}
          >
            <Icon 
              name={item.icon as any} 
              size={24} 
              color={isActive ? colors.primary : colors.textSecondary} 
            />
            <Text style={{
              fontSize: 12,
              fontWeight: '500',
              color: isActive ? colors.primary : colors.textSecondary,
              marginTop: 4,
            }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
