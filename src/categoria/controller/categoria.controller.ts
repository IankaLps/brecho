import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller("/categorias")
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    // Retorna todas as categorias
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    // Retorna uma categoria pelo ID
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id") id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    // Método buscar categorias pelo nome (tipo)
    @Get("/nome/:tipo")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param("tipo") tipo: string): Promise<Categoria[]> {
    return this.categoriaService.findByNome(tipo);
    }

    // Cria uma nova categoria
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Partial<Categoria>): Promise<Categoria> {
        return this.categoriaService.create(categoria.tipo);
    }

    // Atualiza uma categoria existente pelo ID
    @Put("/:id")
    @HttpCode(HttpStatus.OK)
    update(@Param("id") id: number, @Body() categoria: Partial<Categoria>): Promise<Categoria> {
        return this.categoriaService.update(id, categoria.tipo);
    }

    // Deletar uma categoria pelo ID
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: number): Promise<void> {
        return this.categoriaService.delete(id);
    }
}