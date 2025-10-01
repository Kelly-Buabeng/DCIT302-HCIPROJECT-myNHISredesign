import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Benefit {
  id: string;
  iconName: string;
  iconLibrary: 'MaterialIcons' | 'FontAwesome' | 'Ionicons';
  title: string;
  description: string;
}

export default function BenefitsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const benefits: Benefit[] = [
    {
      id: "1",
      iconName: "local-hospital",
      iconLibrary: "MaterialIcons",
      title: "Medical Consultations",
      description: "Access to a wide range of medical services"
    },
    {
      id: "2",
      iconName: "medication",
      iconLibrary: "MaterialIcons",
      title: "Prescription Drugs",
      description: "Coverage for essential medications"
    },
    {
      id: "3",
      iconName: "hotel",
      iconLibrary: "MaterialIcons",
      title: "Hospitalization",
      description: "Inpatient care and hospital stays"
    },
    {
      id: "4",
      iconName: "biotech",
      iconLibrary: "MaterialIcons",
      title: "Laboratory Services",
      description: "Coverage for diagnostic tests"
    },
    {
      id: "5",
      iconName: "child-friendly",
      iconLibrary: "MaterialIcons",
      title: "Maternity Care",
      description: "Maternity care and childbirth services"
    },
    {
      id: "6",
      iconName: "emergency",
      iconLibrary: "MaterialIcons",
      title: "Emergency Services",
      description: "Coverage for emergency medical situations"
    }
  ];

  const BenefitItem = ({ benefit }: { benefit: Benefit }) => {
    const IconComponent = benefit.iconLibrary === 'MaterialIcons' 
      ? MaterialIcons 
      : benefit.iconLibrary === 'FontAwesome' 
      ? FontAwesome 
      : Ionicons;

    return (
      <View style={styles.benefitItem}>
        <View style={styles.iconContainer}>
          <IconComponent name={benefit.iconName as any} size={32} color={Colors.primary} />
        </View>
        <View style={styles.benefitContent}>
          <Text style={styles.benefitTitle}>{benefit.title}</Text>
          <Text style={styles.benefitDescription}>{benefit.description}</Text>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>Benefits</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Your NHIS Benefits</Text>
            <Text style={styles.descriptionText}>
              Comprehensive healthcare coverage designed to protect you and your family
            </Text>
          </View>

          {benefits.map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}

          {/* Coverage Note */}
          <View style={styles.noteContainer}>
            <View style={styles.noteIcon}>
              <MaterialIcons name="info" size={20} color={Colors.secondary} />
            </View>
            <Text style={styles.noteText}>
              All benefits are subject to terms and conditions. Contact your healthcare provider for specific coverage details.
            </Text>
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
    backgroundColor: Colors.backgroundSecondary,
    paddingBottom: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitContent: {
    flex: 1,
    justifyContent: 'center',
  },
  benefitTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
  benefitDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.secondarySoft,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  noteIcon: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});