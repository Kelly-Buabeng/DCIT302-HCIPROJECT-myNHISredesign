import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import { MaterialIcons } from '@expo/vector-icons';
import FooterNav from "../components/FooterNav";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Dependent {
  id: string;
  name: string;
  relationship: string;
  imageUrl: string;
}

export default function MembershipScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const dependents: Dependent[] = [
    {
      id: "1",
      name: "Kwame Mensah",
      relationship: "Child",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP99mOg4ApCAAIUafFl8TBuTqaXfgjgVClx-AWpS2W0CBKuZkK13Up7UR_9tipQ0MSY0992YkLYjP_QXBY6yiRcYMSAQlSVnMv8pVdRCdX93k9IbAfXkVZVCcaTksWDHEWV28Z4scfdbXq6Umo1WDmwDNOXZfXjGmgVF6EKmpYW12DTMvAVUaB9kRKLprg4Jchpr4hjVCtpQ5KjFF9SIVuKMcD0_2AXBRb-yhcOpg9MYGIE7CQ0hyTnI0BZBDhPPwd05tYngpArww"
    },
    {
      id: "2", 
      name: "Akosua Boateng",
      relationship: "Spouse",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-NbhmkSQt6O5_0kJHox9krh-a41UUC3bTxYFP38oqcZr8w_42zBjjMmj6RjZEF8_Q6r4xHV2gFIGejiTYLRTuxgUJXDUK4LsDVRl5MQ7OMxersAaWVSgXeGgJ8RchLkJRuhj88sLfI1Ocm766urWCKlqDu-iOwKFeNaSk3wf4pomwFoBZnh6Jt6LJaJQgHdDkHVF2ijSFxjvqENSxdNik6nZehMA-ou8_qNNiKLRPTSzcu1IFAbwGB0PNlkX28fdU7ohnZEN9oSc"
    },
    {
      id: "3",
      name: "Yaw Appiah", 
      relationship: "Child",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_vQd7XxoxSiLvhMuKa-Awm5xTRYhJs46h-lJ-6xw29SBYsZGj8TckFS_F7FOisuvgZD-9JVr0XA8C6e383Hl1LDtq-N0Q4Tpg9dknoOt51bg9sLGZOEmQnpmUX2CibGHunZzt-8BbdqMrZ-_uc2ybJuN2QUXjSbwEl3qE0K7aACqjA-EGOaN70oO_heCLSPfQkOH3nMQXYJuBDw24FsyVjoKB-txbVz8IEvffv8c_j8n2cPaGf8C3OzM4JGLKBaQG6pV5H6x--xE"
    }
  ];

  const handleDeleteDependent = (dependentId: string, dependentName: string) => {
    Alert.alert(
      "Remove Dependent",
      `Are you sure you want to remove ${dependentName} from your dependents?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            // Handle dependent removal logic here
            Alert.alert("Success", `${dependentName} has been removed from your dependents.`);
          }
        }
      ]
    );
  };

  const handleAddDependent = () => {
    Alert.alert(
      "Add Dependent", 
      "This feature will allow you to add a new dependent to your NHIS coverage.",
      [{ text: "OK" }]
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
          <MaterialIcons name="arrow-back" size={24} color="#141414" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Dependents</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Dependents Section */}
        <Text style={styles.sectionTitle}>Current Dependents</Text>
        
        {dependents.map((dependent) => (
          <View key={dependent.id} style={styles.dependentItem}>
            <View style={styles.dependentInfo}>
              <Image 
                source={{ uri: dependent.imageUrl }}
                style={styles.dependentImage}
              />
              <View style={styles.dependentDetails}>
                <Text style={styles.dependentName}>{dependent.name}</Text>
                <Text style={styles.dependentRelationship}>{dependent.relationship}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteDependent(dependent.id, dependent.name)}
            >
              <MaterialIcons name="delete" size={24} color="#141414" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Dependent Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddDependent}
          >
            <Text style={styles.addButtonText}>Add Dependent</Text>
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
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: '#141414',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  dependentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 72,
    justifyContent: 'space-between',
  },
  dependentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dependentImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  dependentDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  dependentName: {
    color: '#141414',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  dependentRelationship: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '400',
  },
  deleteButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#808080',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 84,
    maxWidth: 480,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});
