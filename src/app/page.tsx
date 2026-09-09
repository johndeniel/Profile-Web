'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { PersonalInformation } from '@/types';

const mockPersonalInformation: PersonalInformation[] = [
  {
    id: '1',
    firstName: 'John',
    middleName: 'Deniel',
    lastName: 'Doe',
    headline: 'Full Stack Developer',
    blobUrl: 'https://github.com/shadcn.png',
    blobId: 'avatar-1',
    emailAddress: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  },
];

export default function HomePage() {
  const [data] = useState<PersonalInformation[]>(mockPersonalInformation);

  if (data.length === 0) {
    return null;
  }

  return (
    <main className="py-8">
      {data.map((person) => (
        <Card key={person.id}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={person.blobUrl}
                  alt={`${person.firstName} ${person.lastName}`}
                />
                <AvatarFallback>
                  {person.firstName[0]}
                  {person.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {person.firstName} {person.middleName} {person.lastName}
                </CardTitle>
                <Badge variant="secondary">{person.headline}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{person.emailAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{person.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{person.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
