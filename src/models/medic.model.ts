
export type Medico = {
    id: number;
    userId: number;        
    phd?: string;           
    especiality?: string;   
    disponible?: string;    
    dirConsult?: string;    
    cordConsult?: [number, number]; 
    validPHD?: boolean;     
}

// Tipos para DTOs manteniendo nomenclatura existente
export type CreateMedicDto = Omit<Medico, 'id' | 'validPHD'>;
export type UpdateMedicDto = Partial<CreateMedicDto>;