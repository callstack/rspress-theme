import type { SVGProps } from 'react';

function IconCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>CornerDownRightIcon</title>
      <path d="M9.33301 13.333H10.667V12H9.33301V13.333ZM2.66699 10.667H10.667V12H12V10.667H13.333V9.33301H12V8H10.667V9.33301H4V2.66699H2.66699V10.667ZM9.33301 8H10.667V6.66699H9.33301V8Z" />
    </svg>
  );
}

export default IconCorner;
