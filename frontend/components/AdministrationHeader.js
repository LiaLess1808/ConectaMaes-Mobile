import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdministrationHeader = ({ navigation }) => {
  const handleIconPress = (iconName, e) => {
    e.stopPropagation(); // Previne a propagação do evento
    console.log(`${iconName} icon pressed`);

    if (iconName === 'back') navigation.navigate('Home');
    if (iconName === 'leave') navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.cancel}
          onPress={(e) => handleIconPress('back', e)}>
          <Icon name="arrow-left-circle-outline" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.headerTitle}>Administração</Text>
      </View>
      <TouchableOpacity
        style={styles.cancel}
        onPress={(e) => handleIconPress('leave', e)}>
        <Icon name="account-arrow-left" size={30} style={styles.leaveIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    flex: 1,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancel: {
    marginRight: 16,
    marginLeft: 16,
  },
  leaveIcon: {
    marginRight: 16,
  },
});

export default AdministrationHeader;
