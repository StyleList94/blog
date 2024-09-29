import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isDarkTheme = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="flex flex-col justify-center items-center mx-auto my-8">
      <a
        href="https://github.com/StyleList94"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={`/images/icon-github${isDarkTheme ? '-light' : ''}.png`}
          alt="github"
          width={24}
          height={24}
        />
      </a>
      <div className="mt-3">
        <button
          type="button"
          className={cn(
            'outline-none border-0 bg-transparent text-xs cursor-pointer',
            'hover:opacity-80 hover:underline',
          )}
          onClick={() => {
            setTheme(isDarkTheme ? 'light' : 'dark');
          }}
        >
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
