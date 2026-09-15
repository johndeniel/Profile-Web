import type { ComponentType } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  LeetcodeIcon,
  type IconProps,
} from '@/components/icons';
import type { SocialLink } from '@/types';

interface SocialLinksProps {
  links: SocialLink[];
}

interface PlatformConfig {
  icon: ComponentType<IconProps>;
  label: string;
}

/** Brand icon + accessible label per known platform. */
const platformConfig: Record<string, PlatformConfig> = {
  GITHUB: { icon: GithubIcon, label: 'GitHub' },
  LINKEDIN: { icon: LinkedinIcon, label: 'LinkedIn' },
  INSTAGRAM: { icon: InstagramIcon, label: 'Instagram' },
  LEETCODE: { icon: LeetcodeIcon, label: 'LeetCode' },
};

/** Fallback for platforms without a brand icon. */
const unknownPlatform: PlatformConfig = {
  icon: ExternalLink,
  label: 'Social link',
};

/** Row of social profile icon links. Renders nothing when empty. */
export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const { icon: Icon, label } =
          platformConfig[link.platform] ?? unknownPlatform;

        return (
          <a
            key={link.id}
            href={link.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}: ${link.platformUrl}`}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
