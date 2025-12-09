import type { ComponentProps } from 'react';

import BreadcrumbEllipsis from './breadcrumb-ellipsis';
import BreadcrumbItem from './breadcrumb-item';
import BreadcrumbLink from './breadcrumb-link';
import BreadcrumbList from './breadcrumb-list';
import BreadcrumbPage from './breadcrumb-page';
import BreadcrumbSeparator from './breadcrumb-separator';

function Breadcrumb({ ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...props}
    />
  );
}

Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;

export default Breadcrumb;
