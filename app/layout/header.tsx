import { Fragment } from 'react';

import { Link, useMatches } from '@tanstack/react-router';

import Breadcrumb from '@app/components/ui/breadcrumb';
import Separator from '@app/components/ui/separator';
import Sidebar from '@app/components/ui/sidebar';

function Header() {
  const matches = useMatches();

  return (
    <header className="flex shrink-0 items-center gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <Sidebar.Trigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <Breadcrumb.List>
            {matches.map((match, index) => {
              if (!match.staticData.breadcrumb) return null;
              const isLast = index === matches.length - 1;

              return (
                <Fragment key={match.id}>
                  <Breadcrumb.Item>
                    {isLast ? (
                      <Breadcrumb.Page>{match.staticData.breadcrumb}</Breadcrumb.Page>
                    ) : (
                      <Breadcrumb.Link asChild>
                        <Link to={match.pathname}>{match.staticData.breadcrumb}</Link>
                      </Breadcrumb.Link>
                    )}
                  </Breadcrumb.Item>
                  {!isLast && <Breadcrumb.Separator />}
                </Fragment>
              );
            })}
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default Header;
