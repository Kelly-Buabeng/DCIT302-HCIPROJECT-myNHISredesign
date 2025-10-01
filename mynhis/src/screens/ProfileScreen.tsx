import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from "../components/Header";
import FooterNav from "../components/FooterNav";
import { profile } from "../data/dummyData";
import { RootStackParamList } from "../types/navigation";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Profile" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header with Cover */}
          <View style={styles.profileSection}>
            <View style={styles.coverPhoto}>
              <View style={styles.coverGradient} />
            </View>
            <View style={styles.profileContent}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format'
                  }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <TouchableOpacity style={styles.editImageButton}>
                  <MaterialIcons name="camera-alt" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.membershipType}>{profile.membershipType}</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Active Member</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editProfileButton}>
                <MaterialIcons name="edit" size={16} color="#ffffff" />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialIcons name="event" size={24} color="#4CAF50" />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Years Active</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="local-hospital" size={24} color="#2196F3" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Claims Made</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="group" size={24} color="#FF9800" />
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Dependents</Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="email" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email Address</Text>
                  <Text style={styles.infoValue}>{profile.email}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="phone" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Phone Number</Text>
                  <Text style={styles.infoValue}>{profile.phone}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="badge" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>NHIS Number</Text>
                  <Text style={styles.infoValue}>{profile.nhisNumber}</Text>
                </View>
              </View>

              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons name="credit-card" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Ghana Card</Text>
                  <Text style={styles.infoValue}>GHA-123456789-0</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            
            <View style={styles.actionGroup}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconContainer}>
                  <MaterialIcons name="security" size={22} color="#4CAF50" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionText}>Security & Privacy</Text>
                  <Text style={styles.actionSubtext}>Password, PIN & biometrics</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#757575" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconContainer}>
                  <MaterialIcons name="notifications" size={22} color="#2196F3" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionText}>Notifications</Text>
                  <Text style={styles.actionSubtext}>SMS, email & push notifications</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#757575" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconContainer}>
                  <MaterialIcons name="help" size={22} color="#FF9800" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionText}>Help & Support</Text>
                  <Text style={styles.actionSubtext}>FAQ, contact us & feedback</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="logout" size={22} color="#f44336" />
              </View>
              <View style={styles.actionContent}>
                <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
                <Text style={styles.actionSubtext}>Sign out of your account</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#f44336" />
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>MyNHIS App Version 2.1.0</Text>
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
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coverPhoto: {
    height: 120,
    backgroundColor: '#4CAF50',
    position: 'relative',
  },
  coverGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
  profileContent: {
    padding: 20,
    alignItems: 'center',
    marginTop: -40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
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
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#141414',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#141414',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#141414',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 52,
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: '#141414',
    fontWeight: '500',
    marginBottom: 2,
  },
  actionSubtext: {
    fontSize: 12,
    color: '#757575',
  },
  logoutButton: {
    marginTop: 8,
    borderColor: '#fee',
    borderWidth: 1,
  },
  logoutText: {
    color: '#f44336',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#757575',
  },
});
