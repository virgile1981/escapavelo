import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DefaultEntity {
    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}