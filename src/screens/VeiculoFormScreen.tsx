import React, { useState, useEffect } from 'react';
import { View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { createVeiculo, Veiculo, getVeiculo, updateVeiculo } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'VeiculoForm'>;

type RowProps = {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    placeholder: string;
    value: string;
    onChangeText: (t: string) => void;
    keyboardType?: 'default' | 'number-pad';
};

const InputRow = React.memo(function InputRow({
  icon, placeholder, value, onChangeText, keyboardType = 'default',
}: RowProps) {
    return (
        <View style={styles.inputRow}>
            <Ionicons name={icon} size={18} color="#6B7280" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    );
});

export function VeiculoFormScreen({navigation, route}: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<Veiculo>({
        placa: '',
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        cor: ''
    });

    const [saving, setSaving] = useState(false);

    const isEditing = route.params?.id !== undefined;
    const veiculoId = route.params?.id;

    useEffect(() => {
        async function loadVeiculo() {
            if (isEditing && veiculoId) {
                try {
                    setIsLoading(true);
                    const { data } = await getVeiculo(veiculoId);
                    setForm(data);

                } catch (error) {
                    console.error('Erro ao carregar veículo:', error);
                    Alert.alert('Erro', 'Não foi possível carregar os dados do veículo.');
                    navigation.goBack();
                } finally {
                    setIsLoading(false);
                }
            }
        }

        loadVeiculo();
    }, [isEditing, veiculoId]);

    const invalid =
        !form.placa || !form.marca || !form.modelo || !form.cor || !form.ano;

    const onSave = async () => {
        if (invalid) {
            return Alert.alert('Erro', 'Preencha todos os campos.');
        }

        try {
            setSaving(true);

            if (isEditing) {
                const res = await updateVeiculo(veiculoId!, form);
                console.log('Veículo atualizado com sucesso!!!!:', res.data);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                const res = await createVeiculo(form);
                console.log('Veículo criado com sucesso:', res.data);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } catch (error) {
            console.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} veículo:`, error);
            Alert.alert('Erro', `Falha ao ${isEditing ? 'atualizar' : 'salvar'} o veículo.`);
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F8FAFC' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#16A34A" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.pageTitle}>
                        <MaterialCommunityIcons
                            name="car-outline"
                            size={20}
                            color="#111"
                        />{' '}
                        {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
                    </Text>

                <InputRow
                    icon="car-outline"
                    placeholder="Placa"
                    value={form.placa}
                    onChangeText={(t) => setForm((f) => ({ ...f, placa: t }))}
                />
                <InputRow
                    icon="pricetag-outline"
                    placeholder="Marca"
                    value={form.marca}
                    onChangeText={(t) => setForm((f) => ({ ...f, marca: t }))}
                />
                <InputRow
                    icon="cube-outline"
                    placeholder="Modelo"
                    value={form.modelo}
                    onChangeText={(t) => setForm((f) => ({ ...f, modelo: t }))}
                />
                <InputRow
                    icon="color-palette-outline"
                    placeholder="Cor"
                    value={form.cor}
                    onChangeText={(t) => setForm((f) => ({ ...f, cor: t }))}
                />
                <View style={styles.inputRow}>
                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="#6B7280"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ano"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                        value={String(form.ano ?? '')}
                        onChangeText={(t) =>
                            setForm((f) => ({ ...f, ano: Number(t.replace(/\D/g, '')) || 0 }))
                        }
                    />
                </View>

                <Pressable
                    onPress={onSave}
                    disabled={invalid || saving}
                    style={({ pressed }) => [
                        styles.saveBtn,
                        (pressed || saving) && styles.saveBtnPressed,
                        (invalid || saving) && styles.saveBtnDisabled,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Salvar veículo"
                >
                    <Ionicons name="save-outline" size={18} color="#FFF" />
                    <Text style={styles.saveText}>
                        {saving ? 'SALVANDO...' : 'SALVAR'}
                    </Text>
                </Pressable>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#4B5563',
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
        // sombra leve
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    inputIcon: { marginRight: 8 },
    input: {
        flex: 1,
        color: '#111827',
        fontSize: 15,
    },
    saveBtn: {
        height: 48,
        borderRadius: 12,
        backgroundColor: '#16A34A',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        // sombra
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
    },
    saveBtnPressed: { opacity: 0.9, transform: [{ scale: 0.997 }] },
    saveBtnDisabled: { backgroundColor: '#86EFAC' },
    saveText: {
        color: '#FFF',
        fontWeight: '800',
        letterSpacing: 0.6,
    },
});