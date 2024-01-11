'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();

    if (term) {
      params.set('query', term);
    } else { // no string, delete
      params.delete('query');
    }
    /* ${pathname} is the current path, in this case, "/dashboard/invoices".
    As the user types into the search bar, params.toString() translates this input into a URL-friendly format.
    replace(${pathname}?${params.toString()}) updates the URL with the user's search data. 
    For example, /dashboard/invoices?query=eddie if the user searches for "Eddie".
    The URL is updated without reloading the page, 
    thanks to Next.js's client-side navigation (which was learned about in the chapter on navigating between pages).
    */
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
