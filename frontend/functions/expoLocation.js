import * as Location from "expo-location";
import { Alert } from "react-native";

// Solicitar permissão de localização
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão Negada",
        "É necessário conceder acesso à localização para utilizar esta funcionalidade."
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao solicitar permissão de localização:", error);
    Alert.alert(
      "Erro",
      "Ocorreu um problema ao solicitar a permissão de localização."
    );
    return false;
  }
};

// Obter a localização atual
export const getCurrentLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return location.coords; // Retorna latitude e longitude
  } catch (error) {
    console.error("Erro ao obter localização atual:", error);
    Alert.alert(
      "Erro",
      "Não foi possível obter sua localização. Verifique se o GPS está ativado."
    );
    return null;
  }
};

// Obter o endereço a partir das coordenadas
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const address = reverseGeocode[0];
      return {
        cep: address.postalCode || "",
        cidade: address.city || "",
        estado: address.region || "",
        bairro: address.district || "",
        rua: address.street || "",
      };
    } else {
      Alert.alert("Erro", "Nenhum endereço foi encontrado para esta localização.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao realizar geocodificação reversa:", error);
    Alert.alert("Erro", "Não foi possível encontrar o endereço.");
    return null;
  }
};

// Função principal para obter o CEP
export const getCurrentCEP = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;

  const location = await getCurrentLocation();
  if (!location) return null;

  const { latitude, longitude } = location;
  const address = await getAddressFromCoordinates(latitude, longitude);

  if (address && address.cep) {
    return address.cep;
  } else {
    Alert.alert("Erro", "Não foi possível obter o CEP.");
    return null;
  }
};
