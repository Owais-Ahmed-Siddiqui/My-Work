import { useApp } from './lib/store';
import AuthScreen from './components/AuthScreen';
import AppShell from './components/AppShell';

export default function App() {
  const authenticated = useApp(s => s.authenticated);
  return authenticated ? <AppShell /> : <AuthScreen />;
}
