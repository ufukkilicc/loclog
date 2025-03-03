import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { AbstractEntity } from "../../database/abstract.entity";

@Entity({ name: "areas" })
export class Area extends AbstractEntity<Area> {
    @Index()
    @Column("varchar")
    name: string;

    @Index({ spatial: true })
    @Column("geometry", { spatialFeatureType: "Polygon", srid: 4326 })
    polygon: any;

    @OneToMany(() => Location, (location) => location.area)
    locations: Location[];
}