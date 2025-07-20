import React, {useCallback, useEffect, useState} from "react";
import { View, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { getVeiculos, Veiculo, deleteVeiculo } from "../services/api";
import VeiculoItem from "../components/VeiculoItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import {useFocusEffect} from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [filter, setFilter] = useState("");

    const load = async () => {
        const { data } = await getVeiculos();
        setVeiculos(data);
    }

    useFocusEffect(
        useCallback(() => {
            load();
        }, [])
    )

    const filtered = veiculos.filter(v =>
        v.marca.includes(filter) || v.ano.toString().includes(filter)
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="Filtrar por marca ou ano"
                value={filter}
                onChangeText={setFilter}
                style={{
                    marginBottom: 8,
                    borderWidth: 1,
                    padding: 8
            }}
            />

            <Button
                title="+ Adicionar Veículo"
                color="green"
                onPress={() => navigation.navigate('Add')}
            />

            <FlatList
                style={{ marginTop: 15 }}
                data={filtered}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <VeiculoItem
                        veiculo={item}
                        onPress={() => navigation.navigate('Detail', { id: item.id! })}
                        onDelete={async () => { await deleteVeiculo(item.id!); load(); }}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.divisor}/>}
                ListFooterComponent={() => <View style={{ height: 0 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#fff',
    },
    divisor: {
        height: 1,
        backgroundColor: 'green',
        marginHorizontal: 16,
    },
});