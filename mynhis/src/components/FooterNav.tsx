import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FooterNav() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Home")}
      >
        <View style={[styles.iconContainer, styles.activeIcon]}>
          <MaterialIcons name="home" size={24} color="#141414" />
        </View>
        <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Benefits")}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name="favorite" size={24} color="#757575" />
        </View>
        <Text style={styles.navText}>Benefits</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Renew")}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name="refresh" size={24} color="#757575" />
        </View>
        <Text style={styles.navText}>Renew</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={24} color="#757575" />
        </View>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingVertical: 4,
  },
  iconContainer: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    // Add any active icon styling here
  },
  navText: {
    color: '#757575',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#141414',
  },
});
