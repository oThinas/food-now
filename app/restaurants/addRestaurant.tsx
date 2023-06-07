import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Field } from '../../src/components/Field';
import { useState } from 'react';
import { Button } from '../../src/components/Button';
import { Header } from '../../src/components/Header';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { api } from '../../src/lib/api';

export default function AddRestaurant() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');

  async function handleAddRestaurant() {
    const formattedName = name.trim();
    const formattedDesc = desc.trim();
    const formattedCnpj = cnpj.trim();

    if (!formattedName) {
      showError('O campo nome é obrigatório');
      return;
    } else if (!formattedDesc) {
      showError('O campo descrição é obrigatório');
      return;
    } else if (!formattedCnpj) {
      showError('O campo CNPJ é obrigatório');
      return;
    } else if (Number.isNaN(Number(formattedCnpj))) {
      showError('O CNPJ deve conter apenas números');
      return;
    } else if (formattedCnpj.length !== 14) {
      showError('O CNPJ deve conter 14 números');
      return;
    }

    try {
      await api.post('/restaurante', {
        nome: formattedName,
        descricao: formattedDesc,
        cnpj: formattedCnpj,
        nota: (Math.floor(Math.random() * 50) + 1) / 10,
        endereco: {
          rua: 'Rua dos Bobos',
          complemento: '0',
          bairro: 'Centro',
          estado: 'SP',
          cidade: 'São Paulo',
        },
      }).then(() => router.push('/restaurants'));
    } catch (error) {
      showError('Ocorreu um erro ao adicionar o restaurante');
      console.log(error);
    }
  }

  function showError(message: string) {
    setError(message);
    setTimeout(() => setError(''), 2000);
  }

  return (
    <KeyboardAvoidingView className='flex-1' behavior='padding'>
      <View className='flex-1 bg-zinc-100 p-8'>
        <Header
          leftAction={
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft color='black'/>
            </TouchableOpacity>
          }
          content={
            <>
              Adicionando{' '}

              <Text className='text-primary'>
                restaurante
              </Text>
            </>
          }
        />

        <View className='flex-1 justify-center'>
          {error && (
            <Text className='w-full text-center text-lg font-medium text-red-600'>
              {error}
            </Text>
          )}

          <Field label='Nome' value={name} onChangeText={(value) => setName(value)} customClassname='mb-4'/>

          <Field label='Descrição' value={desc} onChangeText={(value) => setDesc(value)} customClassname='mb-4'/>

          <Field label='CNPJ' keyboardType='numeric' value={cnpj} onChangeText={(value) => setCnpj(value)} customClassname='mb-4'/>

          <Button onPress={() => handleAddRestaurant()}>
            <Text className='text-lg font-medium text-white'>
              Adicionar
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
