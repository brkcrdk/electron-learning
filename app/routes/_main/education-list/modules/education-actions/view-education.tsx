import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import type { EducationListItem } from '@db/schema';

interface Props {
  education: EducationListItem;
}

function ViewEducation({ education }: Props) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Eğitim Adı</p>
        <p className="text-base font-medium">{education.name}</p>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">Açıklama</p>
        <p className="text-foreground/80 whitespace-pre-wrap text-sm leading-relaxed">{education.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Kategori</p>
          <p className="text-sm font-medium">{education.category.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Eğitim İçeriği</p>
          <p className="text-sm font-medium">{education.educationMaterial.name}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Oluşturan</p>
          <UserCell user={education.createdBy} />
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Kayıt Tarihi</p>
          <RelativeDateCell date={education.createdAt} />
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Son Güncelleme</p>
          <RelativeDateCell date={education.updatedAt} />
        </div>
      </div>
    </div>
  );
}

export default ViewEducation;
