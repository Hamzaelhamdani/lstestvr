import { useEffect } from "react";
import { Button } from "../ui/button";

interface RoleSelectProps {
  user: any;
  onSelect: (role: string) => void;
}

export function RoleSelect({ user, onSelect }: RoleSelectProps) {
  const roles: string[] = user?.roles || [];

  useEffect(() => {
    if (roles.length === 1) {
      onSelect(roles[0]);
    }
  }, [roles, onSelect]);

  if (!roles.length) return <div className="p-8 text-center">Aucun rôle disponible.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-6">Choisissez votre rôle</h2>
      <div className="flex gap-4">
        {roles.map((role) => (
          <Button key={role} onClick={() => onSelect(role)} className="px-8 py-4 text-lg capitalize">
            {role}
          </Button>
        ))}
      </div>
    </div>
  );
}
