import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { Colors } from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RenewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('mobile-money');
  const insets = useSafeAreaInsets();

  const handleRenewNow = () => {
    const planName = selectedPlan === 'standard' ? 'Standard Plan' : 'Premium Plan';
    const paymentMethod = selectedPayment === 'mobile-money' ? 'Mobile Money' : 'Bank Transfer';
    
    Alert.alert(
      "Renewal Confirmation",
      `Renewing with ${planName} using ${paymentMethod}`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Proceed", 
          onPress: () => {
            // Navigate to renewal confirmation screen
            navigation.navigate("RenewalConfirmation");
          }
        }
      ]
    );
  };

  const RadioButton = ({ 
    selected, 
    onPress, 
    title, 
    description 
  }: { 
    selected: boolean; 
    onPress: () => void; 
    title: string; 
    description?: string; 
  }) => (
    <TouchableOpacity 
      style={[styles.radioContainer, selected && styles.radioContainerSelected]} 
      onPress={onPress}
    >
      <View style={styles.radioContent}>
        <View style={styles.radioTextContainer}>
          <Text style={styles.radioTitle}>{title}</Text>
          {description && <Text style={styles.radioDescription}>{description}</Text>}
        </View>
        <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Renew Membership</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Expiry Notice */}
          <Text style={styles.expiryNotice}>
            Your current membership expires on 2024-08-15. Renew now to continue enjoying uninterrupted health coverage.
          </Text>

          {/* Membership Details Section */}
          <Text style={styles.sectionTitle}>Membership Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Membership ID</Text>
              <Text style={styles.detailValue}>NHIS-123456789</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expiry Date</Text>
              <Text style={styles.detailValue}>2024-08-15</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coverage Type</Text>
              <Text style={styles.detailValue}>Standard</Text>
            </View>
          </View>

          {/* Renewal Options Section */}
          <Text style={styles.sectionTitle}>Renewal Options</Text>
          <View style={styles.optionsContainer}>
            <RadioButton
              selected={selectedPlan === 'standard'}
              onPress={() => setSelectedPlan('standard')}
              title="Standard Plan"
              description="Basic coverage for essential healthcare services."
            />
            <RadioButton
              selected={selectedPlan === 'premium'}
              onPress={() => setSelectedPlan('premium')}
              title="Premium Plan"
              description="Enhanced coverage with additional benefits and services."
            />
          </View>

          {/* Payment Method Section */}
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.optionsContainer}>
            <RadioButton
              selected={selectedPayment === 'mobile-money'}
              onPress={() => setSelectedPayment('mobile-money')}
              title="Mobile Money"
            />
            <RadioButton
              selected={selectedPayment === 'bank-transfer'}
              onPress={() => setSelectedPayment('bank-transfer')}
              title="Bank Transfer"
            />
          </View>
        </View>
      </ScrollView>

      {/* Renew Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.renewButton} onPress={handleRenewNow}>
          <Text style={styles.renewButtonText}>Renew Now</Text>
        </TouchableOpacity>
      </View>

      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 48,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  expiryNotice: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    paddingBottom: 12,
    paddingTop: 4,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    paddingBottom: 8,
    paddingTop: 16,
  },
  detailsContainer: {
    paddingVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 20,
  },
  detailLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    flex: 1,
  },
  detailValue: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    flex: 2,
    textAlign: 'right',
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 12,
    paddingVertical: 16,
  },
  radioContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    backgroundColor: Colors.background,
  },
  radioContainerSelected: {
    borderColor: Colors.primary,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  radioTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  radioDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  renewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  renewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});
