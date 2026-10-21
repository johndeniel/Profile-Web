import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const resources = [
  {
    title: 'About iPref',
    href: '/ipref/about',
    description: 'What iPref is and how it helps you plan your meals.',
  },
  {
    title: 'Privacy Policy',
    href: '/ipref/privacy-policy',
    description: 'How your information is used, stored, and protected.',
  },
  {
    title: 'Terms of Service',
    href: '/ipref/terms-of-service',
    description: 'The terms for using iPref and its features.',
  },
  {
    title: 'Account Deletion',
    href: '/ipref/account-deletion',
    description: 'Delete your account in the app or request deletion by email.',
  },
];

export function IPrefLinks() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
      {resources.map((resource) => (
        <Link
          key={resource.href}
          href={resource.href}
          className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="pr-6 text-sm font-semibold text-foreground group-hover:text-primary">
            {resource.title}
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
          <ArrowRight
            aria-hidden="true"
            className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
          />
        </Link>
      ))}
    </div>
  );
}

export function IPrefSection() {
  return (
    <section aria-labelledby="ipref-heading" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3
          id="ipref-heading"
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          <Link href="/ipref" className="hover:text-primary">
            iPref
          </Link>
        </h3>
        <Badge variant="secondary" className="text-xs">
          Meal planning
        </Badge>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Plan your meals, organize your schedule, and follow your nutrition.
        Learn about iPref, read its policies, or manage your account.
      </p>
      <Link
        href="/ipref"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
      >
        Explore iPref
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
      <IPrefLinks />
    </section>
  );
}
