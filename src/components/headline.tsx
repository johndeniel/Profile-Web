'use client';

import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { PersonalInformation } from '@/types';

interface HeadlineProps {
  person: PersonalInformation;
}

export function Headline({ person }: HeadlineProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Headline
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">{person.headline}</p>
      <div className="flex flex-col gap-3 pt-4 text-sm">
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
    </div>
  );
}
