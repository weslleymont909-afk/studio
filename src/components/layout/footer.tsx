import { Logo } from '@/components/icons/logo';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="text-foreground">
            <Logo />
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} FS Moda Pet. Todos os direitos reservados.
          </p>
        </div>
      </div>
      {/* Depuração: Mostrar o número do WhatsApp que está sendo usado */}
      <div className="bg-yellow-200 text-black text-center p-2 text-xs">
        <p>Número de depuração: {WHATSAPP_PHONE_NUMBER || 'NÚMERO NÃO CONFIGURADO'}</p>
      </div>
    </footer>
  );
}
