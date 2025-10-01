import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { Colors } from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LinkGhanaCardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [ghanaCardNumber, setGhanaCardNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const insets = useSafeAreaInsets();

  const handleLinkCard = () => {
    if (!ghanaCardNumber.trim() || !verificationCode.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Simple validation for Ghana Card format (example: GHA-123456789-0)
    const ghanaCardPattern = /^GHA-\d{9}-\d{1}$/i;
    
    if (!ghanaCardPattern.test(ghanaCardNumber)) {
      Alert.alert(
        "Invalid Format", 
        "Please enter a valid Ghana Card number in the format: GHA-123456789-0"
      );
      return;
    }

    // Simple verification code validation (6 digits)
    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code");
      return;
    }

    Alert.alert(
      "Success",
      "Ghana Card linked successfully to your NHIS account!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("GhanaCardLinked")
        }
      ]
    );
  };

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
        <Text style={styles.headerTitle}>Link Ghana Card</Text>
      </View>

      <View style={styles.content}>
        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Enter your Ghana Card number and the verification code sent to your registered phone number.
          </Text>
        </View>

        {/* Ghana Card Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ghana Card Number (e.g., GHA-123456789-0)"
            placeholderTextColor={Colors.textSecondary}
            value={ghanaCardNumber}
            onChangeText={setGhanaCardNumber}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        {/* Verification Code Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="6-digit Verification Code"
            placeholderTextColor={Colors.textSecondary}
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            maxLength={6}
            autoCorrect={false}
          />
        </View>

        {/* Link Card Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.linkButton} onPress={handleLinkCard}>
            <Text style={styles.linkButtonText}>Link Card</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  instructionsContainer: {
    paddingVertical: 16,
    paddingBottom: 24,
  },
  instructionsText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputContainer: {
    paddingVertical: 12,
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 0,
  },
  buttonContainer: {
    paddingVertical: 12,
  },
  linkButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});