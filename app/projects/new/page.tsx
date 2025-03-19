import AddProjectForm from '@/components/AddProjectForm';

export default function NewProjectPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Создание нового проекта</h1>
      <AddProjectForm />
    </div>
  );
}