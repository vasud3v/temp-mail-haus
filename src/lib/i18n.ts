import type { Locale } from "@/components/tempmail/TempMailContext";

type Dict = Record<string, string>;

const en: Dict = {
  "hero.badge": "No signup. No tracking. No nonsense.",
  "hero.title.1": "Temporary Email",
  "hero.title.2": "That Just Works",
  "hero.subtitle":
    "Spin up a throwaway inbox in one click. Receive verification codes, ditch spam, and protect your real address — all from your browser, no account required.",
  "gen.label": "Your temporary address",
  "gen.live": "LIVE",
  "gen.copy": "Copy",
  "gen.copied": "Copied",
  "gen.new": "New address",
  "gen.qr": "QR",
  "gen.expires": "Expires in",
  "inbox.heading": "Your inbox, no waiting.",
  "inbox.sub": "Messages stream in the moment they arrive. Click any thread to read it on the right.",
  "inbox.title": "Inbox",
  "inbox.search": "Search inbox…",
  "inbox.new": "new",
  "inbox.empty": "Pick a message",
};

const es: Dict = {
  ...en,
  "hero.badge": "Sin registro. Sin rastreo. Sin tonterías.",
  "hero.title.1": "Correo Temporal",
  "hero.title.2": "Que Simplemente Funciona",
  "hero.subtitle":
    "Crea una bandeja desechable en un clic. Recibe códigos de verificación, evita el spam y protege tu dirección real — todo desde tu navegador.",
  "gen.label": "Tu dirección temporal",
  "gen.copy": "Copiar",
  "gen.copied": "Copiado",
  "gen.new": "Nueva dirección",
  "gen.expires": "Expira en",
  "inbox.heading": "Tu bandeja, sin esperas.",
  "inbox.sub": "Los mensajes llegan al instante. Toca cualquier hilo para leerlo.",
  "inbox.title": "Bandeja",
  "inbox.search": "Buscar…",
  "inbox.new": "nuevos",
};

const fr: Dict = {
  ...en,
  "hero.badge": "Sans inscription. Sans pistage. Sans soucis.",
  "hero.title.1": "Email Temporaire",
  "hero.title.2": "Qui Fonctionne Vraiment",
  "hero.subtitle":
    "Créez une boîte jetable en un clic. Recevez des codes, évitez le spam et protégez votre vraie adresse — depuis votre navigateur.",
  "gen.label": "Votre adresse temporaire",
  "gen.copy": "Copier",
  "gen.copied": "Copié",
  "gen.new": "Nouvelle adresse",
  "gen.expires": "Expire dans",
  "inbox.heading": "Votre boîte, sans attente.",
  "inbox.sub": "Les messages arrivent en direct. Cliquez pour lire.",
  "inbox.title": "Boîte",
  "inbox.search": "Rechercher…",
  "inbox.new": "nouveaux",
};

const de: Dict = {
  ...en,
  "hero.badge": "Keine Anmeldung. Kein Tracking. Kein Unsinn.",
  "hero.title.1": "Temporäre E-Mail",
  "hero.title.2": "Die Einfach Funktioniert",
  "hero.subtitle":
    "Wegwerf-Postfach in einem Klick. Bestätigungs­codes empfangen, Spam vermeiden und deine echte Adresse schützen — direkt im Browser.",
  "gen.label": "Deine temporäre Adresse",
  "gen.copy": "Kopieren",
  "gen.copied": "Kopiert",
  "gen.new": "Neue Adresse",
  "gen.expires": "Läuft ab in",
  "inbox.heading": "Dein Postfach, ohne Warten.",
  "inbox.sub": "Nachrichten kommen sofort. Klick zum Lesen.",
  "inbox.title": "Posteingang",
  "inbox.search": "Suchen…",
  "inbox.new": "neu",
};

const DICTS: Record<Locale, Dict> = { en, es, fr, de };

export function t(locale: Locale, key: string): string {
  return DICTS[locale][key] ?? en[key] ?? key;
}
