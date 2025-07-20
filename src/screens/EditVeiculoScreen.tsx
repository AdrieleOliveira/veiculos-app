import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getVeiculo, updateVeiculo, Veiculo } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditVeiculoScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const [form, setForm] = useState<Veiculo>({
        placa: '',
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        cor: '',
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await getVeiculo(id);
                setForm(response.data);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do veículo.');
            }
        })();
    }, [id]);

    const onSave = async () => {
        if (!form.placa || !form.marca || !form.modelo || !form.ano || !form.cor) {
            return Alert.alert('Erro', 'Preencha todos os campos.');
        }

        try {
            await updateVeiculo(id, form);
            navigation.popToTop();
        } catch (error) {
            Alert.alert('Erro', 'Falha ao atualizar o veículo.');
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="Placa"
                value={form.placa}
                onChangeText={(text) => setForm(f => ({ ...f, placa: text }))}
                style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            />
            <TextInput
                placeholder="Marca"
                value={form.marca}
                onChangeText={(text) => setForm(f => ({ ...f, marca: text }))}
                style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            />
            <TextInput
                placeholder="Modelo"
                value={form.modelo}
                onChangeText={(text) => setForm(f => ({ ...f, modelo: text }))}
                style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            />
            <TextInput
                placeholder="Cor"
                value={form.cor}
                onChangeText={(text) => setForm(f => ({ ...f, cor: text }))}
                style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            />
            <TextInput
                placeholder="Ano"
                keyboardType="number-pad"
                value={String(form.ano)}
                onChangeText={(text) => setForm(f => ({ ...f, ano: Number(text) }))}
                style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
            />

            <Button
                title="Salvar"
                color="green"
                onPress={onSave}
            />
        </View>
    )
}