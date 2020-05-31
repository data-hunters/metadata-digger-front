import { Photo, Facets, GraphType, GraphPlacement } from "./types";

export type Action = 
| { type: "updateData", photos: Photo[], facets: Facets}
| { type: "changeGraphType", whichGraph: GraphPlacement, newGraphType: GraphType}
| { type: "selectPhoto", newPhoto: Photo}
| { type: "deselectPhoto" }