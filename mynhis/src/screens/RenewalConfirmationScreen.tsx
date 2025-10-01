import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import { MaterialIcons } from '@expo/vector-icons';
import FooterNav from "../components/FooterNav";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RenewalConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleViewMembershipDetails = () => {
    navigation.navigate("Membership");
  };

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#141414" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Renewal Confirmation</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Success Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ 
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuACm2unJqBfQxWNZH1X_TWBoG8DLWg0G1C96qdyagNtwWFYfkt6RbP3ekR6vW5hbtSYVeoDXTcJTfPm0-rjbhC81XF5P27pIPLcR6G844p1OcNIEFRQlvgu7fk2OXMXxV-HqJ_jUdYBA83hMLRVYKxyvKRo7QVxfJmUrQIBNy9sLu-8tH6OlKZr4yA_3qaCOGLJg9IQp0aJeKhpGJsTyK7jK_gMJSK6wDzi17vHTY03da2lSPYvgdsPHG66ldQHMI3iKelD6Ul1rGQ"
              }}
              style={styles.successImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Membership Renewed</Text>
        <Text style={styles.successDescription}>
          Your National Health Insurance Scheme (NHIS) membership has been successfully renewed. Your new expiry date is 2025-07-20.
        </Text>

        {/* Membership Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Membership Number</Text>
            <Text style={styles.detailValue}>NHIS-2024-000123</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expiry Date</Text>
            <Text style={styles.detailValue}>2025-07-20</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleViewMembershipDetails}
          >
            <Text style={styles.primaryButtonText}>View Membership Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleBackToHome}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#141414',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 48, // Offset for back button
  },
  headerSpacer: {
    width: 48,
  },
  imageContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 3/2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  successImage: {
    width: '100%',
    height: '100%',
  },
  successTitle: {
    color: '#141414',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  successDescription: {
    color: '#141414',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detailLabel: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  detailValue: {
    color: '#141414',
    fontSize: 14,
    fontWeight: '400',
    flex: 2,
    textAlign: 'right',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#808080',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 84,
    maxWidth: 480,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 84,
    maxWidth: 480,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#141414',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});