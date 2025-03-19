import Link from 'next/link';

export default function ProjectList({ projects }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Список проектов</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
              {project.title} — {project.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}