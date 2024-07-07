import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

interface PlayModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  elements: string[];
  onElementPress?: (element: string) => void;
  selectedElement?: string;
}

const PlayModal: React.FC<PlayModalProps> = ({ isVisible, onClose, title, elements, onElementPress, selectedElement }) => {
  return (
    <Modal 
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <ScrollView>
          {elements.map((element, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.elementBtn, { backgroundColor: selectedElement === element ? '#ccc' : 'white' }]}
              onPress={() => onElementPress?.(element)}>
                <Text style={styles.elementText}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 310,
  },
  titleContainer: {
    backgroundColor: '#283882',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'SCDream6',
  },
  elementBtn:{
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  elementText: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    marginVertical: 10,
    fontFamily: 'SCDream4',
  },
});

export default PlayModal;
