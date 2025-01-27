import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // Método listar todas as categorias
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  // Método buscar categoria pelo ID
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID não encontrado.`);
    }
    return categoria;
  }

   // Busca categoria pelo nome (tipo), ignorando a case-sensitive
  async findByNome(tipo: string): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find({
      where: {
        tipo: ILike(`%${tipo}%`), // ILIKE faz uma comparação case-insensitive no PostgreSQL
      },
    });

    if (categorias.length === 0) {
      throw new NotFoundException(`Categoria com nome "${tipo}" não encontrada.`);
    }

    return categorias;
  }

  // Método criar categoria
  async create(tipo: string): Promise<Categoria> {
    const novaCategoria = this.categoriaRepository.create({ tipo });
    return await this.categoriaRepository.save(novaCategoria);
  }

  // Método atualizar categoria existente
  async update(id: number, tipo: string): Promise<Categoria> {
    const categoria = await this.findById(id);
    categoria.tipo = tipo;
    return await this.categoriaRepository.save(categoria);
  }

  // Método deletar categoria
  async delete(id: number): Promise<void> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.remove(categoria);
  }
}