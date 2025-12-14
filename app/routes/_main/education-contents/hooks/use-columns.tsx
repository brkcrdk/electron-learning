function useColumns() {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Açıklama',
      accessorKey: 'description',
    },
    {
      header: 'İçerik Tipi',
      accessorKey: 'contentType',
    },
  ];
}

export default useColumns;
