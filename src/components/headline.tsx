import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
import type { PersonalInformation } from '@/types';

interface HeadlineProps {
  person: PersonalInformation;
}

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** Professional title plus actionable contact badges. */
export function Headline({ person }: HeadlineProps) {
  // Email and phone render as links; location is display-only.
  const contactItems: ContactItem[] = [
    {
      icon: Mail,
      label: 'Email',
      value: person.emailAddress,
      href: `mailto:${person.emailAddress}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: person.phoneNumber,
      href: `tel:${person.phoneNumber}`,
    },
    { icon: MapPin, label: 'Location', value: person.location },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Headline
        </h3>
      </div>

      <p className="text-sm text-muted-foreground">{person.headline}</p>

      {/* Contact badges */}
      <div className="flex flex-col items-start gap-3 pt-1 text-sm">
        {contactItems.map(({ icon: Icon, label, value, href }) => (
          <Badge
            key={label}
            variant="outline"
            render={
              href ? (
                <a href={href} aria-label={`${label}: ${value}`} />
              ) : undefined
            }
            className="max-w-full gap-1.5 py-1"
          >
            <Icon
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70"
            />
            <span className="truncate">{value}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
