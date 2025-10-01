import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import FooterNav from '../components/FooterNav';

const GhanaCardLinkedScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleViewAccountDetails = () => {
    // Navigate to profile or account details screen
    navigation.navigate('Profile' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ghana Card Linked</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Ghana Card Image */}
        <View style={styles.cardContainer}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbGH85ksyqVTQ1e21qPWZbSeCijxy950Z4TNACjU54PWqrY1JMA9su5eV5niP2mUCjfhc_cXmB1qwe0N9QiIoTm8Mz2Q4A3rFKVDga1Wk_QHXqF715yXGTuVjytkFNGgtEPg7e-Bhudy2ZsIA541rc_DIX86SUikWIzfvWUEiwRHrRZWLANa2KzS7v-DRI5TK6nR5FBR73_nrcCPQT1U8iiuM-Wlq198mBQB-rzYYHUCl415V9r08TQcJv5d2WJO9DMpTgswnbhg8'
            }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Ghana Card Linked</Text>
        <Text style={styles.description}>
          Your Ghana Card has been successfully linked to your NHIS account. You can now access all services using your Ghana Card.
        </Text>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleViewAccountDetails}
        >
          <Text style={styles.actionButtonText}>View Account Details</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#141414',
    flex: 1,
    textAlign: 'center',
    marginRight: 48, // Balance the back button
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 2/3,
    maxWidth: 300,
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  description: {
    fontSize: 16,
    color: '#141414',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: '#808080',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GhanaCardLinkedScreen;