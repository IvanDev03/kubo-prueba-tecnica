import { Repository } from "typeorm";
import { PaginationDto } from "./dto/pagination.dto";

export class PaginationService {
    async paginate<T extends import("typeorm").ObjectLiteral>(
        repository: Repository<T>,
        paginationDto: PaginationDto,
        relations: string[] = []) {

        const { page = 1, limit = 10, filters, orderBy, orderDirection = "DESC" } = paginationDto;

        const offset = (page - 1) * limit;

        const alias = repository.metadata.name.toLocaleLowerCase();

        const queryBuilder = repository.createQueryBuilder(alias);

        relations.forEach(relation => {
            queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation);
        });

        if (filters) {
            Object.entries(filters).forEach(([key, value], index) => {

                const paramKey = `param${index}`;

                const isNumeric = !isNaN(Number(value));

                if (key.includes(".")) {
                    const [relation, field] = key.split(".");

                    if (isNumeric) {
                        queryBuilder.andWhere(`${relation}.${field} = :${paramKey}`, 
                            { [paramKey]: Number(value) });
                    }
                    else {
                        queryBuilder.andWhere(`${relation}.${field} ILIKE :${paramKey}`, 
                            { [paramKey]: `%${value}%` });
                    }

                }else {
                    if (isNumeric) {
                        queryBuilder.andWhere(`${alias}.${key} = :${paramKey}`, 
                            { [paramKey]: Number(value) });
                    }
                    else {
                        queryBuilder.andWhere(`${alias}.${key} ILIKE :${paramKey}`, 
                            { [paramKey]: `%${value}%` });
                    }
                }
            });
        }

        if (orderBy) {
            let orderField = orderBy;
            if (!orderBy.includes(".")) {
                orderField = `${alias}.${orderBy}`;
            }
            // orderDirection puede ser "ASC" o "DESC"
            queryBuilder.orderBy(orderField, orderDirection.toUpperCase() === "ASC" ? "ASC" : "DESC");
        }

        queryBuilder.skip(offset).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            orderBy: orderBy || null,
            orderDirection: orderDirection.toUpperCase() === "ASC" ? "ASC" : "DESC",
        };
    }
}