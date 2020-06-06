export interface PhotoLocation {
    latitude: number;
    longitude: number;
}

export interface Photo {
    id: string;
    base_path: string;
    file_path: string;
    file_type: string;
    directories: string[];
    meta_data: Record<string, string | number>;
    thumbnail: string;
    labels: string[];
    location?: PhotoLocation;
}

export type Facet = Record<string, number>;
export type Facets = Record<string, Facet>;
 

export type GraphType = "tag_names" | "directory_names" | "labels" | "file_type" | "md_exif_ifd0_model" ;
export const GRAPH_TYPES: GraphType[] = [ "tag_names", "directory_names", "labels", "file_type", "md_exif_ifd0_model" ];

export interface GraphState {
    graphType: GraphType
    values: Facet;
}

export type GraphPlacement = "left" | "right";
export const GRAPH_PLACEMENTS: GraphPlacement[] = [ "left", "right" ]

export interface AppState {
    currentPhoto?: Photo;
    photos: Photo[]
    facets: Facets;
    graphs: Record<GraphPlacement, GraphType>;
}

