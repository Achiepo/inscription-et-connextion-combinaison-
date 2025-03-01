import { useState } from 'react';
import { TextInput, Button, Card, Title, Container, PasswordInput, Notification, Switch, Group } from '@mantine/core';

interface ParametresProps {
  onSave: () => void;
  onPasswordChange: () => void;
}

const Parametres: React.FC<ParametresProps> = ({ onSave, onPasswordChange }) => {
  // États pour les champs de profil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // États pour le changement de mot de passe
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour les préférences de notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // États pour la personnalisation du thème
  const [isDarkMode, setIsDarkMode] = useState(false);

  // États pour les erreurs et notifications
  const [passwordError, setPasswordError] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Fonction pour enregistrer les modifications de profil
  const handleSaveProfile = () => {
    onSave(); // Appel de la fonction passée en prop
    setNotification('Profil enregistré avec succès');
  };

  // Fonction pour changer le mot de passe
  const handlePasswordChange = () => {
    // Vérification des mots de passe
    if (newPassword !== confirmPassword) {
      setPasswordError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    setPasswordError('');
    onPasswordChange(); // Appel de la fonction de changement de mot de passe
    setNotification('Mot de passe changé avec succès');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Container className="mt-8 space-y-8">
      {notification && (
        <Notification
          title="Succès"
          color="green"
          onClose={() => setNotification(null)}
          className="mb-4"
        >
          {notification}
        </Notification>
      )}

      <Title order={2} className="text-center mb-6 text-3xl font-bold text-gray-800">⚙️ Paramètres du Tableau de Bord</Title>

      <div className="space-y-6">
        {/* Modifier le Profil */}
        <Card shadow="md" padding="xl" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-800">Modifier le Profil</Title>
          <div className="space-y-4">
            <TextInput
              label="Nom"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              mt="md"
              className="w-full"
            />
            <TextInput
              label="Email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              mt="md"
              className="w-full"
            />
          </div>
          <Button color="blue" mt="md" onClick={handleSaveProfile} className="w-full">Enregistrer</Button>
        </Card>

        {/* Changer le mot de passe */}
        <Card shadow="md" padding="xl" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-800">Changer le Mot de Passe</Title>
          <div className="space-y-4">
            <PasswordInput
              label="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.currentTarget.value)}
              mt="md"
              className="w-full"
            />
            <PasswordInput
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
              mt="md"
              className="w-full"
            />
            <PasswordInput
              label="Confirmer le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              mt="md"
              className="w-full"
            />
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          <Button color="red" mt="md" onClick={handlePasswordChange} className="w-full">Changer le mot de passe</Button>
        </Card>

        {/* Préférences de Notifications */}
        <Card shadow="md" padding="xl" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-800">Préférences de Notifications</Title>
          <Group mt="md">
            <span>Activer les notifications</span>
            <Switch
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled((prev) => !prev)}
              color="blue"
            />
          </Group>
        </Card>

        {/* Personnalisation du Thème */}
        <Card shadow="md" padding="xl" className="bg-white rounded-lg">
          <Title order={4} className="text-xl font-semibold text-gray-800">Personnalisation du Thème</Title>
          <Group mt="md">
            <span>Thème Sombre</span>
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode((prev) => !prev)}
              color="blue"
            />
          </Group>
        </Card>
      </div>
    </Container>
  );
};

export default Parametres;
