export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    username: string;
    freelancerId: string;
}

export interface Freelancer {
    id: string;
    pessoaId: string;
    especialidades: string[];
    cnpj?: string;
    biografia?: string;
    website?: string;
    redesSociais?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export interface Pessoa {
    id: string;
    nomeCompleto: string;
    dataNascimento?: Date;
    genero?: string;
    cpf?: string;
    telefone?: string;
    celular?: string;
    endereco?: {
        cep?: string;
        logradouro?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        cidade?: string;
        estado?: string;
    };
}
