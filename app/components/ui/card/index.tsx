import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import CardAction from './card-action';
import CardContent from './card-content';
import CardDescription from './card-description';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardTitle from './card-title';

function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)}
      {...props}
    />
  );
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Description = CardDescription;
Card.Footer = CardFooter;
Card.Action = CardAction;
Card.Title = CardTitle;

export default Card;
