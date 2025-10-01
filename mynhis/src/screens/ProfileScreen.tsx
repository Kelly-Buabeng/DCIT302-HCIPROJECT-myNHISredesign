import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../components/Header";
import FooterNav from "../components/FooterNav";
import { profile } from "../data/dummyData";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Navigate to Login screen and reset the navigation stack
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>KB</Text>
              </View>
            </View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.membershipType}>{profile.membershipType}</Text>
          </View>

          {/* Profile Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>NHIS Number</Text>
                <Text style={styles.infoValue}>{profile.nhisNumber}</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>✏️</Text>
              <Text style={styles.actionText}>Edit Profile</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔒</Text>
              <Text style={styles.actionText}>Change Password</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔔</Text>
              <Text style={styles.actionText}>Notifications</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.actionText}>Contact Support</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
              <Text style={styles.actionIcon}>🚪</Text>
              <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#141414',
    marginBottom: 4,
  },
  membershipType: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#141414',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#141414',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#141414',
    fontWeight: '500',
  },
  actionArrow: {
    fontSize: 18,
    color: '#757575',
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    color: '#f44336',
  },
});
