import { Area } from "src/areas/entities/area.entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../database/abstract.entity";

@Entity({ name: "locations" })
export class Location extends AbstractEntity<Location> {
    @Index()
    @Column("integer")
    userId: number;

    @Index({ spatial: true })
    @Column("geometry", { spatialFeatureType: "Point", srid: 4326 })
    point: any;

    @Index()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    entryTime: Date;

    @Index()
    @Column("integer")
    areaId: number;

    @ManyToOne(() => Area, (area) => area.locations)
    area: Area;
}