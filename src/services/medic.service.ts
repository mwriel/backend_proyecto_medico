
import { Medico, CreateMedicDto, UpdateMedicDto } from '../models/medic.model';
import { MedicRepository } from '../repositories/medico.repository';

export class MedicService {
    private repository: MedicRepository;

    constructor(repository: MedicRepository) {
        this.repository = repository;
    }

    async createMedic(dto: CreateMedicDto): Promise<Medico> {
        const newMedic: Medico = {
            ...dto,
            validPHD: false 
        };
        return this.repository.create(newMedic);
    }

    async getMedicById(id: number): Promise<Medico | null> {
        return this.repository.findById(id);
    }

    async getMedicByEmail(email: string): Promise<Medico | null> {
        return this.repository.findByEmail(email);
    }

    async updateMedic(id: number, dto: UpdateMedicDto): Promise<Medico | null> {
        return this.repository.update(id, dto);
    }

    async deleteMedic(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }

    async validatePhD(id: number, isValid: boolean): Promise<Medico | null> {
        const medic = await this.repository.findById(id);
        if (!medic) return null;
        
        return this.repository.update(id, {
            ...medic,
            validPHD: isValid
        });
    }

    async getAllValidated(): Promise<Medico[]> {
        const allMedics = await this.repository.findAll();
        return allMedics.filter(medic => medic.validPHD);
    }

    async updateConsultoryLocation(
        id: number, 
        address: string, 
        coordinates: [number, number]
    ): Promise<Medico | null> {
        return this.repository.update(id, {
            dirConsult: address,
            cordConsult: coordinates
        });
    }

    async getMedicSchedule(id: number): Promise<object | null> {
        const medic = await this.repository.findById(id);
        if (!medic || !medic.disponible) return null;
        
        try {
            return JSON.parse(medic.disponible);
        } catch (error) {
            console.error('Error parsing schedule:', error);
            return null;
        }
    }
}