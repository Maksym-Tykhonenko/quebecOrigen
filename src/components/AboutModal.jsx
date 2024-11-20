import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const AboutModal = ({ visible, onClose }) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.modalText}>
                    Welcome to <Text style={styles.bold}>Quebec</Text> - The Ultimate Cultural and Historical Guide!
                    </Text>
                    <Text style={styles.modalText}>
                    Embark on a journey through the heart of <Text style={styles.bold}>Quebec’s</Text> ich history, vibrant culture, and breathtaking landscapes. Whether you’re exploring iconic landmarks, learning about the city’s influential figures, or uncovering hidden stories from the past, this app is your gateway to experiencing <Text style={styles.bold}>Quebec</Text> like never before.
                    </Text>
                    <Text style={styles.modalText}>
                    Navigate through interactive timelines, discover key events that shaped the region, and dive into engaging quizzes and articles that bring <Text style={styles.bold}>Quebec’s</Text> legacy to life. Customize your exploration and unlock fascinating facts along the way.
                    </Text>
                    <Text style={styles.modalText}>
                    Your adventure into the wonders of <Text style={styles.bold}>Quebec</Text> begins now!
                    </Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icons type={'close'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        height: '60%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        color: '#3C3C3C'
    },
    bold: {
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default AboutModal;
