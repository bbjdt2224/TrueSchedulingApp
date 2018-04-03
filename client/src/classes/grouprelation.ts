import { Group } from './group';
export class GroupRelation {
    id: number;
    userId: number;
    groupId: number;
    updatedAt: Date;
    createdAt: Date;
    group: Group;
}