'use client';

import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { PersonalInformation } from '@/types';

interface ContactProps {
  person: PersonalInformation;
}

export function Contact({ person }: ContactProps) {
  return (
    <div className="mt-2 flex flex-col gap-3 text-sm">
      <Badge variant="outline" className="gap-1.5 py-1">
        <Mail className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span>{person.emailAddress}</span>
      </Badge>
      <Badge variant="outline" className="gap-1.5 py-1">
        <Phone className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span>{person.phoneNumber}</span>
      </Badge>
      <Badge variant="outline" className="gap-1.5 py-1">
        <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
        <span>{person.location}</span>
      </Badge>
    </div>
  );
}
