import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isToggleOn, setIsToggleOn] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format'
              }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.headerRight}>
            <View style={styles.nhisLogoContainer}>
              <MaterialIcons name="local-hospital" size={16} color={Colors.textInverse} />
              <Text style={styles.logoText}>NHIS</Text>
            </View>
          </View>
        </View>

        {/* Welcome Section */}
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>Kwame Boateng</Text>

        {/* Toggle Section */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Hide/Unhide</Text>
          <Switch
            value={isToggleOn}
            onValueChange={setIsToggleOn}
            trackColor={{ false: Colors.backgroundTertiary, true: Colors.primary }}
            thumbColor={Colors.background}
          />
        </View>

        {/* Toggleable Digital ID Card */}
        {isToggleOn && (
          <View style={styles.digitalIdContainer}>
            <View style={styles.digitalIdCard}>
              {/* Card Header */}
              <View style={styles.digitalIdHeader}>
                <View style={styles.nhisLogo}>
                  <MaterialIcons name="local-hospital" size={20} color={Colors.textInverse} />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.cardHeaderTitle}>NHIS DIGITAL ID</Text>
                  <Text style={styles.cardHeaderSubtitle}>National Health Insurance Scheme</Text>
                </View>
                <View style={styles.cardChip}>
                  <MaterialIcons name="credit-card" size={16} color="#FFD700" />
                </View>
              </View>

              {/* Member Information */}
              <View style={styles.memberInfoSection}>
                <View style={styles.memberPhotoContainer}>
                  <View style={styles.memberPhoto}>
                    <MaterialIcons name="person" size={32} color={Colors.textInverse} />
                  </View>
                </View>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>KWAME BOATENG</Text>
                  <Text style={styles.memberTitle}>Principal Member</Text>
                </View>
              </View>

              {/* ID Information */}
              <View style={styles.idInfoSection}>
                <View style={styles.idRow}>
                  <Text style={styles.idLabel}>NHIS Number:</Text>
                  <Text style={styles.idValue}>321-098-765-432</Text>
                </View>
                <View style={styles.idRow}>
                  <Text style={styles.idLabel}>Ghana Card:</Text>
                  <Text style={styles.idValue}>GHA-123456789-0</Text>
                </View>
                <View style={styles.idRow}>
                  <Text style={styles.idLabel}>Valid Until:</Text>
                  <Text style={styles.idValue}>31/12/2025</Text>
                </View>
                <View style={styles.idRow}>
                  <Text style={styles.idLabel}>Status:</Text>
                  <View style={styles.statusContainer}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>ACTIVE</Text>
                  </View>
                </View>
              </View>

              {/* QR Code Section */}
              <View style={styles.qrSection}>
                <View style={styles.qrCode}>
                  <View style={styles.qrPattern}>
                    <View style={[styles.qrDot, { top: 2, left: 2 }]} />
                    <View style={[styles.qrDot, { top: 2, right: 2 }]} />
                    <View style={[styles.qrDot, { bottom: 2, left: 2 }]} />
                    <View style={[styles.qrDot, { top: 10, left: 10 }]} />
                    <View style={[styles.qrDot, { top: 15, right: 8 }]} />
                    <View style={[styles.qrDot, { bottom: 8, right: 6 }]} />
                  </View>
                </View>
                <Text style={styles.qrText}>Scan for verification</Text>
              </View>

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <Text style={styles.footerText}>Republic of Ghana • Ministry of Health</Text>
              </View>
            </View>
          </View>
        )}

        {/* NHIS Card */}
        <View style={styles.cardContainer}>
          <View style={styles.nhisCard}>
            <View style={styles.cardImageContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=NHIS+CARD' }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.expiryText}>Expires in 30 days</Text>
              <Text style={styles.membershipTitle}>NHIS Membership</Text>
              <Text style={styles.membershipDescription}>
                Don't let your health coverage lapse. Renew your membership quickly and easily
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("Renew")}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name="event" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Renew Membership</Text>
              <Text style={styles.actionSubtitle}>Easy renewal process</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("Claims")}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name="search" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Track Claims</Text>
              <Text style={styles.actionSubtitle}>Check your claim status</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("Membership")}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name="group" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Manage Dependents</Text>
              <Text style={styles.actionSubtitle}>Add or remove family</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("LinkGhanaCard")}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name="badge" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Link Ghana Card</Text>
              <Text style={styles.actionSubtitle}>Connect your national ID</Text>
            </View>
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
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  profileContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  nhisLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  logoText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 20,
  },
  nameText: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  toggleText: {
    color: Colors.textPrimary,
    fontSize: 16,
    flex: 1,
  },
  digitalIdContainer: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  digitalIdCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  digitalIdHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nhisLogo: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardHeaderTitle: {
    color: Colors.textInverse,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardHeaderSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 2,
  },
  cardChip: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  memberPhotoContainer: {
    marginRight: 16,
  },
  memberPhoto: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    color: Colors.textInverse,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  idInfoSection: {
    marginBottom: 20,
  },
  idRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  idLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  idValue: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.success,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: 'bold',
  },
  qrSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  qrCode: {
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
    borderRadius: 6,
    position: 'relative',
  },
  qrPattern: {
    flex: 1,
    position: 'relative',
  },
  qrDot: {
    width: 4,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 1,
    position: 'absolute',
  },
  qrText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    marginLeft: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 12,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    textAlign: 'center',
  },
  cardContainer: {
    padding: 16,
  },
  nhisCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 16,
  },
  expiryText: {
    color: Colors.textTertiary,
    fontSize: 14,
    marginBottom: 4,
  },
  membershipTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  membershipDescription: {
    color: Colors.textTertiary,
    fontSize: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    color: '#141414',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: 158,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 12,
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionContent: {
    gap: 4,
  },
  actionTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionSubtitle: {
    color: Colors.textTertiary,
    fontSize: 14,
  },
  bottomSpacing: {
    height: 20,
  },
});
