import { Button } from '@/components/ui/button';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/constants';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 6.05A9 9 0 0 1 20 11.95" />
    <path d="M14.05 2.05A13 13 0 0 1 22 9.95" />
  </svg>
);


export function FloatingWhatsAppButton() {
  const message = encodeURIComponent('Olá! Gostaria de mais informações sobre as roupas cirúrgicas.');
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </Button>
    </a>
  );
}
