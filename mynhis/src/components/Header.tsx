import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = true }: HeaderProps) {
  const navigation = useNavigation<NavigationProp>();
  
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backText}>{"< Back"}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    width: 48,
  },
});
