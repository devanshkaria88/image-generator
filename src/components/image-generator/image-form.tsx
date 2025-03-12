import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageIcon, Loader2 } from 'lucide-react';

interface ImageFormProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export function ImageForm({ onGenerate, isLoading }: ImageFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    await onGenerate(prompt);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon size={20} />
          Generate Image
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full gap-3">
            <Label htmlFor="prompt">Describe the image you want to generate</Label>
            <Textarea
              id="prompt"
              placeholder="A beautiful landscape with mountains and a lake at sunset..."
              className="min-h-[120px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}