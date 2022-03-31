import { EntityGroup } from "./EntityGroup"

export class EntitiesGroupManger {

    static groups: Map<string, EntityGroup> =  new Map()

    static add(group: EntityGroup) {
        this.groups.set(group.name, group);
    }

    static get(key: string): EntityGroup {
        return  this.groups.get(key);
    }

    static findByNameContains(str: string): EntityGroup[] {

        const res: EntityGroup[] = []
        this.groups.forEach((v, k) => {

            if (k.match(`.*${str}.*`)) {
                res.push(v);
            }
        })
        return res;
    }

    static remove(key: string) {
        this.groups.delete(key)
    }
}