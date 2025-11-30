import { cx } from 'class-variance-authority';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

function cn(...inputs: ClassNameValue[]) {
  return twMerge(cx(inputs));
}

export default cn;
