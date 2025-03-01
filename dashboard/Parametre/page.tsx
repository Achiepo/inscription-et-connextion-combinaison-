// pages/dashboard/Parametre/page.tsx

import Parametres from './Parametres';

const Parametre = () => {
  const handleSave = () => {
    console.log('Les paramètres ont été enregistrés.');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Parametres onSave={handleSave} onPasswordChange={function (): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
};

export default Parametre;
