import Badge from '@app/components/ui/badge';
import ImageFallback from '@app/components/ui/image-fallback';
import getContentPath from '@app/utils/get-content-path';
import type { UserEducationFavoriteListItem } from '@db/schema/user-education-favorites';

interface Props {
  education: UserEducationFavoriteListItem;
}
function EducationListItem({ education }: Props) {
  return (
    <li className="hover:bg-accent flex cursor-pointer items-center gap-3 p-2">
      <ImageFallback
        className="aspect-video size-20 rounded-sm object-cover"
        src={getContentPath(education.education.coverImage?.filePath)}
      />
      <div className="flex flex-1 flex-col gap-1">
        <h3>{education.education.name}</h3>
        <span className="text-accent-foreground/50 text-sm">{education.education.description}</span>
        <div className="flex items-center gap-2">
          <Badge className="text-xs">{education.education.category.name}</Badge>
          <Badge className="text-xs">{education.education.educationMaterial.name}</Badge>
        </div>
      </div>
    </li>
  );
}

export default EducationListItem;
