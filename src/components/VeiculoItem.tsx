import React from 'react';
import { TouchableOpacity, Text, View, Button, StyleSheet } from 'react-native';
import { Veiculo } from '../services/api';

interface Props {
    veiculo: Veiculo;
    onPress: () => void;
    onDelete: () => void;
}

export default function VeiculoItem({ veiculo, onPress, onDelete }: Props) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            borderBottomWidth: 1
        }}>
            <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <Text>{veiculo.marca} | {veiculo.modelo} | {veiculo.placa} | {veiculo.ano}</Text>
            </TouchableOpacity>

            <View style={styles.wrapper}>
                <Button
                    title="X"
                    color="red"
                    onPress={onDelete}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 20,
        backgroundColor: 'green',
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
    },
});