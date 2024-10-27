import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationBar = ({ themeColor }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home" size={25} color={ themeColor } />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="hand-heart" size={25} color="#A8A8A8" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, {top:5}]}>
        <Icon name="hand-back-right" size={25} color="#A8A8A8" />
        <Icon name="heart" size={10} color="#FFFFFF" style = {styles.heartedHand}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="bell" size={25} color="#A8A8A8" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="account" size={25} color={ themeColor } />
      </TouchableOpacity>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    padding: 8, 
  },
  heartedHand: {
    top: -11,
    left: 9,
  }
});

export default NavigationBar;