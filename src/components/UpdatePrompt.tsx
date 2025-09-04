import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Button } from './ui/button';

export type UpdatePromptProps = {
  open: boolean;
  title: string;
  description: string;
  version: string;
  mandatory: boolean;
  onUpdate: () => void;
  onSkip?: () => void;
  updateUrl?: string | null;
  onOpenChange?: (open: boolean) => void;
};

export function UpdatePrompt({ open, title, description, version, mandatory, onUpdate, onSkip, updateUrl, onOpenChange }: UpdatePromptProps) {
  return (
    <AlertDialog open={open} onOpenChange={(o) => { if (!mandatory && onOpenChange) onOpenChange(o); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title} (v{version})
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!mandatory && (
            <Button variant="outline" onClick={onSkip}>Not now</Button>
          )}
          <Button onClick={onUpdate} className="gradient-primary text-white">Update</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
