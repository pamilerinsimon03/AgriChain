import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M88 184.6V71.4A23.9 23.9 0 01112 48h32a23.9 23.9 0 0124 23.4v113.2a23.9 23.9 0 01-24 23.4h-32a23.9 23.9 0 01-24-23.4zM168 128h32m-80-56.6V48m0 160v-23.4M191.8 77.9l22.6-22.6M191.8 178.1l22.6 22.6M41.6 77.9L19 55.3m22.6 122.8L19 200.7"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M88 128h32"
      />
    </svg>
  );
}
