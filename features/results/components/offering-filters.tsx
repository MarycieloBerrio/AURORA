import { Select } from "@/components/atoms/select";

export interface OfferingFilters {
  department: string;
  municipality: string;
  character: string;
}

interface OfferingFiltersProps {
  filters: OfferingFilters;
  departments: string[];
  municipalities: string[];
  onChange: (filters: OfferingFilters) => void;
}

const ALL = "";

export function OfferingFiltersPanel({
  filters,
  departments,
  municipalities,
  onChange,
}: OfferingFiltersProps) {
  return (
    <div className="space-y-2">
      <Select
        value={filters.department}
        onChange={(e) =>
          onChange({ ...filters, department: e.target.value, municipality: ALL })
        }
        aria-label="Departamento"
      >
        <option value={ALL}>Todos los departamentos</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>

      <Select
        value={filters.municipality}
        onChange={(e) => onChange({ ...filters, municipality: e.target.value })}
        aria-label="Municipio"
      >
        <option value={ALL}>Todos los municipios</option>
        {municipalities.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>

      <Select
        value={filters.character}
        onChange={(e) => onChange({ ...filters, character: e.target.value })}
        aria-label="Carácter"
      >
        <option value={ALL}>Oficial y Privada</option>
        <option value="Oficial">Oficial</option>
        <option value="Privada">Privada</option>
      </Select>
    </div>
  );
}
