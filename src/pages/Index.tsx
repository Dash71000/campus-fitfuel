import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FitnessForm from '@/components/FitnessForm';
import ResultsView from '@/components/ResultsView';
import { UserProfile } from '@/lib/fitnessUtils';

type AppState = 'home' | 'form' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleFormSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('results');
  };

  const handleBackToHome = () => {
    setAppState('home');
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {appState === 'home' && (
        <HeroSection onStart={() => setAppState('form')} />
      )}
      
      {appState === 'form' && (
        <FitnessForm 
          onSubmit={handleFormSubmit} 
          onBack={handleBackToHome}
        />
      )}
      
      {appState === 'results' && userProfile && (
        <ResultsView 
          profile={userProfile} 
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
};

export default Index;
