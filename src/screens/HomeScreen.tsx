import React, {useCallback, useEffect, useState} from "react";
import { getVeiculos, Veiculo, deleteVeiculo } from "../services/api";
import VeiculoItem from "../components/VeiculoItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import {useFocusEffect} from "@react-navigation/native";
import { View, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

    const normalize = (s: unknown) =>
        String(s ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .trim();

    const tokens = normalize(filter).split(/\s+/).filter(Boolean);


    const filtered = tokens.length === 0
        ? veiculos
        : veiculos.filter((v) => {
            const haystack = [
                v.marca,
                v.modelo,
                v.cor,
                v.placa,
                v.ano, // number → string
            ].map(normalize).join(" ");

            return tokens.every((t) => haystack.includes(t));
        });

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={styles.topRow}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color="#6b7280" style={styles.leftIcon} />
                    <TextInput
                        value={filter}
                        onChangeText={setFilter}
                        placeholder={'Buscar'}
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                    />
                </View>

                <Pressable
                    onPress={() => navigation.navigate('Add')}
                    style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
                    hitSlop={8}
                    accessibilityLabel="Adicionar veículo"
                >
                    <Ionicons name="add" size={22} color="#fff" />
                </Pressable>
            </View>

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
    searchBox: {
        flex: 1,
        height: 44,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        // sombra leve
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
    },
    leftIcon: {
        marginRight: 8
    },

    input: {
        flex: 1,
        color: '#111827',
        fontSize: 15,
    },

    addBtn: {
        width: 30,
        height: 30,
        borderRadius: 22,          // botão totalmente arredondado
        marginLeft: 10,
        backgroundColor: '#16A34A',// verde
        alignItems: 'center',
        justifyContent: 'center',
        // sombra
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

});