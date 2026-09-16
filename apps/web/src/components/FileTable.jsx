function FileTable({ files, onChanged, onDownload }) {
  console.log(files);

  if (files.length === 0) {
    return (
      <p className="panel p-6 text-center text-sm text-muted-foreground">
        No files here yet.
      </p>
    );
  }
  return (
    <>
      <div className="panel divide-y divide-border p-6"></div>
    </>
  );
}

export default FileTable;
