import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = ({
  title,
  content,
  backgroundColor = '#fff',
  textColor = '#000',
}) => {
  return (
    <View style={[styles.postContainer, { backgroundColor }]}>
      <Text style={[styles.postTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.postContent, { color: textColor }]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
  },
});

export default Post;
