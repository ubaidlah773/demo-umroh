"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data.project || null);
      } catch (err) {
        console.error("Fetch project error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-palette-darkSec/70 font-mono text-xs">
        Loading project content and gallery...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 text-center text-red-400 font-mono text-xs">
        Project not found.
      </div>
    );
  }

  return <ProjectForm initialData={project} isNew={false} />;
}
