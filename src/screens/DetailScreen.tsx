import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getVeiculo, Veiculo } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

    useEffect(() => {
        getVeiculo(id).then(res => setVeiculo(res.data));
    }, []);

    if (!veiculo) {
        return <Text>Carregando...</Text>
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {Object.entries(veiculo).map(([key, value]) => (
                <Text key={key} style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>
                        {`${key.toUpperCase()}: `}
                    </Text>
                    { value }
                </Text>
            ))}

            <Button title="Editar" onPress={() => navigation.navigate('Edit', { id })} />
        </View>
    )
}
