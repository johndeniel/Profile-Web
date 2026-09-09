'use client';

import { ExternalLink } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  LeetcodeIcon,
} from '@/components/icons';
import type { SocialLink } from '@/types';

interface SocialLinksProps {
  links: SocialLink[];
}

const platformConfig: Record<string, { icon: React.ElementType }> = {
  GITHUB: { icon: GithubIcon },
  LINKEDIN: { icon: LinkedinIcon },
  INSTAGRAM: { icon: InstagramIcon },
  LEETCODE: { icon: LeetcodeIcon },
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const config = platformConfig[link.platform] || { icon: ExternalLink };
        const Icon = config.icon;
        return (
          <a
            key={link.id}
            href={link.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
