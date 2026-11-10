import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { openAppleMaps, openGoogleMaps, hasAppleMaps } from './navigation';

export type Skatepark = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

type Props = {
    park: Skatepark | null;
    onClose: () => void
};

export default function NavigateSheet({ park, onClose }: Props) {
    if (!park) return null;

    const go = (fn: (p: Skatepark) => void) => {
        fn(park);
        onClose();
    }

    return (
        <Modal transparent animationType='slide' visible onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose} />
            <View style={styles.sheet}>
                <Text style={styles.title}>{park.name}</Text>

                {/*Jos apple kartta*/}
                {hasAppleMaps && (
                    <Pressable style={styles.button} onPress={() => go(openAppleMaps)}>
                        <Text style={styles.buttonText}>Navigate with Apple Maps</Text>
                    </Pressable>
                )}

                <Pressable style={styles.button} onPress={() => go(openGoogleMaps)}>
                        <Text style={styles.buttonText}>Navigate with Google Maps</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.cancel]} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    sheet: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 36,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6
    },
    button: {
        backgroundColor: '#1d4ed8',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '600'
    },
    cancel: {
        backgroundColor: '#eee'
    },
    cancelText: {
        color: '#111',
        fontWeight: '600'
    },
});