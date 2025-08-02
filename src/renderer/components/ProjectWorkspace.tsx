import { WorktreePanel } from './WorktreePanel';
import { RightPaneView } from './RightPaneView';
import { useProjects } from '../contexts/ProjectContext';

interface ProjectWorkspaceProps {
  projectId: string;
}

export function ProjectWorkspace({ projectId }: ProjectWorkspaceProps) {
  const { getProject, setSelectedWorktree, updateProjectWorktrees } = useProjects();
  const project = getProject(projectId);

  if (!project) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground">Project not found</div>;
  }

  return (
    <div className="flex-1 flex h-full">
      <WorktreePanel
        projectPath={project.path}
        selectedWorktree={project.selectedWorktree}
        onSelectWorktree={(worktree) => setSelectedWorktree(projectId, worktree)}
        onWorktreesChange={(worktrees) => updateProjectWorktrees(projectId, worktrees)}
      />
      {project.selectedWorktree && (
        <RightPaneView 
          worktreePath={project.selectedWorktree} 
          projectId={projectId}
        />
      )}
    </div>
  );
}