import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from "../types/navigation";
import FooterNav from "../components/FooterNav";
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

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
          <IconComponent name={benefit.iconName as any} size={32} color="#007bff" />
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
          {benefits.map((benefit) => (
            <BenefitItem key={benefit.id} benefit={benefit} />
          ))}
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
    marginRight: 48,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    minHeight: 72,
    paddingVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitContent: {
    flex: 1,
    justifyContent: 'center',
  },
  benefitTitle: {
    color: '#141414',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 2,
  },
  benefitDescription: {
    color: '#757575',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
});