function useColumns() {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Rol',
      accessorKey: 'roles',
    },
    {
      header: 'Durum',
      accessorKey: 'status',
    },
    {
      header: 'Oluşturulma Tarihi',
      accessorKey: 'createdAt',
    },
    {
      header: 'Son Giriş Tarihi',
      accessorKey: 'lastLoginAt',
    },
  ];
}

export default useColumns;
