import { useState, useEffect } from 'react';
import { ImageForm } from './components/image-generator/image-form';
import { ImageResult } from './components/image-generator/image-result';
import { ApiKeyInput } from './components/image-generator/api-key-input';
import { generateImage } from './services/image-service';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('dalle-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setHasApiKey(true);
    }
  }, []);

  const handleApiKeySubmit = () => {
    localStorage.setItem('dalle-api-key', apiKey);
    setHasApiKey(true);
  };

  const handleImageGeneration = async (prompt: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const url = await generateImage(prompt, apiKey);
      setImageUrl(url);
      setLastPrompt(prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem('dalle-api-key');
    setApiKey('');
    setHasApiKey(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">AI Image Generator</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          {hasApiKey ? (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={resetApiKey}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Change API Key
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ImageForm onGenerate={handleImageGeneration} isLoading={isLoading} />
                <ImageResult imageUrl={imageUrl} prompt={lastPrompt} />
              </div>

              {error && (
                <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <ApiKeyInput
                apiKey={apiKey}
                onApiKeyChange={setApiKey}
                onSubmit={handleApiKeySubmit}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Image Generator using DALL-E API - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;