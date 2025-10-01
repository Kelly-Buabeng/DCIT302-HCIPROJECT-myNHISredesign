import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isToggleOn, setIsToggleOn] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.profileAvatar} />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.signalButton}>
              <View style={styles.signalIcon} />
            </TouchableOpacity>
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
            trackColor={{ false: '#f2f2f2', true: '#808080' }}
            thumbColor="#ffffff"
          />
        </View>

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
              <MaterialIcons name="event" size={24} color="#007bff" />
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
              <MaterialIcons name="search" size={24} color="#007bff" />
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
              <MaterialIcons name="group" size={24} color="#007bff" />
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
              <MaterialIcons name="badge" size={24} color="#007bff" />
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
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
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
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signalButton: {
    padding: 8,
  },
  signalIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#141414',
    borderRadius: 4,
  },
  welcomeText: {
    color: '#141414',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 20,
  },
  nameText: {
    color: '#141414',
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  toggleText: {
    color: '#141414',
    fontSize: 16,
    flex: 1,
  },
  cardContainer: {
    padding: 16,
  },
  nhisCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
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
    color: '#757575',
    fontSize: 14,
    marginBottom: 4,
  },
  membershipTitle: {
    color: '#141414',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  membershipDescription: {
    color: '#757575',
    fontSize: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    color: '#141414',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    color: '#141414',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionSubtitle: {
    color: '#757575',
    fontSize: 14,
  },
  bottomSpacing: {
    height: 20,
  },
});
