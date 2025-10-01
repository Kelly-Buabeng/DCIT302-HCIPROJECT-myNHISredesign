import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { profile } from "../data/dummyData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MembershipScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership Details</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Full Name */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailValue}>{profile.name}</Text>
          </View>

          {/* NHIS Number */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NHIS Number</Text>
            <Text style={styles.detailValue}>{profile.nhisNumber}</Text>
          </View>

          {/* Date of Birth */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date of Birth</Text>
            <Text style={styles.detailValue}>1990-05-15</Text>
          </View>

          {/* Gender */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>Male</Text>
          </View>

          {/* Residential Address */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Residential Address</Text>
            <Text style={styles.detailValue}>123 Main Street, Accra</Text>
          </View>

          {/* District */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>District</Text>
            <Text style={styles.detailValue}>Accra</Text>
          </View>

          {/* Expiry Date */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expiry Date</Text>
            <Text style={styles.detailValue}>2024-12-31</Text>
          </View>
        </View>
      </ScrollView>
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    color: '#141414',
  },
  headerTitle: {
    color: '#141414',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 48, // Balance the back button
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  detailRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    minHeight: 72,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  detailLabel: {
    color: '#141414',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 2,
  },
  detailValue: {
    color: '#757575',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
});
