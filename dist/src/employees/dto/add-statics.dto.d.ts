export declare class StaticDto {
    id: number;
    name: string;
}
export declare class StaticsDto {
    items: StaticDto[];
}
declare const SubcategoriesDto_base: import("@nestjs/mapped-types").MappedType<Partial<StaticsDto>>;
export declare class SubcategoriesDto extends SubcategoriesDto_base {
}
export {};
