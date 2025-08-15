import React from 'react';
import { Pressable, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Veiculo } from '../services/api';

interface Props {
    veiculo: Veiculo;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function VeiculoItem({ veiculo, onPress, onEdit, onDelete }: Props) {
    const handleDelete = () => {
        Alert.alert(
            'Confirmação',
            `Deseja excluir o veículo ${veiculo.marca} ${veiculo.modelo}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: onDelete,
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
            <View style={styles.leftIcon}>
                <MaterialCommunityIcons name="car-outline" size={22} color="#2c3e50" />
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>{veiculo.marca} {veiculo.modelo}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.plate}>{(veiculo.placa || '').toUpperCase()}</Text>
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.detailFill}>
                        <Text style={styles.detailText}>{veiculo.ano}</Text>
                    </View>

                    <View style={styles.detailFill}>
                        <Text style={styles.detailText}>{veiculo.cor}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editBtn} onPress={onEdit} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <MaterialCommunityIcons name="pencil-outline" size={18} color="#fff" />
                </TouchableOpacity>


                <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <MaterialCommunityIcons name="trash-can-outline" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom:10,
        backgroundColor: '#fff',
        borderRadius: 12,
        // sombra iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        // elevação Android
        elevation: 2,
    },

    cardPressed: {
        opacity: 0.85
    },

    leftIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f2f3f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    body: {
        flex: 1
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222'
    },

    metaRow: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },

    plate: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1.4,
        backgroundColor: '#344eac',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    detailFill: {
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 9999,
        backgroundColor: '#e9eefb',
    },

    detailText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1f3158',
    },

    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    editBtn: {
        marginLeft: 8,
        backgroundColor: '#3B82F6',
        borderRadius: 50,
        padding: 8,
    },

    deleteBtn: {
        marginLeft: 8,
        backgroundColor: '#e11d48',
        borderRadius: 50,
        padding: 8,
    },
});