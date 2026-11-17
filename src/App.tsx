import { useState, useCallback } from 'react';
import { ARTIFACTS, exportAsCSV, exportAsJSON } from './data/artifacts';
import type { HistoricalPeriod, ScreenId } from './types/artifact';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { DetailView } from './components/DetailView';
import { AiChatView } from './components/AiChatView';
import { SourcesView } from './components/SourcesView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>('Tất cả');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(
    ARTIFACTS[0].mã_định_danh
  );
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  const handleNavigate = useCallback((screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExploreCatalog = useCallback(
    (period: HistoricalPeriod = 'Tất cả') => {
      setSelectedPeriod(period);
      handleNavigate('catalog');
    },
    [handleNavigate]
  );

  const handleSelectArtifact = useCallback(
    (id: string) => {
      setSelectedArtifactId(id);
      handleNavigate('detail');
    },
    [handleNavigate]
  );

  const handleAskAiAboutArtifact = useCallback(
    (artifactTitle: string, artifactId: string) => {
      setAiInitialPrompt(
        `Hãy tóm tắt niên đại, nơi lưu giữ hiện nay, tình trạng bản gốc và quyền công bố của bảo vật ${artifactTitle} (${artifactId}).`
      );
      handleNavigate('chat');
    },
    [handleNavigate]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onExportJSON={() => exportAsJSON(ARTIFACTS)}
        onExportCSV={() => exportAsCSV(ARTIFACTS)}
      />

      <main className="flex-1">
        {activeScreen === 'home' && (
          <HomeView
            onExploreCatalog={handleExploreCatalog}
            onSelectArtifact={handleSelectArtifact}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'catalog' && (
          <CatalogView
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            onSelectArtifact={handleSelectArtifact}
            onExportJSON={(records) => exportAsJSON(records)}
            onExportCSV={(records) => exportAsCSV(records)}
          />
        )}

        {activeScreen === 'detail' && (
          <DetailView
            artifactId={selectedArtifactId}
            onSelectArtifact={(id) => setSelectedArtifactId(id)}
            onBackToCatalog={() => handleNavigate('catalog')}
            onAskAiAboutArtifact={handleAskAiAboutArtifact}
          />
        )}

        {activeScreen === 'chat' && (
          <AiChatView
            initialPrompt={aiInitialPrompt}
            onClearInitialPrompt={() => setAiInitialPrompt('')}
            onSelectArtifact={handleSelectArtifact}
          />
        )}

        {activeScreen === 'sources' && <SourcesView />}

        {activeScreen === 'about' && <AboutView />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onExportJSON={() => exportAsJSON(ARTIFACTS)}
        onExportCSV={() => exportAsCSV(ARTIFACTS)}
      />
    </div>
  );
}
