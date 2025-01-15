import React, { useState } from 'react';
import { useStore } from '../../store';
import { FolderIcon, FileIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon, FolderPlusIcon } from 'lucide-react';

interface TreeItemProps {
  id: string;
  name: string;
  isFolder: boolean;
  level: number;
  path: string;
  parentId: string | null;
  onSelect: (id: string, isFolder: boolean) => void;
  onCreateFile: (parentId: string | null) => void;
  onCreateFolder: (parentId: string | null) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({ 
  id, 
  name, 
  isFolder, 
  level, 
  path, 
  parentId, 
  onSelect,
  onCreateFile,
  onCreateFolder
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const store = useStore();
  
  const handleClick = (e: React.MouseEvent) => {
    if (isFolder) {
      setIsExpanded(!isExpanded);
      store.setCurrentFolder(id);
    }
    onSelect(id, isFolder);
  };

  const getChildFolders = () => {
    return Object.values(store.folders)
      .filter(f => f.parentId === id)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const getChildFiles = () => {
    return Object.values(store.files)
      .filter(f => f.parentId === id)
      .sort((a, b) => a.name.localeCompare(b.name));
  };
  
  return (
    <div
      className="group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`flex items-center p-1 hover:bg-luxury-50 dark:hover:bg-luxury-800/50 rounded cursor-pointer
          ${store.currentFile?.id === id || store.currentFolderId === id 
            ? 'bg-luxury-100 dark:bg-luxury-700' 
            : ''}`}
        onClick={handleClick}
        style={{ marginLeft: `${level * 12}px` }}
      >
        <div className="flex-1 flex items-center min-w-0">
          {isFolder && (
            <span className="mr-1 text-gray-400">
              {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
            </span>
          )}
          {isFolder ? (
            <FolderIcon size={16} className="text-yellow-500" />
          ) : (
            <FileIcon size={16} className="text-gray-400" />
          )}
          <span className="ml-2 text-sm truncate">
            {isFolder ? name : `${name}.md`}
          </span>
        </div>

        {/* Ações */}
        {showActions && isFolder && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateFile(id);
              }}
              className="p-1 rounded-md hover:bg-luxury-100 dark:hover:bg-luxury-700"
              title="Novo arquivo"
            >
              <PlusIcon size={14} className="text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateFolder(id);
              }}
              className="p-1 rounded-md hover:bg-luxury-100 dark:hover:bg-luxury-700"
              title="Nova pasta"
            >
              <FolderPlusIcon size={14} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
      
      {isFolder && isExpanded && (
        <div>
          {getChildFolders().map((folder) => (
            <TreeItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              isFolder={true}
              level={level + 1}
              path={folder.path}
              parentId={folder.parentId}
              onSelect={onSelect}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
            />
          ))}
          {getChildFiles().map((file) => (
            <TreeItem
              key={file.id}
              id={file.id}
              name={file.name}
              isFolder={false}
              level={level + 1}
              path={file.path}
              parentId={file.parentId}
              onSelect={onSelect}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  const store = useStore();
  
  const handleSelect = (id: string, isFolder: boolean) => {
    if (!isFolder) {
      const file = store.files[id];
      if (file) {
        store.setCurrentFile(file);
      }
    }
  };

  const handleCreateFile = (parentId: string | null) => {
    const newFile = store.createFile(parentId);
    store.setCurrentFile(newFile);
  };

  const handleCreateFolder = (parentId: string | null) => {
    store.createFolder('Nova pasta', parentId);
  };

  // Pega apenas as pastas e arquivos do nível raiz (sem parentId)
  const rootFolders = Object.values(store.folders)
    .filter(f => !f.parentId)
    .sort((a, b) => a.name.localeCompare(b.name));

  const rootFiles = Object.values(store.files)
    .filter(f => !f.parentId)
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="h-full overflow-y-auto p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm dark:text-gray-300">Arquivos</div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleCreateFile(null)}
            className="p-1 rounded-md hover:bg-luxury-100 dark:hover:bg-luxury-700"
            title="Novo arquivo"
          >
            <PlusIcon size={14} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => handleCreateFolder(null)}
            className="p-1 rounded-md hover:bg-luxury-100 dark:hover:bg-luxury-700"
            title="Nova pasta"
          >
            <FolderPlusIcon size={14} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {rootFolders.map((folder) => (
        <TreeItem
          key={folder.id}
          id={folder.id}
          name={folder.name}
          isFolder={true}
          level={0}
          path={folder.path}
          parentId={folder.parentId}
          onSelect={handleSelect}
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
        />
      ))}
      {rootFiles.map((file) => (
        <TreeItem
          key={file.id}
          id={file.id}
          name={file.name}
          isFolder={false}
          level={0}
          path={file.path}
          parentId={file.parentId}
          onSelect={handleSelect}
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
        />
      ))}
    </div>
  );
};
