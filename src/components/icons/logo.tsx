import type { SVGProps } from 'react';
import { PawPrint } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2 text-primary-foreground">
      <PawPrint className="h-6 w-6 text-current" />
      <span className="font-bold text-lg hidden sm:inline-block">Pet Protect Outfitters</span>
    </div>
  );
}
