import * as React from 'react';
import { Languages } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  function onSelectChange(value: string) {
    router.replace(pathname, { locale: value });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Languages className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{t('selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => onSelectChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange('zh')}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
