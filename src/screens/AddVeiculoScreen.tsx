import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createVeiculo, Veiculo } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Add'>;

export function AddVeiculoScreen({navigation}: Props) {
    const [form, setForm] = useState<Veiculo>({
        placa: '',
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        cor: ''
    });

    const onSave = async () => {
        console.log('onSave chamado com form:', form);

        if (!form.placa || !form.marca || !form.modelo || !form.ano || !form.cor) {
            return Alert.alert('Erro', 'Preencha todos os campos.');
        }

        try {
            const res = await createVeiculo(form);
            console.log('Veículo criado com sucesso:', res.data);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao criar veículo:', error);
            Alert.alert('Erro', 'Falha ao salvar o veículo.');
        }
    };

    return (
        <View style={{flex: 1, padding: 16}}>
            {['Placa','Marca','Modelo','Cor'].map((field: string) => (
                <TextInput
                    key={field}
                    placeholder={field}
                    value={(form as any)[field.toLowerCase()]?.toString()}
                    onChangeText={text =>
                        setForm(prev => ({
                            ...prev,
                            [field.toLowerCase()]:
                                field === 'Ano' ? Number(text) : text,
                        }))
                    }
                    style={{
                        borderWidth: 1,
                        padding: 8,
                        marginBottom: 8,
                        borderRadius: 10,
                        borderColor: 'gray',
                    }}
                />
            ))}

            <TextInput
                placeholder="Ano"
                keyboardType="number-pad"
                value={String(form.ano)}
                onChangeText={t =>
                    setForm(f => ({
                        ...f,
                        ano: Number(t)
                    }))}
                style={{
                    borderWidth: 1,
                    padding: 8,
                    marginBottom: 8,
                    borderRadius: 10,
                    borderColor: 'gray',
                }}
            />

            <Button
                title="Salvar"
                color="green"
                onPress={onSave}
            ></Button>
        </View>
    )
}