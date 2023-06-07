import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync, setPositionAsync } from 'expo-navigation-bar';

export default function Layout() {
  setBackgroundColorAsync('#00000000');
  setPositionAsync('absolute');

  return (
    <>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'slide_from_right' }}
      />
      <StatusBar style='dark' translucent/>
    </>
  );
}
