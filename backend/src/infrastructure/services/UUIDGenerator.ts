import { randomUUID } from "crypto";
import type { IIdGenerator } from "@/application/interfaces/IIdGenerator";

export class UUIDGenerator implements IIdGenerator{
    generate(): string {
        return randomUUID();
    }
}