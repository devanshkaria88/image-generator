import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

interface ImageResultProps {
  imageUrl: string | null;
  prompt: string | null;
}

export function ImageResult({ imageUrl, prompt }: ImageResultProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon size={20} />
          Generated Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden rounded-md border border-border">
              <img
                src={imageUrl}
                alt={prompt || 'Generated image'}
                className="w-full object-cover"
              />
            </div>
            {prompt && (
              <p className="text-sm text-muted-foreground text-center">
                "{prompt}"
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] bg-muted/30 rounded-md border border-dashed border-muted">
            <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              Your generated image will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}